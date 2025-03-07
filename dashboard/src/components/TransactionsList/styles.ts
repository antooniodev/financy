import styled from 'styled-components'

export const ContainerTransactionsList = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray._200};
  position: relative;

  overflow-x: auto;
  header {
    margin: 1.5rem;
    display: flex;
    gap: 2rem;
    align-self: flex-start;
    span {
      font-weight: 600;
      font-size: 1.125rem;
      line-height: 1.75rem;
      color: ${({ theme }) => theme.colors.black._900};
    }

    p {
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray._600};
    }

    .container-filter {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  table {
    border-collapse: collapse;
    text-align: left;
    overflow-x: hidden;
    th,
    td {
      padding: 0.875rem 1.5rem;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray._600};

      white-space: pre-wrap;
      word-break: break-word;
      @media (max-width: 900px) {
        white-space: pre;
        word-break: break-word;
      }
    }
    .income {
        color: ${({ theme }) => theme.colors.green._500};
    }

    .expense {
      color: ${({ theme }) => theme.colors.black._900};
    }

    th {
      color: ${({ theme }) => theme.colors.gray._600};
      font-size: 0.875rem;
      font-weight: 300;
      padding: 0.5rem 1.5rem;
      background-color: ${({ theme }) => theme.colors.gray._50};
      border: 1px solid ${({ theme }) => theme.colors.gray._200};
    }
  }
  svg {
    cursor: pointer;
    margin-left: 1rem;
  }
  
  .actions-column {
    display: flex;
    align-items: center;
  }
  .label-noData {
    margin: 1rem;
    align-self: center;
    color: ${({ theme }) => theme.colors.black._900};
  }
`

export const ContainerPagination = styled.div`
  margin: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;

  button  {
    background-color: white;
    border: none;
    &:disabled {
      cursor: not-allowed;
    }
  }
  svg  {
    margin: 0;
  }
`
