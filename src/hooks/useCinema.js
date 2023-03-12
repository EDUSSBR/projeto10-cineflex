import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { generateObjFromNameAndCpf } from "../genUtil"
import { services } from "../services"

export function useCinema() {
    const location = useLocation()
    const wentToSucess = useRef(false)
    if (location.pathname==='/sucesso'){
        wentToSucess.current = true 
    } else if (location.pathname === '/'){
        wentToSucess.current= false
    }
    const [appState, setAppState] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        (async function updateScreen() {
            let newState = {...appState}
            let [, path, paramID] = location.pathname.split('/')
            if (path === 'sessoes' && appState.showtimeList === undefined && !isNaN(paramID)) {
                if (newState.movieShowTime!== undefined){
                    newState = { moviesList: newState.moviesList, movieShowTime: newState.movieShowTime}
                } else {   
                    const response = await services.getMovieShowTimes(paramID)
                    let showtimeList = await response.json()
                    const { days, posterURL, title } = showtimeList
                    newState = { ...newState, movieShowTime: { days, posterURL, title } }
                }
                setAppState(prev => newState)

            } else if (path === 'assentos' && wentToSucess.current ){
                navigate('/')
            } else if (path === 'assentos' && appState.selectedSeats === undefined && appState.moviesList===undefined && !isNaN(paramID)) {
                const response = await services.getSeats(paramID)
                const { movie: { title, posterURL }, seats, day: { weekday }, id } = await response.json()
                newState = { ...newState, time: appState.time, date: appState.date, seatsInfo: { title, seats, day: weekday, id, posterURL }, selectedSeats: seats.map(item => ({ ...item, isSelected: false })) }
                setAppState(prev => newState)
            } else if (path === 'sucesso' && appState.hashNameCpf !== undefined){
                
                let arr = []
                let myObj = generateObjFromNameAndCpf(appState.hashNameCpf)
                for (let item of myObj) {
                    arr.push(item)
                }
                setAppState(prev=> ({...prev, finalObj: arr}))
            } else if (path==='sucesso' && appState.hashName === undefined){
                navigate('/')
            }
        })()
    }, [location.pathname])

    useEffect(() => {
        (async function updateMissingItems() {
            let [, path, paramID] = location.pathname.split('/')
            let newState = { ...appState }
            let date;
            let time;
            if (path === 'assentos' && appState.moviesList === undefined && appState.selectedSeats !== undefined) {
   
                const response = await services.getMoviesList()
                let moviesList = await response.json()
                let selectedMovie = moviesList.find(item => item.title === appState.seatsInfo.title)
                const movies = moviesList.reduce((acc, item) => {
                    acc.push({ id: item.id, url: item.posterURL, title: item.title })
                    return acc
                }, [])


                const response1 = await services.getMovieShowTimes(selectedMovie.id)
                let showtimeList = await response1.json()
                const { days, posterURL, title } = showtimeList
                newState = { ...newState, movieShowTime: { days, posterURL, title }, moviesList: movies }
                for (let i = 0; i < newState.movieShowTime.days.length; i++) {
                    for (let j = 0; j < newState.movieShowTime.days[i].showtimes.length; j++) {
                        if (newState.movieShowTime.days[i].showtimes[j].id === Number(paramID)) {
                            date = newState.movieShowTime.days[i].date
                            time = newState.movieShowTime.days[i].showtimes[j].name
                            break
                        }
                    }
                }
                newState = { ...newState, date, time }
                setAppState(prev => newState)
            }
        })()
    })
    useEffect(() => {
        (async function initialize() {
            if (location.pathname !== '/') return
            if (appState.moviesList === undefined) {

                const response = await services.getMoviesList()
                let json = await response.json()
                const movies = json.reduce((acc, item) => {
                    acc.push({ id: item.id, url: item.posterURL, title: item.title })
                    return acc
                }, [])
                setAppState(prev => ({ ...prev, moviesList: movies }))
            }

        })()
    }, [location.pathname])
    function resetApp() {
       setAppState(prev => ({ moviesList: prev.moviesList }))
        navigate('/')
    }
    async function getMovieShowTime(movieID) {
        const response = await services.getMovieShowTimes(movieID)
        let showtimeList = await response.json()
        const { days, posterURL, title } = showtimeList
        setAppState(prev => ({ ...prev, movieShowTime: { days, posterURL, title } }))
        navigate(`/sessoes/${movieID}`)
    }
    function includeName(name, id, i) {
        let newState = { ...appState }
        if (newState.hashNameCpf === undefined) {
            newState = { ...newState, hashNameCpf: {} }
        }
        let hashName = { ...newState.hashNameCpf, [id]: { ...newState.hashNameCpf[id], name } }
        setAppState(prev => ({ ...newState, hashNameCpf: { ...hashName } }))
    }
    function includeCpf(cpf, id, i) {
        let newState = { ...appState }
        if (newState.hashNameCpf === undefined) {
            newState = { ...newState, hashNameCpf: {} }
        }
        let hashCpf = { ...newState.hashNameCpf, [id]: { ...newState.hashNameCpf[id], cpf } }
        setAppState(prev => ({ ...newState, hashNameCpf: { ...hashCpf } }))
    }

    async function getSeats(seatsPageID, time, date) {
        const response = await services.getSeats(seatsPageID)
        const { movie: { title, posterURL }, seats, day: { weekday }, id } = await response.json()
        setAppState(prev => ({ ...prev, time, date, seatsInfo: { title, seats, day: weekday, id, posterURL }, selectedSeats: seats.map(item => ({ ...item, isSelected: false })) }))
        navigate(`/assentos/${seatsPageID}`)
    }

    function toggleSeat(id) {
        let newState = { ...appState }
        if (newState.hashNameCpf === undefined) {
            newState = { ...newState, hashNameCpf: {} }
        }
        newState = {
            ...newState, selectedSeats: newState.selectedSeats.map(item => {
                if (item.id === id) {
                    if (item.isAvailable === false) {
                        alert("Esse assento não está disponível")
                        return item
                    }
                    if (item.isSelected === true) {
                        let confirmation = window.confirm("Gostaria de remover o assento e apagar os dados?")
                        if (!confirmation) {
                            return item;
                        } else {
                            Reflect.deleteProperty(newState.hashNameCpf, id)
                        }
                    }
                    return { ...item, isSelected: !item.isSelected }
                }
                return item
            })
        }
        newState = {
            ...newState, filteredSelectedSeats: newState.selectedSeats.filter((item, index) => {
                return item.isSelected === true
            })
        }
        setAppState(prev => newState)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        let newState = { ...appState }
        const idArray = newState.filteredSelectedSeats?.map(item => item.id)
        try {
            let newObj = generateObjFromNameAndCpf(newState.hashNameCpf)
            let arr = []
            for (let item of newObj) {
                arr.push(item)
            }
            const response = await services.bookSeat({ compradores: arr, ids: idArray })
            if (response.ok) {
                navigate('/sucesso')
            } else {
                console.log('não foi dessa vez amigo')
            }
        } catch (e) {
            console.log(e)
        }
    }
    return { location, appState, getMovieShowTime, getSeats, includeCpf, includeName, toggleSeat, resetApp, handleSubmit }
}