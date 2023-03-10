import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import styled from "styled-components"
import { services } from "../services"

export default function SessionsPage({setChosenTimeID, setMovieShowTime, movieShowTime,setLocation}) {
    const { id: movieID } = useParams()
    const location = useLocation()
    setLocation(location.pathname)
    useEffect(() => {
        (async function initialize() {
            const response = await services.getMovieShowTimes(movieID)
            const { days, posterURL, title } = await response.json()
            setMovieShowTime(prev => ({ days, posterURL, title }))
        })()
    }, [])
    return (
        <PageContainer>
            Selecione o horário
            {movieShowTime?.days?.length > 0 && movieShowTime.days.map((item) => (
                <div key={item.id}>
                    <SessionContainer data-test="movie-day">
                        {item.weekday} - {item.date}
                        <ButtonsContainer >
                        {item.showtimes.map(showtime => (
                                <Link  key={showtime.id} to={`/assentos/${showtime.id}`}>
                                    <button data-test="showtime"  onClick={()=>setChosenTimeID({id: showtime.id, time: showtime.name})}>{showtime.name}</button>
                                </Link>
                        ))}
                        </ButtonsContainer>
                    </SessionContainer>

                </div>
            ))}
            <FooterContainer data-test="footer">
                <div>
                    <img src={movieShowTime.posterURL} alt={movieShowTime.title} />
                </div>
                <div>
                    <p>{movieShowTime.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`