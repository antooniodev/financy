import { FormProvider, useForm } from 'react-hook-form'
import MoneyValueField from '../../components/Fields/MoneyValueField'
import Modal from '../../components/Modal/Modal'
import {
  useGetMonthlyGoalQuery,
  useRegisterUserGoalMutation,
} from '../../services/userService'
import { useNavigate } from 'react-router-dom'
import { ContainerRegisterGoal } from './styles'
type FormFields = {
  goal: number
}

const MonthlyGoal = () => {
  const [registerGoal] = useRegisterUserGoalMutation()
  const navigate = useNavigate()
  const onSubmit = async (data: FormFields) => {
    await registerGoal({ monthlyGoal: data.goal }).unwrap()
    navigate('/dashboard')
  }

  const { data: goal } = useGetMonthlyGoalQuery()

  const methods = useForm<FormFields>()
  return (
    <Modal
      onClickSubmit={methods.handleSubmit(onSubmit)}
      title={<>Meta de gastos</>}
      isClosable={true}
      toggleClose={() => navigate('/dashboard')}
      textBtnSubmit="Registrar"
    >
      <ContainerRegisterGoal>
        <FormProvider {...methods}>
          <h2>Uma vida equilibrada!</h2>
          <p>
            Para começar a organizar sua vida financeira e conquistar seus
            sonhos, registre sua meta de gastos mensal.
          </p>
          <MoneyValueField
            defaultValue={goal?.monthlyGoal}
            inputName="goal"
            label="Meta de gastos mensal"
            placeholder="Digite o valor da sua meta"
          />
        </FormProvider>
      </ContainerRegisterGoal>
    </Modal>
  )
}

export default MonthlyGoal
