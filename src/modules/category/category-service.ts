import { CustomError } from '../../shared/errors/custom-error'
import { CategoryRequestBody } from './category-entity'
import { CategoryRepository } from './category-repository'

const repository = new CategoryRepository()

export class CategoryService {
  async findMany(userId: string, type: boolean) {
    return await repository.getCategoriesToChartByType(userId, type)
  }

  async findOne(id: string) {
    return await repository.getOne(id)
  }

  async create(dto: CategoryRequestBody) {
    return await repository.postOne(dto)
  }

  async update(id: string, dto: CategoryRequestBody) {
    const categoryExist = await repository.getOne(id)
    if (!categoryExist) throw new CustomError(400, 'Essa categoria não existe.')
    return await repository.putOne(id, dto)
  }

  async delete(id: string) {
    const categoryExist = await repository.getOne(id)
    if (!categoryExist) throw new CustomError(400, 'Essa categoria não existe.')
    await repository.deleteOne(id)
  }
}
