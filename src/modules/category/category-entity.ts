export type Category = {
  id: string
  title: string
  color: string
  icon: string
  transactionPercentage?: number
  type: boolean
}

export type CategoryResponse = {
  id: string
  title: string
  color: string
  icon: string
  type: boolean
  totalValue: number
  percentage: string
}

export type CategoryRequestBody = {
  title: string
  color: string
  icon: string
  type: boolean
  userId: string
}
