import { ICategoryChart } from '../entitites'
import { api } from './api'
interface GetCategories {
  type: boolean
  startDate: string
  endDate: string
}
const CategoryService = api.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<ICategoryChart[], GetCategories>({
      query: ({ type, startDate, endDate }) =>
        `/categories/?type=${type}&startDate=${startDate}&endDate=${endDate}`,
      providesTags: ['Transaction'],
    }),
  }),
})

export const { useGetCategoriesQuery } = CategoryService
