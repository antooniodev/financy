import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITransaction } from '../../entitites/Transaction'
import { RootState } from '../store'
import { ICategory } from '../../entitites'

type TransactionsState = {
  transactions: ITransaction[]
  categories: ICategory[]
  transactionToEdit: ITransaction | null
  transactionToDelete: ITransaction | null
}
const initialState: TransactionsState = {
  transactions: [],
  categories: [],
  transactionToEdit: null,
  transactionToDelete: null,
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, { payload }: PayloadAction<ITransaction>) => {
      state.transactions.push(payload)
    },
    setTransactionToEdit: (state, { payload }: PayloadAction<ITransaction>) => {
      state.transactionToEdit = payload
    },
    setTransactionToDelete: (
      state,
      { payload }: PayloadAction<ITransaction>
    ) => {
      state.transactionToDelete = payload
    },
  },
})

export const { addTransaction, setTransactionToEdit, setTransactionToDelete } =
  transactionsSlice.actions

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions
export const selectCategories = (state: RootState) =>
  state.transactions.categories

export const selectTransactionToEditState = (state: RootState) =>
  state.transactions.transactionToEdit

export const selectTransactionToDeleteState = (state: RootState) =>
  state.transactions.transactionToDelete

export default transactionsSlice.reducer
