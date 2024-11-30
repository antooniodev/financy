import { CustomError } from '../../shared/errors/custom-error'
import { Transaction, TransactionRequestBody } from './transaction-entity'
import { TransactionRepository } from './transaction-repository'

const repository = new TransactionRepository()

export class TransactionService {
  async findOne(id: string, userId: string) {
    return await repository.getOneById(id, userId)
  }
  async findMany(user_id: string, startDate: Date, endDate: Date) {
    return await repository.getAllInPeriod(user_id, startDate, endDate)
  }

  async create(dto: TransactionRequestBody) {
    return await repository.postOne(dto)
  }

  async update(id: string, dto: TransactionRequestBody) {
    return await repository.putOne(id, dto)
  }

  async delete(id: string, user_id: string) {
    await repository.deleteOne(id, user_id)
  }
}
