import { TransactionRequestBody } from "../transaction.entity"
import { TransactionRepository } from "../transaction.repository"
import { CreateTransactionModel } from "../TransactionModel"
const repository = new TransactionRepository()

export class CreateTransactionService implements CreateTransactionModel {
  async create(dto: TransactionRequestBody): Promise<string> {
    const transactionCreated = await repository.postOne(dto)
    return transactionCreated.id
  }
}
