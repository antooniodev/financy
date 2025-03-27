import styled from "styled-components"

export const WrapperLoginForm = styled.section`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 2rem;
  width: 28rem;

  .form-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .wrapper-input {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    input {
      height: 3rem;
      border: none;
      border: 1px solid ${({ theme }) => theme.colors.blue._600};
      border-radius: 6px;
      padding: 0 1.2rem;

      &:focus {
        outline: none;
        border: 2px solid ${({ theme }) => theme.colors.blue._600};
      }
    }

    button {
      align-self: center;
      background-color: ${({ theme }) => theme.colors.blue._600};
      border-color: ${({ theme }) => theme.colors.blue._600};
      color: #ffffff;
      font-weight: 600;
      box-shadow: none;
      height: 2.8rem;
      width: 100%;
      border-radius: 6px;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .error-message {
      color: ${({ theme }) => theme.colors.red._500};
      font-size: 0.8rem;
    }
  }
`
