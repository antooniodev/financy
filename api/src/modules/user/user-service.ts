import { CustomError } from '../../shared/errors/custom-error'
import { IMonthlyGoal, IRegisterUser, IUser } from './user-entity'
import { UserRepository } from './user-repository'
import dayjs from 'dayjs'
const repository = new UserRepository()
export class UserService {
  async findById(id: string): Promise<IUser> {
    const user = await repository.getOneById(id)
    if (!user) throw new CustomError(404, 'Usuário não encontrado.')
    return user
  }
  async create(dto: IRegisterUser): Promise<string> {
    const user = await repository.post({ ...dto, monthlyGoal: '0' })
    return user
  }

  async updateMonthlyGoal(id: string, monthlyGoal: number): Promise<void> {
    await repository.updateMonthlyGoal(id, monthlyGoal)
  }

  async getMonthlyGoal(id: string): Promise<IMonthlyGoal> {
    const startDate = dayjs().startOf('month').toString()
    const endDate = dayjs().endOf('month').toString()
    return repository.getMonthlyGoal(id, startDate, endDate)
  }
}
