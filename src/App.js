// import { BrowserRouter, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SeatsPage from "./pages/SeatsPage"
import SessionsPage from "./pages/SessionsPage"
import SuccessPage from "./pages/SuccessPage"
import backButton from "./assets/Arrow.svg"
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { useState } from "react"
import { useCinema } from "./hooks/useCinema"

export default function App() {
  const  { appState, getMovieShowTime, getSeats }= useCinema()
  const { hashNameCpf,
    includeName,
    includeCpf,
    selectedSeat,
    handleSubmit,
    filteredSelectedSeat,
    toggleSeat, seatsInfo,
    location,
    setSeatsID,
    setMovieID,
    moviesList,
    setLocation,
    setChosenTimeID,
    movieShowTime,
    filteredMovieShowTime,
    selectedSeatInfo,
    setSelectedSeatsInfo,
    setHashNameCpf,
    chosenTimeID,
     } = appState
    return (
        <>
            {location !== '/' && <Link to={'/'}><BackButton data-test="go-home-header-btn" src={backButton} /></Link>}
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
            getSeats
                <Route path="/" element={<HomePage getMovieShowTime={getMovieShowTime} moviesList={moviesList} setLocation={setLocation} location={location} />}></Route>
                <Route path="/sessoes/:id" element={movieShowTime && <SessionsPage
                    movieShowTime={movieShowTime}
                    setChosenTimeID={setChosenTimeID} />}></Route>
                <Route path="/assentos/:id" element={
                    <SeatsPage
                    getSeats={getSeats}
                        setSeatsID={setSeatsID}
                        setLocation={setLocation}
                        setSelectedSeatsInfo={setSelectedSeatsInfo}
                        time={filteredMovieShowTime?.time}
                        selectedSeat={selectedSeat}
                        seatsInfo={seatsInfo}
                        toggleSeat={toggleSeat}
                        filteredSelectedSeat={filteredSelectedSeat}
                        handleSubmit={handleSubmit}
                        includeName={includeName}
                        includeCpf={includeCpf}
                        hashNameCpf={hashNameCpf}
                        setHashNameCpf={setHashNameCpf}
                    />}></Route>
                {/* <Route path="/sucesso" element={filteredMovieShowTime && selectedSeatInfo && <SuccessPage setLocation={setLocation} filteredMovieShowTime={filteredMovieShowTime} selectedSeatInfo={selectedSeatInfo} />}></Route> */}
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
