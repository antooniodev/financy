import { Category, CategoryRequestBody } from './category-entity'
import { db } from '../../config/db/index'
import { categorySchema, transcationSchema } from '../../config/db/schema'
import { and, eq } from 'drizzle-orm'
export class CategoryRepository {
  public async getAllByType(
    userId: string,
    type: boolean
  ): Promise<Category[]> {
    const countAllTransaction = db.$count(transcationSchema)
    const data = db
      .select({
        id: categorySchema.id,
        title: categorySchema.title,
        icon: categorySchema.icon,
        color: categorySchema.color,
        type: categorySchema.type,
        transaction: countAllTransaction,
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

  public async postOne(dto: CategoryRequestBody): Promise<string> {
    const data = await db
      .insert(categorySchema)
      .values(dto)
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
      .where(
        and(eq(categorySchema.id, id), eq(categorySchema.userId, dto.userId))
      )
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
