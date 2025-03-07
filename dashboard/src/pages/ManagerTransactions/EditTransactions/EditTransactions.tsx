import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import DateField from '../../../components/Fields/DateField'
import MoneyValueField from '../../../components/Fields/MoneyValueField'
import SelectField from '../../../components/Fields/SelectField'
import { useGetAllCategoriesByTypeQuery } from '../../../services/categoryService'
import { useEditTransactionMutation } from '../../../services/transactionService'
import { ContainerTransactionForm } from '../styles'
import Modal from '../../../components/Modal/Modal'
import TextField from '../../../components/Fields/TextField'
import { EditTransactionDto } from '../../../entitites/Transaction'
import { useSelector } from 'react-redux'
import { selectTransactionToEditState } from '../../../store/Transactions/transactionsSlice'

type FormFields = {
  title: string
  value: number
  categoryId: string
  date: string
}

const EditTransactions = () => {
  const navigate = useNavigate()
  const methods = useForm<FormFields>()
  useParams()

  const transaction = useSelector(selectTransactionToEditState)

  const { data: categories } = useGetAllCategoriesByTypeQuery(
    !!transaction?.type
  )

  const [editTransaction] = useEditTransactionMutation()
  const onSubmit = async (data: FormFields) => {
    const formatDate = dayjs(data.date, 'DD/MM/YYYY').toISOString()
    if (!transaction) {
      return
    }
    const dto: EditTransactionDto = {
      ...data,
      id: transaction.id,
      date: formatDate,
      value: data.value * 100,
      type: transaction?.type,
    }
    await editTransaction(dto).unwrap()
    navigate('/dashboard')
  }

  console.log('renderizou')

  return (
    <Modal
      onClickSubmit={methods.handleSubmit(onSubmit)}
      title={
        <>
          Editar {transaction?.type ? 'entrada' : 'saída'}
          <FontAwesomeIcon
            color={transaction?.type ? '#0B9055' : '#F04438'}
            icon={
              `${
                transaction?.type
                  ? 'fa-solid fa-arrow-up'
                  : 'fa-solid fa-arrow-down'
              }` as IconProp
            }
          />
        </>
      }
      toggleClose={() => navigate('/dashboard')}
    >
      <FormProvider {...methods}>
        <ContainerTransactionForm>
          <TextField
            defaultValue={transaction?.title}
            inputName="title"
            label="Insira o título:"
            placeholder="Digite o título da transação..."
          />
          <MoneyValueField
            defaultValue={transaction?.value}
            inputName="value"
            label="Insira o valor:"
            placeholder="Digite o valor da transação..."
          />
          <DateField
            defaultValue={dayjs(transaction?.date).format('YYYY-MM-DD')}
            inputName="date"
            label="Insira a data:"
            placeholder="dd/mm/aaaa"
          />
          <SelectField
            defaultValue={transaction?.category.id}
            options={categories ?? []}
            inputName="categoryId"
            label="Escolha a categoria:"
            placeholder="Selecione a categoria..."
          />
        </ContainerTransactionForm>
      </FormProvider>
    </Modal>
  )
}

export default EditTransactions
