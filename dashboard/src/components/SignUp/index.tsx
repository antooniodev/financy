import { useForm } from "react-hook-form"
import { WrapperSignUpForm } from "./styles"
import { createStandaloneToast } from "@chakra-ui/toast"
import { useCreateUserMutation } from "../../services/userService"
import { UserRequestBody } from "../../entitites/User"
import MoonLoader from "react-spinners/MoonLoader"
const { toast } = createStandaloneToast()
type FormFields = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPass: string
}

type SignUpProps = {
  setAuthType: () => void
}
const SignUp = ({ setAuthType }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormFields>()

  const [createUser, { isLoading }] = useCreateUserMutation()

  const onSubmit = handleSubmit(async (data) => {
    const dto: UserRequestBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }

    await createUser(dto).unwrap()

    toast({
      title: "Conta criada com sucesso",
      description: "Efetue o login para entrar",
      status: "success",
      duration: 5000,
      position: "top",
    })

    setAuthType()
  })
  return (
    <WrapperSignUpForm>
      <form onSubmit={onSubmit} className='form-content'>
        <div className='wrapper-input'>
          <label htmlFor='email'>Nome</label>
          <input
            type='text'
            {...register("firstName", {
              required: { message: "* campo obrigatório", value: true },
              minLength: {
                message: "O nome precisa ter no mínimo 3 caracteres",
                value: 3,
              },
            })}
            placeholder='Nome'
          />
          {errors.firstName && (
            <span className='error-message'>{errors.firstName.message}</span>
          )}
        </div>
        <div className='wrapper-input'>
          <label htmlFor='email'>Sobrenome</label>
          <input
            type='text'
            {...register("lastName", {
              required: { message: "* campo obrigatório", value: true },
              minLength: {
                message: "O sobrenome precisa ter no mínimo 3 caracteres",
                value: 3,
              },
            })}
            placeholder='Sobrenome'
          />
          {errors.lastName && (
            <span className='error-message'>{errors.lastName.message}</span>
          )}
        </div>
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
        <div className='wrapper-input'>
          <label htmlFor='password'>Confirmar senha</label>
          <input
            type='password'
            {...register("confirmPass", {
              required: { message: "* campo obrigatório", value: true },
              validate: (value, formValues) => {
                const isValid = value === formValues.password
                if (!isValid) {
                  setError("confirmPass", {
                    message: "Insira a senha corretamente",
                  })
                }
                return isValid || "Insira a senha corretamente"
              },
            })}
            placeholder='Confirmar senha'
          />
          {errors.confirmPass && (
            <span className='error-message'>{errors.confirmPass.message}</span>
          )}
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? <MoonLoader color='white' size={20} /> : "Cadastrar"}
        </button>
      </form>
    </WrapperSignUpForm>
  )
}

export default SignUp
