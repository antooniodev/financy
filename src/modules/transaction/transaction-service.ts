import { CustomError } from '../../shared/errors/custom-error'
import { Transaction, TransactionRequestBody } from './transaction-entity'
import { TransactionRepository } from './transaction-repository'

const repository = new TransactionRepository()

export class TransactionService {
  async findOne(id: string, user_id: string): Promise<Transaction> {
    const transaction = await repository.getOneById(id, user_id)
    if (!transaction) throw new CustomError(404, 'Essa transação não existe.')

    return transaction
  }
  async findMany(user_id: string, startDate: Date, endDate: Date) {
    // const newStart = new Date( Date.now())
    // const newEnd = new Date( Date.now())
    // newEnd.setMonth(newStart.getMonth() - 7)
    // console.log(newStart, newEnd);

    const transactions = await repository.getAll(user_id, startDate, endDate)

    return transactions
  }

  async create(dto: TransactionRequestBody): Promise<string> {
    const transactionCreated = await repository.postOne(dto)
    return transactionCreated.id
  }

  async delete(id: string, user_id: string): Promise<void> {
    await repository.deleteOne(id, user_id)
  }
}
