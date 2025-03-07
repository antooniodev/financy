export interface Transaction {
  id: string
  title: string
  date: Date
  value: string
  category: {
    id: string
    title?: string
    color?: string
  }
  type: boolean
  user_id?: string
  created_at?: Date
  updated_at?: Date
}

export interface TransactionWithPagination {
  pagination: {
    next: boolean
    prev: boolean
    total: number
  }
  data: Transaction[]
}

export interface TransactionRequestBody {
  title: string
  date: Date
  value: number
  categoryId: string
  type: boolean
}

export interface TransactionMetrics {
  totalBalances: number
  totalExpenses: number
  totalIncomes: number
}
