import { ICategoryChart } from '../entitites'
import { ICategoryResponse } from '../entitites/Category'
import { api } from './api'
interface GetCategories {
  type: boolean
  startDate: string
  endDate: string
}
const CategoryService = api.injectEndpoints({
  endpoints: builder => ({
    getSummaryOfCategories: builder.query<ICategoryChart[], GetCategories>({
      query: ({ type, startDate, endDate }) =>
        `/categories/summary/?type=${type}&startDate=${startDate}&endDate=${endDate}`,
      providesTags: ['Transaction'],
    }),
    getAllCategoriesByType: builder.query<ICategoryResponse[], boolean>({
      query: type => `/categories/?type=${type}`,
    }),
  }),
})

export const {
  useGetSummaryOfCategoriesQuery,
  useGetAllCategoriesByTypeQuery,
} = CategoryService
