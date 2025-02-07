import { ContainerPagination, ContainerTransactionsList } from './styles'
import { formatCurrency } from '../../utils/formatterCurrency'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from '../../services/transactionService'
import { formatterDate } from '../../utils/formatterDate'
import { ITransaction } from '../../entitites/Transaction'
import { useDispatch, useSelector } from 'react-redux'
import { SelectDates } from '../../store/dateFilterSlice'
import { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  setTransactionToDelete,
  setTransactionToEdit,
} from '../../store/Transactions/transactionsSlice'

const TransactionsList = () => {
  const dates = useSelector(SelectDates)
  const [paginationCount, setPaginationCount] = useState(1)
  const [orderFilterSelected, setOrderFilterSelected] = useState('latest')
  const dispatch = useDispatch()
  const {
    data: lastTransactions,
    refetch,
    isLoading,
  } = useGetTransactionsQuery({
    startDate: dates.dateStart,
    endDate: dates.dateEnd,
    page: paginationCount,
    limit: 10,
    orderBy: orderFilterSelected,
  })
  const navigate = useNavigate()
  useEffect(() => {
    refetch()
  }, [paginationCount, refetch, orderFilterSelected])

  const handleDelete = async (transaction: ITransaction) => {
    dispatch(setTransactionToDelete(transaction))
    navigate('/dashboard/deleteTransaction')
  }
  const handleEdit = (transaction: ITransaction) => {
    dispatch(setTransactionToEdit(transaction))
    navigate('/dashboard/editTransaction')
  }

  return (
    <>
      <ContainerTransactionsList>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <header>
              <div className="container-info">
                <span>Últimas Transações</span>
                <p>Olhe suas últimas transações</p>
              </div>
              <div className="container-filter">
                <p>Ordene por:</p>
                <select
                  onChange={e => setOrderFilterSelected(e.target.value)}
                  name="order"
                  defaultValue="latest"
                >
                  <option value="category">Categoria</option>
                  <option value="highestValue">Maior valor</option>
                  <option value="lowestValue">Menor valor</option>
                  <option value="latest">Mais recente</option>
                  <option value="oldest">Mais antigo</option>
                  <option value="type">Tipo</option>
                </select>
              </div>
            </header>

            {lastTransactions?.data && lastTransactions?.data.length > 0 ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Categoria</th>
                      <th>Data</th>
                      <th>Valor</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {lastTransactions?.data.map((transaction: ITransaction) => (
                      <tr key={transaction.id}>
                        <td>
                          <FontAwesomeIcon
                            icon={'fa-solid fa-circle' as IconProp}
                            size="xs"
                            color={transaction.category.color}
                            style={{ marginRight: '0.5rem' }}
                          />
                          {transaction.title}
                        </td>
                        <td>{transaction.category.title}</td>
                        <td>{formatterDate(transaction.date)}</td>
                        <td className={transaction.type ? 'income' : 'expense'}>
                          {formatCurrency(transaction.value)}
                        </td>
                        <td className="actions-column">
                          <FontAwesomeIcon
                            onClick={() => handleEdit(transaction)}
                            icon={'fa-solid fa-pen' as IconProp}
                          />
                          <FontAwesomeIcon
                            onClick={() => handleDelete(transaction)}
                            icon={'fa-solid fa-trash' as IconProp}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <span className="label-noData">
                Não existem transações. Adicione uma entrada ou saída para
                exibi-la.
              </span>
            )}
            <ContainerPagination>
              <button
                type="button"
                disabled={!lastTransactions?.pagination.prev}
                onClick={() =>
                  setPaginationCount(
                    paginationCount > 1 ? paginationCount - 1 : paginationCount
                  )
                }
              >
                <FontAwesomeIcon
                  icon={'fa-solid fa-chevron-left' as IconProp}
                />
              </button>
              <span>{`${paginationCount} de ${lastTransactions?.pagination.total}`}</span>
              <button
                disabled={!lastTransactions?.pagination.next}
                type="button"
                onClick={() => setPaginationCount(paginationCount + 1)}
              >
                <FontAwesomeIcon
                  icon={'fa-solid fa-chevron-right' as IconProp}
                />
              </button>
            </ContainerPagination>
          </>
        )}
      </ContainerTransactionsList>
    </>
  )
}

export default TransactionsList
