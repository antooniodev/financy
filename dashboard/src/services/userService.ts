import { UserMonthlyGoalResponse, UserRequestBody } from '../entitites/User'
import { api } from './api'

const UserService = api.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation<void, UserRequestBody>({
      query: body => ({
        url: '/user',
        method: 'POST',
        body,
      }),
    }),
    registerUserGoal: builder.mutation<void, { monthlyGoal: number }>({
      query: body => ({
        url: '/user/monthly-goal',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Goal'],
    }),
    getMonthlyGoal: builder.query<UserMonthlyGoalResponse, void>({
      query: () => '/user/monthly-goal',
      providesTags: ['Goal'],
    }),
  }),
})

export const {
  useCreateUserMutation,
  useRegisterUserGoalMutation,
  useGetMonthlyGoalQuery,
} = UserService
