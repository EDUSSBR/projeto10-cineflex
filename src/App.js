import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SeatsPage from "./pages/SeatsPage"
import SessionsPage from "./pages/SessionsPage"
import SuccessPage from "./pages/SuccessPage"
import backButton from "./assets/Arrow.svg"
import {
    Routes,
    Route,
} from "react-router-dom";
import { useCinema } from "./hooks/useCinema"

export default function App() {
    const { appState, getMovieShowTime, getSeats, includeName, includeCpf, toggleSeat, resetApp, handleSubmit } = useCinema()
    const { hashNameCpf,
        selectedSeats,
        filteredSelectedSeats,
        seatsInfo,
        moviesList,
        movieShowTime,
        time,
        date
    } = appState
    return (
        <>
            {appState.movieShowTime !== undefined && <BackButton onClick={() => resetApp()} data-test="go-home-header-btn" src={backButton} />}
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                getSeats
                <Route path="/" element={<HomePage getMovieShowTime={getMovieShowTime} moviesList={moviesList} />}></Route>
                <Route path="/sessoes/:id" element={movieShowTime && <SessionsPage
                    movieShowTime={movieShowTime}
                    getSeats={getSeats} />}></Route>
                <Route path="/assentos/:id" element={
                    <SeatsPage
                        includeName={includeName}
                        includeCpf={includeCpf}
                        selectedSeats={selectedSeats}
                        filteredSelectedSeats={filteredSelectedSeats}
                        time={time}
                        toggleSeat={toggleSeat}
                        handleSubmit={handleSubmit}
                        hashNameCpf={hashNameCpf}

                        posterURL={seatsInfo?.posterURL}
                        title={seatsInfo?.title}
                        day={seatsInfo?.day}

                    />}></Route>
                <Route path="/sucesso" element={<SuccessPage
                    resetApp={resetApp}
                    filteredSelectedSeats={filteredSelectedSeats}
                    hashNameCpf={hashNameCpf}
                    chosenMovie={movieShowTime?.title}
                    time={time}
                    date={date}
                />}></Route>
            </Routes>
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
