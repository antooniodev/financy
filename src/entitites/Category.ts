export interface ICategory {
  id: string
  title: string
  color: string
  icon: string
  type: boolean
  percentage: string
  totalValue: number
}

export interface ISummaryResponse {
  id: string
  label: string
  value: number
  color: string
  icon: string
  spent_total: number
}

export interface ICategoryResponse {
  id: string
  title: string
  type: boolean
}

export interface IParseCategory {
  id: string
  title: string
  color: string
}
