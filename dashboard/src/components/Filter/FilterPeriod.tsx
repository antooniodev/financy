import { useEffect, useState } from 'react'
import { SListItem, WrapperFilter } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { setDates } from '../../store/dateFilterSlice'
const FilterPeriod = () => {
  const [period, setPeriod] = useState<number>(1)
  const [activateCustomPeriod, setActivateCustomPeriod] =
    useState<boolean>(false)
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ])

  const dispatch = useDispatch()
  const [customStartDate, customEndDate] = dateRange

  const getPeriod = (periodSelected: number) => {
    switch (periodSelected) {
      case 1: {
        const startDate = dayjs().startOf('month').format('YYYY-MM-DD')
        const endDate = dayjs().endOf('month').format('YYYY-MM-DD')
        dispatch(setDates({ dateStart: startDate, dateEnd: endDate }))
        break
      }
      case 2: {
        const startDateInLastMonth = dayjs()
          .startOf('month')
          .subtract(1, 'month')
          .format('YYYY-MM-DD')
        const endDateInLastMonth = dayjs()
          .endOf('month')
          .subtract(1, 'month')
          .format('YYYY-MM-DD')
        dispatch(
          setDates({
            dateStart: startDateInLastMonth,
            dateEnd: endDateInLastMonth,
          })
        )
        break
      }
      case 3: {
        const startDateInThisYear = dayjs().startOf('year').format('YYYY-MM-DD')
        const endDateInThisYear = dayjs().endOf('year').format('YYYY-MM-DD')
        dispatch(
          setDates({
            dateStart: startDateInThisYear,
            dateEnd: endDateInThisYear,
          })
        )
        break
      }
      case 4: {
        const startDateInLast12Months = dayjs()
          .startOf('month')
          .subtract(12, 'month')
          .format('YYYY-MM-DD')
        const endDateInLast12Months = dayjs()
          .endOf('month')
          .format('YYYY-MM-DD')
        dispatch(
          setDates({
            dateStart: startDateInLast12Months,
            dateEnd: endDateInLast12Months,
          })
        )
        break
      }
      case 5: {
        const dateStartFormatted = dayjs(customStartDate).format('YYYY-MM-DD')
        const dateEndFormatted = dayjs(customEndDate).format('YYYY-MM-DD')
        if (dateStartFormatted && dateEndFormatted) {
          console.log('chamou')

          dispatch(
            setDates({
              dateStart: dateStartFormatted,
              dateEnd: dateEndFormatted,
            })
          )
        }
      }
    }
  }

  useEffect(() => {}, [customStartDate, customEndDate])

  useEffect(() => {
    console.log('aqui')

    getPeriod(1)
  }, [])

  const handleSubmitCustomPeriod = () => {
    if (customEndDate && customStartDate) {
      getPeriod(5)
    }
  }

  return (
    <WrapperFilter>
      <SListItem
        $isCustomPeriod={false}
        $isActive={period === 1}
        onClick={() => {
          setPeriod(1)
          getPeriod(1)
          setActivateCustomPeriod(false)
        }}
      >
        Esse mês
      </SListItem>
      <SListItem
        $isCustomPeriod={false}
        $isActive={period === 2}
        onClick={() => {
          setPeriod(2)
          getPeriod(2)
          setActivateCustomPeriod(false)
        }}
      >
        Último mês
      </SListItem>
      <SListItem
        $isCustomPeriod={false}
        $isActive={period === 3}
        onClick={() => {
          setPeriod(3)
          getPeriod(3)
          setActivateCustomPeriod(false)
        }}
      >
        Esse ano
      </SListItem>
      <SListItem
        $isCustomPeriod={false}
        $isActive={period === 4}
        onClick={() => {
          setPeriod(4)
          getPeriod(4)
          setActivateCustomPeriod(false)
        }}
      >
        Últimos 12 meses
      </SListItem>
      <SListItem
        $isCustomPeriod={true}
        $isActive={period === 5}
        onClick={() => {
          setPeriod(5)
          setActivateCustomPeriod(true)
        }}
      >
        {activateCustomPeriod ? (
          <div className="container-custom-period">
            <DatePicker
              selectsRange={true}
              placeholderText="Início - Fim"
              startDate={customStartDate}
              endDate={customEndDate}
              onChange={update => {
                setDateRange(update)
              }}
              onBlur={() => {
                if (!dateRange[0] && !dateRange[1]) {
                  setActivateCustomPeriod(false)
                  setPeriod(1)
                  getPeriod(1)
                }
              }}
              isClearable={true}
            />
            <button
              className="save-button"
              type="button"
              onClick={() => handleSubmitCustomPeriod()}
            >
              Salvar
            </button>
          </div>
        ) : (
          <div onClick={() => setActivateCustomPeriod(true)}>
            <FontAwesomeIcon
              style={{ marginRight: '0.25rem' }}
              icon={'fa-solid fa-calendar-week' as IconProp}
              color="#516778"
              size="lg"
            />
            Selecione o período
          </div>
        )}
      </SListItem>
    </WrapperFilter>
  )
}

export default FilterPeriod
