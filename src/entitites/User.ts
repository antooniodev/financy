export interface IUserCredentials {
  email: string
  password: string
}

export interface IUser {
  userId: string
  firstName: string
  goal: number | null
}

export interface UserRequestBody {
  firstName: string
  lastName: string
  email: string
  password: string
}
