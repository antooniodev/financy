import { CustomError } from '../../shared/errors/custom-error'
import { Transaction, TransactionRequestBody } from './transaction-entity'
import { TransactionRepository } from './transaction-repository'

const repository = new TransactionRepository()

export class TransactionService {
  async findOne(id: string, userId: string) {
    return await repository.getOneById(id, userId)
  }
  async findMany(
    user_id: string,
    startDate: string,
    endDate: string,
    page: number,
    limit: number
  ) {
    return await repository.getAllInPeriod(
      user_id,
      startDate,
      endDate,
      page,
      limit
    )
  }

  async create(userId: string, dto: TransactionRequestBody) {
    return await repository.postOne(userId, { ...dto, value: dto.value / 100 })
  }

  async update(id: string, userId: string, dto: TransactionRequestBody) {
    return await repository.putOne(id, userId, {
      ...dto,
      value: dto.value / 100,
    })
  }

  async delete(id: string, user_id: string) {
    await repository.deleteOne(id, user_id)
  }

  async getMetrics(userId: string, startDate: string, endDate: string) {
    const response = await repository.selectMetrics(userId, startDate, endDate)
    const incomeInCents = Math.round(Number(response.incomes) * 100)
    const expensesInCents = Math.round(Number(response.expenses) * 100)
    const balance = incomeInCents - expensesInCents

    return {
      incomes: incomeInCents / 100,
      expenses: expensesInCents / 100,
      balance: balance / 100,
    }
  }
}
