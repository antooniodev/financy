import { CustomError } from '../../shared/errors/custom-error'
import { IRegisterUser, IUser } from './user-entity'
import { UserRepository } from './user-repository'
const repository = new UserRepository()
export class UserService {
  async findById(id: string): Promise<IUser> {
    const user = await repository.getOneById(id)
    if (!user) throw new CustomError(404, 'Usuário não encontrado.')
    return user
  }
  async create(dto: IRegisterUser): Promise<string> {
    const user = await repository.post(dto)
    return user
  }
}
