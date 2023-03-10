import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import { generateObjFromNameAndCpf } from "../genUtil"

export default function SuccessPage({ filteredMovieShowTime, selectedSeatInfo, setLocation }) {
    const { date, movie, time } = filteredMovieShowTime || {}
    const { name, seats } = selectedSeatInfo || {}
    let myObj = generateObjFromNameAndCpf(name)
    const location = useLocation()
    setLocation(location.pathname)
    let arr = []
    for (let item of myObj) {
        arr.push(item)
    }
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>
            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{movie || null}</p>
                <p>{date || null} - {time}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>

                {seats?.map((item, index) =>
                    <p key={index} >Assento {item}</p>
                )}

            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                {arr.map((item,) => {
                    return(
                    <div key={item.id}>
                        <p>NOME: {item.nome || null}</p>
                        <p>CPF: {item.cpf || null}</p>
                    </div>)

                })}
            </TextContainer>
            <Link data-test="go-home-btn" to="/">
                <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`