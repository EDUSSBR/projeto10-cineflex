// import { BrowserRouter, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SeatsPage from "./pages/SeatsPage"
import SessionsPage from "./pages/SessionsPage"
import SuccessPage from "./pages/SuccessPage"
import backButton from "./assets/Arrow.svg"
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react"
import { services } from "./services"

export default function App() {
    const [chosenTimeID, setChosenTimeID] = useState({})
    const [movieShowTime, setMovieShowTime] = useState([])
    const [selectedSeatInfo, setSelectedSeatsInfo] = useState(null)
    const [goToSucessPage, setGoToSucessPage] = useState(null)
    const [location, setLocation] = useState(null)
    let filteredMovieShowTime = []
    for (let i = 0; i < movieShowTime?.days?.length; i++) {
        for (let showtime of movieShowTime?.days[i]?.showtimes) {
            if (showtime.id === Number(chosenTimeID.id)) {
                filteredMovieShowTime = { time: showtime.name, date: movieShowTime.days[i].date, movie: movieShowTime.title, time: showtime.name }
                break;
            }
        }
    }
    useEffect(() => {
        if (selectedSeatInfo !== null) {
            (async function book() {
                try {
                    const response = await services.bookSeat({ name: selectedSeatInfo.name, cpf: selectedSeatInfo.cpf, ids: selectedSeatInfo.ids })
                    setGoToSucessPage(await response.ok)
                } catch (e) {
                    console.log(e)
                }
            })()
        }
    }, [selectedSeatInfo, goToSucessPage])
    return (
        <>
            <BrowserRouter>
                {location !== '/' && <Link to={'/'}><BackButton data-test="go-home-header-btn" src={backButton} /></Link>}
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>

                    <Route path="/" element={<HomePage setLocation={setLocation} />}></Route>
                    <Route path="/sessoes/:id" element={movieShowTime && <SessionsPage
                        setLocation={setLocation}
                        movieShowTime={movieShowTime}
                        setMovieShowTime={setMovieShowTime}
                        setChosenTimeID={setChosenTimeID} />}></Route>
                    <Route path="/assentos/:id" element={<SeatsPage  setLocation={setLocation} setSelectedSeatsInfo={setSelectedSeatsInfo} time={filteredMovieShowTime.time} />}></Route>
                    <Route path="/sucesso" element={goToSucessPage && filteredMovieShowTime && selectedSeatInfo && <SuccessPage setLocation={setLocation} filteredMovieShowTime={filteredMovieShowTime} selectedSeatInfo={selectedSeatInfo} />}></Route>
                </Routes>
            </BrowserRouter>
        </>

    )
}

const BackButton = styled.img`
    position: fixed;
    top: 22px;
    left: 18px;
    z-index:1;
`

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
