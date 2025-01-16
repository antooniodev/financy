import { Category, CategoryChart, CategoryRequestBody } from './category-entity'
import { db } from '../../config/db/index'
import { categorySchema, transactionSchema } from '../../config/db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { double, real } from 'drizzle-orm/mysql-core'
import { number } from 'yup'
export class CategoryRepository {
  public async getCategoriesToChartByType(
    userId: string,
    type: boolean
  ): Promise<CategoryChart[]> {
    const totalValueOfTransactions = await db.execute(
      sql`SELECT SUM(${transactionSchema}.value) as total_value_of_transactions FROM ${transactionSchema}`
    )

    const totalValueInCategory = await db.execute(
      sql`
      SELECT ${categorySchema}.id, 
      ${categorySchema}.title as label, 
      ${categorySchema}.color, 
      ${categorySchema}.icon, 
      COALESCE(SUM(${transactionSchema}.value), 0) as spent_total,
      COALESCE(SUM(${transactionSchema}.value) * 100 / ${totalValueOfTransactions[0].total_value_of_transactions}, 0) as value
      FROM ${transactionSchema}
      RIGHT JOIN ${categorySchema} ON ${transactionSchema}.category_id = ${categorySchema}.id
      WHERE ${categorySchema}.user_id = ${userId} AND ${categorySchema}.type = ${type}
      GROUP BY ${categorySchema}.id, ${categorySchema}.title
      ORDER BY spent_total DESC
      `
    )
    console.log(totalValueInCategory)

    const data: CategoryChart[] = totalValueInCategory.map(category => {
      return {
        id: String(category.id),
        label: String(category.label),
        color: String(category.color),
        icon: String(category.icon),
        value: Number(category.value),
        spent_total: Number(category.spent_total),
      }
    })

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
