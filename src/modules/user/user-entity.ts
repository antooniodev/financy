export type User = {
  id: string
  name: string
  email: string
}

export type UserRequestBody = {
  name: string
  email: string
}

export type IRegisterUser = {
  firstName: string
  lastName: string
  email: string
  password: string
}
