import { Container, WrapperAuthComponents, WrapperVideo } from "./styles"
import video from "../../assets/Financy gif de apresentação.mp4"
import Logo from "../../assets/Logo.svg"
import Login from "../../components/Login/Login"
import { useState } from "react"
import SignUp from "../../components/SignUp"
const Welcome = () => {
  const [authType, setAuthType] = useState("login")
  return (
    <Container>
      <WrapperVideo>
        <h1>Seu poderoso controle de finanças!</h1>
        <video src={video} autoPlay loop muted />
      </WrapperVideo>
      <WrapperAuthComponents>
        <div className='wrapper-logo'>
          <img src={Logo} alt='Financy' />
          <span>Financy</span>
        </div>
        {authType === "login" ? (
          <Login />
        ) : (
          <SignUp setAuthType={() => setAuthType("login")} />
        )}
        <p className='account-message'>
          {authType === "login" ? "Não" : "Já"} possui uma conta?{" "}
          <span
            onClick={() =>
              setAuthType(authType === "login" ? "signUp" : "login")
            }>
            Clique aqui
          </span>{" "}
          para fazer o cadastro.
        </p>
      </WrapperAuthComponents>
    </Container>
  )
}

export default Welcome
