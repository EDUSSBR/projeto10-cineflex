import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import { services } from "../../services"

export default function SeatsPage({ setSelectedSeatsInfo }) {
    const { id: sessionID } = useParams()
    const [seatsInfo, setSeatsInfo] = useState([])
    const [selectedSeat, setSelectedSeats] = useState([])
    const nameRef = useRef('')
    const cpfRef = useRef('')

    useEffect(() => {
        (async function initialize() {
            const response = await services.getSeats(sessionID)
            const { movie: { title, posterURL }, seats, day: { weekday }, id } = await response.json()
            setSeatsInfo(prev => ({ title, seats, day: weekday, id, posterURL }))
            setSelectedSeats(prev => (seats.map(item => ({ ...item, isSelected: false }))))
        })()
    }, [sessionID])
    function toggleSeat(id) {

        setSelectedSeats(prev => prev.map(item => {
            if (item.id === id) {
                if (item.isAvailable===false){
                    alert("Esse assento não está disponível")
                }
                return { ...item, isSelected: !item.isSelected }
            }
            return item
        }))}
        async function handleSubmit(e) {
            // e.preventDefault()
            const name = nameRef.current.value
            const cpf = cpfRef.current.value
            const filteredSelectedSeat = selectedSeat.filter((item, index) => {
                console.log(index)
                return item.isSelected === true
            })
            const idArray = filteredSelectedSeat.map(item => item.id)
            const seatArray = filteredSelectedSeat.map(item => item.name)
            console.log(filteredSelectedSeat)
            const isSomeInfoMissing = name.length === 0 || cpf.length === 0 || idArray.length === 0;
            if (isSomeInfoMissing) return;
            let body = { name, cpf, ids: idArray, seats: seatArray }
            setSelectedSeatsInfo(body)

        }
        return (
            <PageContainer>
                Selecione o(s) assento(s)

                <SeatsContainer >
                    {selectedSeat.map((item) => (
                        <SeatItem key={item.id} onClick={() => toggleSeat(item.id)} isAvailable={item.isAvailable} isSelected={item.isSelected}>{item.name}</SeatItem>
                    ))}
                </SeatsContainer>

                <CaptionContainer>
                    <CaptionItem  >
                        <CaptionCircle isAvailable={true} isSelected={true} />
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle isAvailable={true} isSelected={false} />
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle isAvailable={false} />
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer >
                    Nome do Comprador:
                    <input ref={nameRef} placeholder="Digite seu nome..." />

                    CPF do Comprador:
                    <input ref={cpfRef} placeholder="Digite seu CPF..." />

                    <Link to={'/sucesso'}> <button onClick={(e) => handleSubmit(e)} >Reservar Assento(s)</button></Link>
                </FormContainer>

                <FooterContainer>
                    <div>
                        <img src={seatsInfo.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{seatsInfo.title}</p>
                        <p>{seatsInfo.day} - 14h00</p>
                    </div>
                </FooterContainer>

            </PageContainer>
        )
    }

    const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
    const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
    const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    &>a {
        text-decoration: none;
    }
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
    const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
    // background: #FBE192;
    // border: 1px solid #F7C52B;
    // background: ;
    // border: 1px solid #0E7D71;
    const CaptionCircle = styled.div`
    border: ${({ isAvailable, isSelected }) => {
            if (!isAvailable) {
                return '1px solid #F7C52B'
            } else if (isSelected) {
                return '1px solid #0E7D71'
            } else {
                return '1px solid #7B8B99'
            }
        }};         // Essa cor deve mudar
    background-color: ${({ isAvailable, isSelected }) => {
            if (!isAvailable) {
                return '#FBE192'
            } else if (isSelected) {
                return '#1AAE9E'
            } else {
                return '#C3CFD9';
            }
        }};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
    const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
    const SeatItem = styled.div`
    border: ${({ isAvailable, isSelected }) => {
            if (!isAvailable) {
                return '1px solid #F7C52B'
            } else if (isSelected) {
                return '1px solid #0E7D71'
            } else {
                return '1px solid #7B8B99'
            }
        }};         // Essa cor deve mudar
    background-color: ${({ isAvailable, isSelected }) => {
            if (!isAvailable) {
                return '#FBE192'
            } else if (isSelected) {
                return '#1AAE9E'
            } else {
                return '#C3CFD9';
            }
        }} ;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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