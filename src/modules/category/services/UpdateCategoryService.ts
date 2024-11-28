import { CategoryRequestBody } from "../category.entity"
import { UpdateCategoryModel } from "../category.model"
import { CategoryRepository } from "../category.repository"


const repository = new CategoryRepository()
export class UpdateCategoryService implements UpdateCategoryModel {
  async update(id: string, dto: CategoryRequestBody): Promise<string> {
    const editCategory = await repository.putOne(id, dto)
    return editCategory.id
  }
}
