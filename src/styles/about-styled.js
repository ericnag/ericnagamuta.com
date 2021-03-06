import styled from "styled-components"

export const Container = styled.div`
    max-width: 700px;
    padding: 30px;
    margin: 0 auto;

    h1 {
        font-size: 40px;
        display: flex;
        color: var(--aboutColor);
        flex-direction: row;
        align-items: center;
        margin-bottom: 40px;
    }

    p {
        font-size: 23px;
        margin-bottom: 20px;
        color: var(--aboutColor);
    }
`

export const Language = styled.div`
    display: flex;
    justify-content: flex-end
`