import {
  EditTransactionDto,
  IMetrics,
  ITransactionsWithPagination,
  TransactionDto,
} from '../entitites/Transaction'
import { api } from './api'
type GetTransactionsParams = {
  startDate: string
  endDate: string
}
type GetTransactionsWithPaginationParams = {
  startDate: string
  endDate: string
  page: number
  limit: number
  orderBy: string
}

const TransactionService = api.injectEndpoints({
  endpoints: builder => ({
    getTransactions: builder.query<
      ITransactionsWithPagination,
      GetTransactionsWithPaginationParams
    >({
      query: ({
        startDate,
        endDate,
        page,
        limit,
        orderBy,
      }: GetTransactionsWithPaginationParams) =>
        `/transactions?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&orderBy=${orderBy}`,
      providesTags: ['Transaction'],
    }),
    addTransaction: builder.mutation<string, TransactionDto>({
      query: transaction => ({
        url: '/transactions',
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['Transaction'],
    }),
    editTransaction: builder.mutation<string, EditTransactionDto>({
      query: transaction => ({
        url: `/transactions/${transaction.id}`,
        method: 'PUT',
        body: transaction,
      }),
      invalidatesTags: ['Transaction'],
    }),
    deleteTransaction: builder.mutation<void, string>({
      query: id => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transaction'],
    }),
    getMetrics: builder.query<IMetrics, GetTransactionsParams>({
      query: ({ startDate, endDate }: GetTransactionsParams) => ({
        url: `/transactions/metrics?startDate=${startDate}&endDate=${endDate}`,
      }),
      providesTags: ['Transaction'],
    }),
  }),
})

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
  useGetMetricsQuery,
} = TransactionService
