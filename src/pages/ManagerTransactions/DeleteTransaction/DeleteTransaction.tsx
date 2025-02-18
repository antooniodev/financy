import { useNavigate } from 'react-router-dom'
import { ContainerDeleteTransaction } from './styles'
import { useSelector } from 'react-redux'
import { useDeleteTransactionMutation } from '../../../services/transactionService'
import { selectTransactionToDeleteState } from '../../../store/Transactions/transactionsSlice'
import Modal from '../../../components/Modal/Modal'

const DeleteTransaction = () => {
  const navigate = useNavigate()
  const transaction = useSelector(selectTransactionToDeleteState)
  const [deleteTransaction] = useDeleteTransactionMutation()
  if (!transaction) {
    navigate('/dashboard')
  }
  const handleDelete = async () => {
    if (!transaction) {
      return
    }
    await deleteTransaction(transaction.id).unwrap()
    navigate('/dashboard')
  }
  return (
    <Modal
      onClickSubmit={handleDelete}
      title={<>Excluir Transação</>}
      toggleClose={() => navigate('/dashboard')}
      textBtnSubmit="Excluir"
    >
      <ContainerDeleteTransaction>
        <p>Tem certeza que deseja excluir essa transação?</p>
        <span>
          {transaction?.title} - R${transaction?.value}
        </span>
      </ContainerDeleteTransaction>
    </Modal>
  )
}

export default DeleteTransaction
