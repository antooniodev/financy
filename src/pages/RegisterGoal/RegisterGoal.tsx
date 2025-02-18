import { FormProvider, useForm } from 'react-hook-form'
import MoneyValueField from '../../components/Fields/MoneyValueField'
import Modal from '../../components/Modal/Modal'
import { useRegisterUserGoalMutation } from '../../services/userService'
import { useNavigate } from 'react-router-dom'
import { ContainerRegisterGoal } from './styles'
type FormFields = {
  goal: number
}

const RegisterGoal = () => {
  const [registerGoal] = useRegisterUserGoalMutation()
  const navigate = useNavigate()
  const onSubmit = async (data: FormFields) => {
    console.log(data)
    // await registerGoal({ goal: data.goal }).unwrap()
    // navigate('/dashboard')
  }

  const methods = useForm<FormFields>()
  return (
    <Modal
      onClickSubmit={methods.handleSubmit(onSubmit)}
      title={<>Meta de gastos</>}
      isClosable={false}
      textBtnSubmit="Registrar"
    >
      <ContainerRegisterGoal>
        <FormProvider {...methods}>
          <h2>Seja bem vindo ao financy!</h2>
          <p>
            Para começar a organizar sua vida financeira e conquistar seus
            sonhos, registre sua meta de gastos mensal.
          </p>
          <MoneyValueField
            inputName="goal"
            label="Meta de gastos mensal"
            placeholder="Digite o valor da sua meta"
          />
        </FormProvider>
      </ContainerRegisterGoal>
    </Modal>
  )
}

export default RegisterGoal
