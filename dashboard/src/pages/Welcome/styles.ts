import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: white;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

export const WrapperVideo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
  gap: 2rem;
  height: 100vh;
  background: rgb(234, 244, 255);
  background: linear-gradient(
    0deg,
    rgba(234, 244, 255, 1) 0%,
    rgba(146, 200, 255, 1) 100%
  );

  h1 {
    font-size: 2.3rem;
    text-align: center;
    color: #1850dd;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    line-height: 2.2rem;
  }

  video {
    width: 80%;
    border-radius: 0.8rem;
    box-shadow: 2px 4px 10.6px 0 rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const WrapperAuthComponents = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25%;
  min-width: fit-content;

  .wrapper-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 600;
    }
  }

  .account-message {
    color: ${({ theme }) => theme.colors.gray._600};
    font-size: 0.8rem;
    span {
      color: ${({ theme }) => theme.colors.blue._600};
      font-size: 0.8rem;
      cursor: pointer;
    }
  }
`
