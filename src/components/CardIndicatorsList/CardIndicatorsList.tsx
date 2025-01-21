import { formatCurrency } from '../../utils/formatterCurrency'
import { ContainerCardIndicatorsList } from './styles'
import CardIndicators from './CardIndicators'
import { useGetMetricsQuery } from '../../services/transactionService'

const CardIndicatorsList = () => {
  const { data: metrics } = useGetMetricsQuery()
  return (
    <ContainerCardIndicatorsList>
      <CardIndicators
        title="Balanço"
        value={formatCurrency(metrics?.balance ?? 0)}
        icon="fa-solid fa-arrow-up"
        colorIcon="#17B26A"
        color="#155EEF"
        percentage="0%"
      />
      <CardIndicators
        title="Entradas"
        value={formatCurrency(metrics?.incomes ?? 0)}
        icon="fa-solid fa-arrow-up"
        colorIcon="#17B26A"
        color="#22292F"
        percentage="0%"
      />
      <CardIndicators
        title="Saídas"
        value={formatCurrency(metrics?.expenses ?? 0)}
        icon="fa-solid fa-arrow-down"
        colorIcon="#F04438"
        color="#22292F"
        percentage="0%"
      />
    </ContainerCardIndicatorsList>
  )
}

export default CardIndicatorsList
