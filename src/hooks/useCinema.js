import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { generateObjFromNameAndCpf } from "../genUtil"
import { services } from "../services"

export function useCinema() {
    const locationFromHook = useLocation()
    const [location, setLocation] = useState(() => locationFromHook)
    const [appState, setAppState] = useState({})
    const navigate = useNavigate()
    // const completeList = useRef()   //LISTA COMPLETA PRIMEIRA REQUISIÇÃO
    // const [moviesList, setMoviesList] = useState([])
    console.log(location)
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
    console.log(params)
    // useEffect(() => {
    //     (async function initialize() {
    //         // console.log(id)

    //         console.log(params?.pathname?.includes('sessoes'))
    //         if (!params.pathname.includes('sessoes')) return
    //         const response = await services.getMovieShowTimes(appState.movieID)
    //         let showtimeList =  await response.json()
    //         const { days, posterURL, title } = showtimeList
    //         setAppState(prev => ({ ...prev, showtimeList: { days, posterURL, title },  }))
    //     })()
    // }, [location.pathname])
    async function getMovieShowTime(movieID) {
        const response = await services.getMovieShowTimes(movieID)
        let showtimeList = await response.json()
        const { days, posterURL, title } = showtimeList
        setAppState(prev => ({ ...prev, movieShowTime:{days, posterURL, title}  }))
        navigate(`/sessoes/${movieID}`)
    }
    async function getSeats(seatsPageID) {
        const response = await services.getSeats(seatsPageID)
        const { movie: { title, posterURL }, seats, day: { weekday }, id } = await response.json()
        setAppState(prev=> ({...prev, seatsInfo: { title, seats, day: weekday, id, posterURL }, selectedSeats: seats.map(item => ({ ...item, isSelected: false }))}))
        // setSeatsInfo(prev => ({ title, seats, day: weekday, id, posterURL }))
        // setSelectedSeats(prev => (seats.map(item => ({ ...item, isSelected: false }))))
    }
    return { location, appState, getMovieShowTime, getSeats }


    /*
    // const [location, setLocation] = useState()
    const location = useLocation()
    const [moviesList, setMoviesList] = useState([])
    const [movieShowTime, setMovieShowTime] = useState([])
    const [chosenTimeID, setChosenTimeID] = useState({})
    const [filteredMovieShowTime, setFilteredMovieShowTime] = useState()
    const completeList = useRef()   //LISTA COMPLETA PRIMEIRA REQUISIÇÃO
    const showtimeList = useRef()   //LISTA COMPLETA PRIMEIRA REQUISIÇÃO
    const movieID = useRef(null)
    // const location = useRef()
    // console.log('COMPLETELISTE REF',completeList)
    console.log(location)
    const navigate = useNavigate()

    function setMovieID(id) {
        movieID.current = id
    }
    // function setLocation(id) {
    //     location.current = id
    // }
    useEffect(() => {
        (async function initialize() {
            if (location.pathname !== '/') return 
            const response = await services.getMoviesList()
            completeList.current = await response.json()
            const movies = completeList.current.reduce((acc, item) => {
                acc.push({ id: item.id, url: item.posterURL, title: item.title })
                return acc
            }, [])
            setMoviesList(prev => movies)
        })()
    }, [])


    useEffect(() => {
        (async function initialize() {
            console.log(id)
            if (movieID.current === null) return
            const response = await services.getMovieShowTimes(movieID.current)
            showtimeList.current = await response.json()
            const { days, posterURL, title } = showtimeList.current
            setMovieShowTime(prev => ({ days, posterURL, title }))
        })()
    }, [location])
    // console.log('location', location.current)

    useEffect(() => {
        (function filter() {
            if (!chosenTimeID.id || !movieShowTime.days || !movieShowTime.title) return
            for (let i = 0; i < movieShowTime?.days?.length; i++) {
                for (let showtime of movieShowTime?.days[i]?.showtimes) {
                    if (showtime.id === Number(chosenTimeID.id)) {
                        setFilteredMovieShowTime(prev => ({ time: showtime.name, date: movieShowTime.days[i].date, movie: movieShowTime.title, time: showtime.name }))
                        break;
                    }
                }
            }
        })()
    }, [location])

    const { id } = useParams()
    useEffect(()=>{
        console.log("ID NAV", id)
    }, location)
    //não revisados


    const [selectedSeatInfo, setSelectedSeatsInfo] = useState(null)
    // const [location, setLocation] = useState('/')


    const [seatsInfo, setSeatsInfo] = useState([])
    const [hashNameCpf, setHashNameCpf] = useState()
    const [seatsPageID, setSeatsID] = useState(null)
    const [selectedSeat, setSelectedSeats] = useState(null)

    const [filteredSelectedSeat, setFilteredSelectedSeat] = useState([])
    // let movieShowTime = []





    useEffect(() => {
        (async function initialize() {
            if (seatsPageID === null) return
            const response = await services.getSeats(seatsPageID)
            const { movie: { title, posterURL }, seats, day: { weekday }, id } = await response.json()
            setSeatsInfo(prev => ({ title, seats, day: weekday, id, posterURL }))
            setSelectedSeats(prev => (seats.map(item => ({ ...item, isSelected: false }))))
        })()
    }, [seatsPageID])





    // function includeName(name, id, i) {

    //     setHashNameCpf(prev => prev[id] ? { ...prev, [id]: { ...prev[id], name } } : { ...prev, [id]: { name } })
    // }
    // function includeCpf(cpf, id, i) {
    //     setHashNameCpf(prev => prev[id] ? { ...prev, [id]: { ...prev[id], cpf } } : { ...prev, [id]: { cpf } })
    // }
    function resetHashNameCpf(id) {
        setHashNameCpf(prev => {
            let obj = { ...prev }
            Reflect.deleteProperty(obj, id);
            return obj
        })
    }




    function toggleSeat(id) {
        if (hashNameCpf === undefined) {
            setHashNameCpf(prev => { })
        }
        setSelectedSeats(prev => prev.map(item => {
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
                        resetHashNameCpf(item.id)
                    }
                }
                return { ...item, isSelected: !item.isSelected }
            }
            return item
        }))
    }
    useEffect(() => {
        if (selectedSeat === null) return
        setFilteredSelectedSeat(prev => selectedSeat.filter((item, index) => {
            return item.isSelected === true
        }))
    }, selectedSeat)


    //     let filteredSelectedSeat =  selectedSeat?.filter((item, index) => {
    //     return item.isSelected === true
    // })
    async function handleSubmit(e) {
        e.preventDefault()

        const idArray = filteredSelectedSeat?.map(item => item.id)
        const seatArray = filteredSelectedSeat?.map(item => item.name)
        let body = { hashNameCpf, ids: idArray, seats: seatArray }
        setSelectedSeatsInfo(body)


        try {
            let newObj = generateObjFromNameAndCpf(hashNameCpf)
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











    // console.log("chosenTimeID" , chosenTimeID)  //identifica id da data e hora do filme que leva para assentos
    console.log("movieShowTime", movieShowTime)  //identifica id da data e hora do filme que leva para assentos
    console.log("moviesList", moviesList)  //identifica id da data e hora do filme que leva para assentos



    // const [chosenTimeID, setChosenTimeID] = useState({})
    // const [movieShowTime, setMovieShowTime] = useState([])
    // const [selectedSeatInfo, setSelectedSeatsInfo] = useState(null)
    // const [location, setLocation] = useState('/')
    // const [moviesList, setMoviesList] = useState([])
    // const [movieID, setMovieID] = useState(null)


    // const [seatsInfo, setSeatsInfo] = useState([])
    // const [hashNameCpf, setHashNameCpf] = useState()
    // const [seatsPageID, setSeatsID] = useState(null)
    // const [selectedSeat, setSelectedSeats] = useState([])







    return {
        chosenTimeID,
        filteredSelectedSeat,
        hashNameCpf,
        setSeatsID,
        seatsInfo,
        setHashNameCpf,
        handleSubmit,
        selectedSeat,
        toggleSeat,
        filteredMovieShowTime,
        location,
        setMovieID,
        moviesList
        , movieShowTime,
        setChosenTimeID,
        setSelectedSeatsInfo,
        selectedSeatInfo
    }*/
}