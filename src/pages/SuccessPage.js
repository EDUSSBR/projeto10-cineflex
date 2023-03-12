import styled from "styled-components"

export default function SuccessPage({ date, time, chosenMovie, filteredSelectedSeats, resetApp,arr}) {
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>
            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{chosenMovie || null}</p>
                <p>{date || null} - {time}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>

                {filteredSelectedSeats?.map((item, index) =>
                    <p key={index} >Assento {item.name}</p>
                )}

            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador{'('}es{')'}</p></strong>
                {arr?.map((item) => {
                    return (
                        <div key={item.id}>
                            <p>Nome: {item.nome }</p>
                            <p>CPF: {item.cpf }</p>
                        </div>)
                })}
            </TextContainer>
            <button data-test="go-home-btn" onClick={() => resetApp()}>Voltar para Home</button>
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