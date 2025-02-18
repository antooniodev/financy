import { CategoryRepository } from './category-repository'

const repository = new CategoryRepository()

export class CategoryService {
  async getSummaryOfCategoriesByPeriod(
    userId: string,
    type: boolean,
    starrtDate: string,
    endDate: string
  ) {
    return await repository.getCategoriesByPeriodAndType(
      userId,
      type,
      starrtDate,
      endDate
    )
  }

  async findAllCategoriesByType(type: boolean) {
    return await repository.getAllCategoriesByType(type)
  }
}
