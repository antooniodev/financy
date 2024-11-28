
import { HandleError } from "../../../shared/errors/handleError";
import { DeleteCategoryModel } from "../category.model";
import { CategoryRepository } from "../category.repository";
const repository = new CategoryRepository()
export class DeleteCategoryService implements DeleteCategoryModel {
    async delete(id: string, user_id: string): Promise<void> {
        const categoryExist = await repository.getOne(id, user_id)
      if (!categoryExist) throw new HandleError(400, "Essa categoria não existe.")
        if (
          categoryExist?.transactions.length &&
          categoryExist?.transactions.length > 0
        )
          throw new HandleError(400, "Essa categoria possui transações.")
        await repository.deleteOne(id, user_id)
      }
}