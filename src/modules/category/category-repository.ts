import { Category, CategoryChart, CategoryRequestBody } from './category-entity'
import { db } from '../../config/db/index'
import { categorySchema, transactionSchema } from '../../config/db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { double, real } from 'drizzle-orm/mysql-core'
export class CategoryRepository {
  public async getCategoriesToChartByType(
    userId: string,
    type: boolean
  ): Promise<CategoryChart[]> {
    const totalTransactions = await db.$count(transactionSchema)

    let transactionPercentage = sql`0`.mapWith(Number)

    if ((totalTransactions as number) > 0) {
      transactionPercentage = sql`
      (((SELECT COUNT(*) FROM ${transactionSchema} WHERE ${transactionSchema}.category_id = ${categorySchema}.id) * 100) / ${totalTransactions})
      `.mapWith(Number)
    }

    const totalSpent = sql`
    COALESCE((SELECT SUM(${transactionSchema}.value) FROM ${transactionSchema} WHERE ${transactionSchema}.category_id = ${categorySchema}.id), 0)`.mapWith(
      Number
    )

    const data = db
      .select({
        id: categorySchema.id,
        label: categorySchema.title,
        icon: categorySchema.icon,
        color: categorySchema.color,
        value: transactionPercentage,
        spent: totalSpent,
      })
      .from(categorySchema)
      .where(
        and(eq(categorySchema.userId, userId), eq(categorySchema.type, type))
      )
    return data
  }

  public async getOne(id: string, userId: string): Promise<Category> {
    const data = await db
      .select({
        id: categorySchema.id,
        title: categorySchema.title,
        icon: categorySchema.icon,
        color: categorySchema.color,
        type: categorySchema.type,
      })
      .from(categorySchema)
      .where(and(eq(categorySchema.id, id), eq(categorySchema.userId, userId)))
    const category = data[0]
    return category
  }

  public async postOne(
    userId: string,
    dto: CategoryRequestBody
  ): Promise<string> {
    const data = await db
      .insert(categorySchema)
      .values({
        userId: userId,
        title: dto.title,
        icon: dto.icon,
        color: dto.color,
        type: dto.type,
      })
      .returning({ id: categorySchema.id })
    const categoryId = data[0].id
    return categoryId
  }

  public async putOne(
    id: string,
    userId: string,
    dto: CategoryRequestBody
  ): Promise<string> {
    const data = await db
      .update(categorySchema)
      .set({
        title: dto.title,
        icon: dto.icon,
        color: dto.color,
      })
      .where(and(eq(categorySchema.id, id), eq(categorySchema.userId, userId)))
      .returning({ id: categorySchema.id })
    const categoryId = data[0].id
    return categoryId
  }

  public async deleteOne(id: string, userId: string): Promise<void> {
    await db
      .delete(categorySchema)
      .where(and(eq(categorySchema.id, id), eq(categorySchema.userId, userId)))
  }
}
