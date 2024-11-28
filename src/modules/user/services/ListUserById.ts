import { HandleError } from "../../../shared/errors/handleError"
import  { User } from "../user.entity"
import  { ListUserByIdModel } from "../user.model"
import { UserRepository } from "../user.repository"
const repository = new UserRepository()
export class ListUserById implements ListUserByIdModel {
  async findById(id: string): Promise<User> {
    const user = await repository.getOneById(id)
    if (!user) throw new HandleError(404, "Usuário não encontrado.")
    return user
  }
}
