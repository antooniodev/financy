import { HandleError } from '../../shared/errors/handleError'
import { CategoryResponse, CategoryRequestBody } from './category.entity'
import { CategoryRepository } from './category.repository'

const repository = new CategoryRepository()

export class CategoryService {
  async findMany(user_id: string, type: string): Promise<CategoryResponse[]> {
    const categoryList = await repository.getAll(user_id)

    if (categoryList.length === 0)
      throw new HandleError(404, 'Não há categorias para serem exibidas.')
    const totalValueExpensesTransactions = categoryList
      .flatMap(category => {
        if (category.type === false) return category.transactions
        return []
      })
      .reduce(
        (acc, crr) => {
          return { value: (acc ?? { value: 0 }).value + (crr?.value ?? 0) }
        },
        { value: 0 }
      )
    const totalValueIncomesTransactions = categoryList
      .flatMap(category => {
        if (category.type === true) return category.transactions
        return []
      })
      .reduce(
        (acc, crr) => {
          return { value: (acc ?? { value: 0 }).value + (crr?.value ?? 0) }
        },
        { value: 0 }
      )
    const categoriesWithPercent = categoryList
      .filter(category => category.type.toString() === type)
      .map(category => {
        let totalTransactionByCategory = { value: 0 }
        if (category.transactions.length > 0) {
          totalTransactionByCategory = category.transactions.reduce(
            (acc, crr) => {
              return { value: acc.value + crr.value }
            }
          )
        }

        const totalToDivision =
          category.type === true
            ? totalValueIncomesTransactions
            : totalValueExpensesTransactions

        const percentageByCategory =
          totalToDivision.value === 0
            ? 0
            : (totalTransactionByCategory.value * 100) / totalToDivision.value

        const dto: CategoryResponse = {
          id: category.id,
          title: category.title,
          color: category.color,
          icon: category.icon,
          type: category.type,
          totalValue: totalTransactionByCategory.value,
          percentage: Math.round(percentageByCategory).toString(),
        }

        return dto
      })

    return categoriesWithPercent
  }

  async create(dto: CategoryRequestBody): Promise<string> {
    const categoryListByUser = await repository.getAll(dto.user_id)

    const categoryExist = categoryListByUser.find(
      category => category.title.toLowerCase() === dto.title.toLowerCase()
    )
    if (categoryExist)
      throw new HandleError(400, 'Já existe uma categoria com esse nome.')

    const categoryCreated = await repository.postOne(dto)

    return categoryCreated.id
  }

  async update(id: string, dto: CategoryRequestBody): Promise<string> {
    const editCategory = await repository.putOne(id, dto)
    return editCategory.id
  }

  async delete(id: string, user_id: string): Promise<void> {
    const categoryExist = await repository.getOne(id, user_id)
    if (!categoryExist) throw new HandleError(400, 'Essa categoria não existe.')
    if (
      categoryExist?.transactions.length &&
      categoryExist?.transactions.length > 0
    )
      throw new HandleError(400, 'Essa categoria possui transações.')
    await repository.deleteOne(id, user_id)
  }
}
