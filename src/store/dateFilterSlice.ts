import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import dayjs from 'dayjs'

type StateType = {
  dateStart: string
  dateEnd: string
}

const startDate = dayjs().startOf('month').format('YYYY-MM-DD')
const endDate = dayjs().endOf('month').format('YYYY-MM-DD')
const initialState: StateType = {
  dateStart: startDate,
  dateEnd: endDate,
}

export const dateFilterSlice = createSlice({
  name: 'dateFilter',
  initialState,
  reducers: {
    setDates: (state, { payload }: PayloadAction<StateType>) => {
      state.dateStart = payload.dateStart
      state.dateEnd = payload.dateEnd
    },
  },
})

export const { setDates } = dateFilterSlice.actions

export default dateFilterSlice.reducer

export const SelectDates = (state: RootState) => state.dateFilter
