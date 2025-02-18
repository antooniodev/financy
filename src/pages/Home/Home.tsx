import FilterPeriod from '../../components/Filter/FilterPeriod'
import { ContainerHome, SSection } from './styles'
import CardTransactions from '../../components/CardTransactions'
import CategoryChart from '../../components/SummaryCard'
import TransactionsList from '../../components/TransactionsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { Outlet, useNavigate } from 'react-router-dom'
import CardIndicatorsList from '../../components/CardIndicatorsList/CardIndicatorsList'
import { useGetMonthlyGoalQuery } from '../../services/userService'
import { formatCurrency } from '../../utils/formatterCurrency'
const Home = () => {
  // const transactions = useSelector(selectTransactions)
  const navigate = useNavigate()
  const { data } = useGetMonthlyGoalQuery()
  return (
    <>
      <ContainerHome>
        <div className="home-content">
          <header className="home-header">
            <h1>Olá, Antonio!</h1>
            <section className="container-period">
              <FilterPeriod />
            </section>
          </header>
          <CardIndicatorsList />
          <SSection>
            <CardTransactions
              navigateTo="/dashboard/monthlyGoal"
              bgdIconColor="#F9FAFB"
              title="Sua meta mensal"
              explanation={`${formatCurrency(data?.totalOfExpenses ?? 0)} de ${formatCurrency(data?.monthlyGoal ?? 0)} | ${(data?.percentageOfExpenses ?? 0).toFixed(2)}%`}
              icon={
                <FontAwesomeIcon
                  color="#155EEF"
                  icon={'fa-solid fa-arrow-right-arrow-left' as IconProp}
                />
              }
            />
            <CardTransactions
              navigateTo="/dashboard/addIncome"
              bgdIconColor="#DCFAE6"
              title="Adicionar entrada"
              explanation="Crie manualmente uma entrada"
              icon={
                <FontAwesomeIcon
                  color="#0B9055"
                  icon={'fa-solid fa-plus' as IconProp}
                />
              }
            />
            <CardTransactions
              navigateTo="/dashboard/addExpense"
              bgdIconColor="#FEE4E2"
              title="Adicionar saída"
              explanation="Crie manualmente uma saída"
              icon={
                <FontAwesomeIcon
                  color="#D92D20"
                  icon={'fa-solid fa-minus' as IconProp}
                />
              }
            />
          </SSection>
          <SSection className="transactions-section">
            <CategoryChart />
            <TransactionsList />
          </SSection>
        </div>
      </ContainerHome>
      <Outlet />
    </>
  )
}

export default Home
