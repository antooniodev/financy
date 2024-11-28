
import { HandleError } from "../../../shared/errors/handleError"
import { CategoryRequestBody } from "../category.entity"
import { CreateCategoryModel } from "../category.model"
import { CategoryRepository } from "../category.repository"
const repository = new CategoryRepository()
export class CreateCategoryService implements CreateCategoryModel {
  async create(dto: CategoryRequestBody): Promise<string> {
    const categoryListByUser = await repository.getAll(dto.user_id)

    const categoryExist = categoryListByUser.find(
      (category) => category.title.toLowerCase() === dto.title.toLowerCase()
    )
    if (categoryExist)
      throw new HandleError(400, "Já existe uma categoria com esse nome.")

    const categoryCreated = await repository.postOne(dto)

    return categoryCreated.id
  }
}
