import { Category, CategoryChart, CategoryRequestBody } from './category-entity'
import { db } from '../../config/db/index'
import { categorySchema, transactionSchema } from '../../config/db/schema'
import { and, eq, sql } from 'drizzle-orm'
export class CategoryRepository {
  public async getCategoriesToChartByType(
    userId: string,
    type: boolean
  ): Promise<CategoryChart[]> {
    const totalValueOfTransactions = await db.execute(
      sql`SELECT COALESCE(SUM(${transactionSchema}.value), 0) as total_value_of_transactions FROM ${transactionSchema} WHERE ${transactionSchema}.user_id = ${userId} AND ${transactionSchema}.type = ${type}`
    )
    const totalValueInCategory = await db.execute(
      sql`
       SELECT 
        ${categorySchema}.id, 
        ${categorySchema}.title AS label, 
        ${categorySchema}.color, 
        ${categorySchema}.icon, 
        COALESCE(SUM(${transactionSchema}.value), 0) AS total_spent,
        COALESCE((SUM(${transactionSchema}.value) / ${totalValueOfTransactions[0].total_value_of_transactions}) * 100, 0) AS value
      FROM 
        ${categorySchema}
      LEFT JOIN 
        ${transactionSchema} 
      ON 
        ${transactionSchema}.category_id = ${categorySchema}.id 
        AND ${transactionSchema}.user_id = ${userId}
      WHERE 
        ${categorySchema}.type = ${type} 
      GROUP BY 
        ${categorySchema}.id, ${categorySchema}.title
      ORDER BY 
        total_spent DESC
      `
    )

    const data: CategoryChart[] = totalValueInCategory.map(category => {
      return {
        id: String(category.id),
        label: String(category.label),
        color: String(category.color),
        icon: String(category.icon),
        value: Number(category.value),
        spent_total: Number(category.total_spent) ?? 0,
      }
    })

    return data
  }

  public async getOne(id: string): Promise<Category> {
    const data = await db
      .select({
        id: categorySchema.id,
        title: categorySchema.title,
        icon: categorySchema.icon,
        color: categorySchema.color,
        type: categorySchema.type,
      })
      .from(categorySchema)
      .where(eq(categorySchema.id, id))
    const category = data[0]
    return category
  }

  public async postOne(dto: CategoryRequestBody): Promise<string> {
    const data = await db
      .insert(categorySchema)
      .values({
        title: dto.title,
        icon: dto.icon,
        color: dto.color,
        type: dto.type,
      })
      .returning({ id: categorySchema.id })
    const categoryId = data[0].id
    return categoryId
  }

  public async putOne(id: string, dto: CategoryRequestBody): Promise<string> {
    const data = await db
      .update(categorySchema)
      .set({
        title: dto.title,
        icon: dto.icon,
        color: dto.color,
      })
      .where(eq(categorySchema.id, id))
      .returning({ id: categorySchema.id })
    const categoryId = data[0].id
    return categoryId
  }

  public async deleteOne(id: string): Promise<void> {
    await db.delete(categorySchema).where(eq(categorySchema.id, id))
  }
}
