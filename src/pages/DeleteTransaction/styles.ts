import styled from 'styled-components'

export const ContainerDeleteTransaction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 1.125rem;
        line-height: 1.75rem;
        color: ${({ theme }) => theme.colors.black._900};
        margin-bottom: 0.8rem;
    }

    span {
        font-size: 1.125rem;
        line-height: 1.75rem;
        color: ${({ theme }) => theme.colors.blue._600};
        font-weight: 600;
    }
`
