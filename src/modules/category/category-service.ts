import { CustomError } from '../../shared/errors/custom-error'
import { CategoryResponse, CategoryRequestBody } from './category-entity'
import { CategoryRepository } from './category-repository'

const repository = new CategoryRepository()

export class CategoryService {
  async findMany(userId: string, type: boolean) {
    return await repository.getAllByType(userId, type)
  }

  async findOne(id: string, userId: string) {
    return await repository.getOne(id, userId)
  }

  async create(dto: CategoryRequestBody) {
    return await repository.postOne(dto)
  }

  async update(id: string, userId: string, dto: CategoryRequestBody) {
    const categoryExist = await repository.getOne(id, userId)
    if (!categoryExist) throw new CustomError(400, 'Essa categoria não existe.')
    return await repository.putOne(id, userId, dto)
  }

  async delete(id: string, userId: string) {
    const categoryExist = await repository.getOne(id, userId)
    if (!categoryExist) throw new CustomError(400, 'Essa categoria não existe.')
    await repository.deleteOne(id, userId)
  }
}
