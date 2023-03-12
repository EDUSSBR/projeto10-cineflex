import styled from "styled-components"
export default function SeatsPage({title, day, posterURL, filteredSelectedSeats,toggleSeat,selectedSeats,includeName,includeCpf,hashNameCpf,handleSubmit, time }) {
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer >
                {selectedSeats?.map((item) => (
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
                {filteredSelectedSeats?.reduce((acc, item, i) => {
                    acc.push(<InputItem key={item?.id}>
                        Nome do Comprador {item?.name}:
                        <input data-test="client-name" value={(hashNameCpf[item?.id]?.name || " ")} onChange={e => includeName(e.target.value, item?.id)} placeholder="Digite seu nome..." required />
                        CPF do Comprador {item?.name}:
                        <input data-test="client-cpf" type="text" minLength={11} value={(hashNameCpf[item?.id]?.cpf || " ")} onChange={e => includeCpf(e.target.value.trim(), item?.id)} placeholder="Digite seu CPF..." pattern="\d{11}" title="Por favor, digite um cpf valido contendo 11 digitos numéricos"required />
                    </InputItem>)
                    return acc
                }, [])}
                {filteredSelectedSeats?.length > 0 && <button data-test="book-seat-btn"  >Reservar Assento(s)</button>}
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={posterURL} alt="poster" />
                </div>
                <div>
                    <p>{title}</p>
                    <p>{day} - {time}</p>
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