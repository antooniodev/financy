import { UserRequestBody, User } from "./user";
import { CreateUserModel } from "../../models/UserModel";
import { UserRepository } from "../../repositories/UserRepository";
import { HandleError } from "../../shared/errors/handleError";
const repository = new UserRepository()
export class CreateUserService implements CreateUserModel {
    async create({ name, email }: UserRequestBody): Promise<string> {
        const emailExist = await repository.getOneByEmail(email)
        if (emailExist)
          throw new HandleError(409, "Já existe uma conta vinculada a esse email.")
    
        const user = await repository.post({name, email})
        return user.id
      }
}