import { CustomError } from '../../shared/errors/custom-error'
import { CategoryResponse, CategoryRequestBody } from './category-entity'
import { CategoryRepository } from './category-repository'

const repository = new CategoryRepository()

export class CategoryService {
  async findMany(user_id: string, type: string): Promise<CategoryResponse[]> {
    const categoryList = await repository.getAll(user_id)

    return categoryList
  }

  async create(dto: CategoryRequestBody): Promise<string> {
    const categoryListByUser = await repository.getAll(dto.user_id)

    const categoryExist = categoryListByUser.find(
      category => category.title.toLowerCase() === dto.title.toLowerCase()
    )
    if (categoryExist)
      throw new CustomError(400, 'Já existe uma categoria com esse nome.')

    const categoryCreated = await repository.postOne(dto)

    return categoryCreated.id
  }

  async update(id: string, dto: CategoryRequestBody): Promise<string> {
    const editCategory = await repository.putOne(id, dto)
    return editCategory.id
  }

  async delete(id: string, user_id: string): Promise<void> {
    const categoryExist = await repository.getOne(id, user_id)
    if (!categoryExist) throw new CustomError(400, 'Essa categoria não existe.')
    if (
      categoryExist?.transactions.length &&
      categoryExist?.transactions.length > 0
    )
      throw new CustomError(400, 'Essa categoria possui transações.')
    await repository.deleteOne(id, user_id)
  }
}
