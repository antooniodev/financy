export interface IUserCredentials {
  email: string
  password: string
}

export interface IUser {
  userId: string
  firstName: string
  monthlyGoal: number
}

export interface UserRequestBody {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface UserMonthlyGoalResponse {
  monthlyGoal: number
  totalOfExpenses: number
  percentageOfExpenses: number
}
