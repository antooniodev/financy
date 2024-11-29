import { CustomError } from '../../shared/errors/custom-error'
import { User, UserRequestBody } from './user-entity'
import { UserRepository } from './user-repository'
const repository = new UserRepository()
export class UserService {
  async findById(id: string): Promise<User> {
    const user = await repository.getOneById(id)
    if (!user) throw new CustomError(404, 'Usuário não encontrado.')
    return user
  }
  async create({ name, email }: UserRequestBody): Promise<string> {
    const emailExist = await repository.getOneByEmail(email)
    if (emailExist)
      throw new CustomError(409, 'Já existe uma conta vinculada a esse email.')

    const user = await repository.post({ name, email })
    return user.id
  }
}
