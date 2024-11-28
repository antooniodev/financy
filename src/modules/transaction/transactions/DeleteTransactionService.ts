import { TransactionRepository } from "../transaction.repository"
import { DeleteTransactionModel } from "../TransactionModel"

const repository = new TransactionRepository()
export class DeleteTransactionService implements DeleteTransactionModel {
  async delete(id: string, user_id: string): Promise<void> {
    await repository.deleteOne(id, user_id)
  }
}
