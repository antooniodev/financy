import styled from 'styled-components'

export const ContainerRegisterGoal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    h2 {
        color: ${({ theme }) => theme.colors.green._500};
    }
    label {
        display: none;
    }
    input {
        width: 40%;
        align-self: center;
    }
    p{
        color: ${({ theme }) => theme.colors.gray._300};
        font-size: 1.125rem;
        text-align: center;
    }
`
