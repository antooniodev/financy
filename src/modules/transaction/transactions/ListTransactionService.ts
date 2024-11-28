import { Transaction } from "../transaction"
import { ListTransactionModel } from "../TransactionModel"
import { TransactionRepository } from "../../repositories/TransactionRepository"
import { HandleError } from "../../../shared/errors/handleError"
const repository = new TransactionRepository()
export class ListTransactionService implements ListTransactionModel {
  async findOne(id: string, user_id: string): Promise<Transaction> {
    const transaction = await repository.getOneById(id, user_id)
    if (!transaction) throw new HandleError(404, "Essa transação não existe.")

    return transaction
  }
}
