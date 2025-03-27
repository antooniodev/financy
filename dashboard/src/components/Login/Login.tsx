import { useForm } from "react-hook-form"
import { WrapperLoginForm } from "./styles"
import { createStandaloneToast } from "@chakra-ui/toast"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../services/api"
import MoonLoader from "react-spinners/MoonLoader"

const { toast } = createStandaloneToast()
type FormFields = {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const onSubmit = handleSubmit(async (data) => {
    if (isLoading) {
      return
    }
    await login(data).unwrap()
    toast({
      title: "Login efetuado com sucesso",
      description: "Seja bem-vindo ao Financy",
      status: "success",
      duration: 5000,
      position: "top",
    })

    navigate("/dashboard")
  })

  return (
    <WrapperLoginForm>
      <form onSubmit={onSubmit} className='form-content'>
        <div className='wrapper-input'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            {...register("email", {
              required: { message: "* campo obrigatório", value: true },
              pattern: {
                message: "* insira um email válido",
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              },
            })}
            placeholder='Email'
          />
          {errors.email && (
            <span className='error-message'>{errors.email.message}</span>
          )}
        </div>
        <div className='wrapper-input'>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            {...register("password", {
              required: { message: "* campo obrigatório", value: true },
            })}
            placeholder='Senha'
          />
          {errors.password && (
            <span className='error-message'>{errors.password.message}</span>
          )}
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? <MoonLoader color='white' size={20} /> : "Entrar"}
        </button>
      </form>
    </WrapperLoginForm>
  )
}

export default Login
