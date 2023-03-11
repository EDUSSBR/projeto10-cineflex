import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { generateObjFromNameAndCpf } from "../genUtil"
import { services } from "../services"
export default function SeatsPage({ getSeats, setSeatsID,setHashNameCpf,hashNameCpf,handleSubmit,filteredSelectedSeat=[],selectedSeat, toggleSeat,setSelectedSeatsInfo, time, setLocation,seatsInfo, selectedSeatsInfo }) {
    // const { id: sessionID } = useParams()
    // setSeatsID(sessionID)


    // function includeName(name, id, i) {

    //     setHashNameCpf(prev => prev[id] ? { ...prev, [id]: { ...prev[id], name } } : { ...prev, [id]: { name } })
    // }
    // function includeCpf(cpf, id, i) {
    //     setHashNameCpf(prev => prev[id] ? { ...prev, [id]: { ...prev[id], cpf } } : { ...prev, [id]: { cpf } })
    // }
    // const [seatsInfo, setSeatsInfo] = useState([])
    // const [name, setName] = useState()
    // const [selectedSeat, setSelectedSeats] = useState([])
    // const location = useLocation()
    // const navigate = useNavigate()
    // setLocation(location.pathname)
    // function includeName(name, id, i) {

    //     setName(prev => prev[id] ? { ...prev, [id]: { ...prev[id], name } } : { ...prev, [id]: { name } })
    // }
    // function includeCpf(cpf, id, i) {
    //     setName(prev => prev[id] ? { ...prev, [id]: { ...prev[id], cpf } } : { ...prev, [id]: { cpf } })
    // }
    // function resetName(id) {
    //     setName(prev => {
    //         let obj = { ...prev }
    //         Reflect.deleteProperty(obj, id);
    //         return obj
    //     })
    // }
    // useEffect(() => {
    //     (async function initialize() {
    //         const response = await services.getSeats(sessionID)
    //         const { movie: { title, posterURL }, seats, day: { weekday }, id } = await response.json()
    //         setSeatsInfo(prev => ({ title, seats, day: weekday, id, posterURL }))
    //         setSelectedSeats(prev => (seats.map(item => ({ ...item, isSelected: false }))))
    //     })()
    // }, [])
    // function toggleSeat(id) {
    //     if (name===undefined){
    //         setName({})
    //     }
    //     setSelectedSeats(prev => prev.map(item => {
    //         if (item.id === id) {
    //             if (item.isAvailable === false) {
    //                 alert("Esse assento não está disponível")
    //                 return item
    //             }
    //             if (item.isSelected === true) {
    //                 let confirmation = window.confirm("Gostaria de remover o assento e apagar os dados?")
    //                 if (!confirmation) {
    //                     return item;
    //                 } else {
    //                     resetName(item.id)
    //                 }
    //             }
    //             return { ...item, isSelected: !item.isSelected }
    //         }
    //         return item
    //     }))
    // }
    // const filteredSelectedSeat = selectedSeat.filter((item, index) => {
    //     return item.isSelected === true
    // })
    // async function handleSubmit(e) {
    //     e.preventDefault()

    //     const idArray = filteredSelectedSeat.map(item => item.id)
    //     const seatArray = filteredSelectedSeat.map(item => item.name)
    //     let body = { name, ids: idArray, seats: seatArray }
    //     setSelectedSeatsInfo(body)

    //     try {
        //         let newObj = generateObjFromNameAndCpf(name)
        //         let arr=[]
    //         for (let item of newObj){
    //             arr.push(item)
    //         }
    //         const response = await services.bookSeat({ compradores: arr, ids: idArray })
    //         if (response.ok){
    //             navigate('/sucesso')
    //         } else {
    //             console.log('não foi dessa vez amigo')
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    console.log("filtradossssssssssss",filteredSelectedSeat)
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer >
                {selectedSeat?.map((item) => (
                    <SeatItem key={item.id} data-test="seat" onClick={(e) => 
                        toggleSeat(item.id)
                   } isAvailable={item.isAvailable} isSelected={item.isSelected}>{item.name}</SeatItem>
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

            <FormContainer onSubmit={(e) => handleSubmit(e)}>
                {filteredSelectedSeat?.reduce((acc, item, i) => {
                    console.log(item)
                    acc.push(<InputItem key={item?.id}>
                        Nome do Comprador {item?.name}:
                        <input data-test="client-name" value={(hashNameCpf[item?.id]?.name || " ").trim()} onChange={e => includeName(e.target.value, item?.id)} placeholder="Digite seu nome..." required />

                        CPF do Comprador {item?.name}:
                        <input data-test="client-cpf" value={(hashNameCpf[item?.id]?.cpf || " ").trim()} onChange={e => includeCpf(e.target.value, item?.id)} placeholder="Digite seu CPF..." required />
                    </InputItem>)
                    return acc
                }, [])}
                {filteredSelectedSeat?.length > 0 && <button data-test="book-seat-btn"  >Reservar Assento(s)</button>}
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={seatsInfo.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seatsInfo.title}</p>
                    <p>{seatsInfo.day} - {time}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}
const InputItem = styled.div`
    
    `
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