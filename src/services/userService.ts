import { ISessionResponse } from '../entitites'
import { IUserCredentials, UserRequestBody } from '../entitites/User'
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
    registerUserGoal: builder.mutation<void, { goal: number }>({
      query: body => ({
        url: '/user/goal',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateUserMutation, useRegisterUserGoalMutation } =
  UserService
