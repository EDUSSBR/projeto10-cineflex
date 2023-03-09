// import { BrowserRouter, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useEffect, useState } from "react"
import { services } from "./services"

export default function App() {
    const [chosenTimeID, setChosenTimeID] = useState('')
    const [movieShowTime, setMovieShowTime] = useState([])
    const [selectedSeatInfo, setSelectedSeatsInfo] = useState(null)
    const [goToSucessPage, setGoToSucessPage] = useState(null)
    const filteredMovieShowTime = movieShowTime?.days?.reduce((acc, item, i, arr) => {
        for (let showtime of item.showtimes) {
            if (showtime.id === Number(chosenTimeID)) {
                console.log("dentro", item)
                acc = { date: item.date, movie: movieShowTime.title, time: showtime.name }
                break;
            }
        }
        return acc

    }, {});
    
    useEffect(() => {
        if (selectedSeatInfo!==null){
            (async function book(){
            try {
                const response = await services.bookSeat({name: selectedSeatInfo.name, cpf: selectedSeatInfo.cpf, ids: selectedSeatInfo.ids})
                setGoToSucessPage(await response.ok)
            } catch (e) {
                console.log(e)
            } })()
        }
    }, [selectedSeatInfo, goToSucessPage])

    return (
        <>
            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/sessoes/:id" element={movieShowTime && <SessionsPage
                        movieShowTime={movieShowTime}
                        setMovieShowTime={setMovieShowTime}
                        setChosenTimeID={setChosenTimeID} />}></Route>
                    <Route path="/assentos/:id" element={<SeatsPage setSelectedSeatsInfo={setSelectedSeatsInfo}/>}></Route>
                    <Route path="/sucesso" element={goToSucessPage && filteredMovieShowTime && selectedSeatInfo && <SuccessPage filteredMovieShowTime={filteredMovieShowTime} selectedSeatInfo={selectedSeatInfo}  /> }></Route>
                </Routes>
            </BrowserRouter>
        </>

    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
