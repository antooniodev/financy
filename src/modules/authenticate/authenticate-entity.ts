export type UserCredentials = {
  email: string
  password: string
}

export type UserResponseBody = {
  userId: string
  firstName: string
  monthlyGoal: string
}

export type UserAuthenticatedBody = {
  user: UserResponseBody
  token: string
}
