import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { generateObjFromNameAndCpf } from "../genUtil"
import { services } from "../services"

export function useCinema() {
    const locationFromHook = useLocation()
    const [location, setLocation] = useState(() => locationFromHook)
    const [appState, setAppState] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        setLocation(locationFromHook)
        console.log('rodou')
    }, [appState])
    useEffect(() => {
        (async function initialize() {
            if (location.pathname !== '/') return
            const response = await services.getMoviesList()
            let json = await response.json()
            const movies = json.reduce((acc, item) => {
                acc.push({ id: item.id, url: item.posterURL, title: item.title })
                return acc
            }, [])
            setAppState(prev => ({ ...prev, moviesList: movies }))

        })()
    }, [location.pathname])
    let params = useParams()
    function resetApp() {
        let newState = { ...appState }
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
    function resetHashNameCpf(id) {
        setAppState(prev => ({ ...prev, hashNameCpf: Reflect.deleteProperty({ ...prev.hashNameCpf }, id) }))
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
        const seatArray = newState.filteredSelectedSeats?.map(item => item.name)
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