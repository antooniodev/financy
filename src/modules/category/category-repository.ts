import { Category, CategoryRequestBody } from './category-entity'
import { db } from '../../config/db/index'
import { categorySchema } from '../../config/db/schema'
import { eq } from 'drizzle-orm'
export class CategoryRepository {
  public async getAll(userId: string): Promise<any[]> {
    // const data = await prisma.category.findMany({
    //   where: {
    //     user_id,
    //   },
    //   include: {
    //     transactions: {
    //       select: { value: true },
    //     },
    //   },
    // })
    // return data
    const data = db
      .select({
        id: categorySchema.id,
        title: categorySchema.title,
        icon: categorySchema.icon,
        color: categorySchema.color,
        type: categorySchema.type,
      })
      .from(categorySchema)
      .where(eq(categorySchema.userId, userId))
    return data
  }

  // public async getOne(id: string, user_id: string): Promise<Category | null> {
  //   const data = await prisma.category.findUnique({
  //     where: {
  //       id,
  //       user_id,
  //     },
  //     include: {
  //       transactions: true,
  //     },
  //   })
  //   if (!data) return null
  //   return data
  // }

  // public async postOne(dto: CategoryRequestBody): Promise<Category> {
  //   const data = await prisma.category.create({
  //     data: dto,
  //     include: {
  //       transactions: true,
  //     },
  //   })
  //   return data
  // }

  // public async putOne(id: string, dto: CategoryRequestBody): Promise<Category> {
  //   const data = await prisma.category.update({
  //     where: {
  //       id,
  //       user_id: dto.user_id,
  //     },
  //     data: {
  //       title: dto.title,
  //       icon: dto.icon,
  //       color: dto.color,
  //       type: dto.type,
  //     },
  //     include: {
  //       transactions: true,
  //     },
  //   })
  //   return data
  // }

  // public async deleteOne(id: string, user_id: string): Promise<void> {
  //   await prisma.category.delete({
  //     where: {
  //       id,
  //       user_id,
  //     },
  //   })
  // }
}
