import { HandleError } from '../../shared/errors/handleError'
import { User, UserRequestBody } from './user.entity'
import { UserRepository } from './user.repository'
const repository = new UserRepository()
export class UserService {
  async findById(id: string): Promise<User> {
    const user = await repository.getOneById(id)
    if (!user) throw new HandleError(404, 'Usuário não encontrado.')
    return user
  }
  async create({ name, email }: UserRequestBody): Promise<string> {
    const emailExist = await repository.getOneByEmail(email)
    if (emailExist)
      throw new HandleError(409, 'Já existe uma conta vinculada a esse email.')

    const user = await repository.post({ name, email })
    return user.id
  }
}
