import { eq } from 'drizzle-orm'
import { db } from '../../config/db'
import { categorySchema, transactionSchema } from '../../config/db/schema'
import { Transaction, TransactionRequestBody } from './transaction-entity'

export class TransactionRepository {
  async getAll(
    user_id: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    // const data = await db.s
  }

  async getOneById(id: string, user_id: string): Promise<Transaction | null> {
    const data = await prisma.transaction.findUnique({
      where: {
        id,
        user_id,
      },
      select: {
        id: true,
        title: true,
        date: true,
        type: true,
        value: true,
        category: {
          select: {
            id: true,
            color: true,
          },
        },
      },
    })

    return data
  }

  async postOne(dto: TransactionRequestBody): Promise<any> {
    const data = await db
      .insert(transactionSchema)
      .values({
        title: dto.title,
        value: dto.value,
        type: dto.type,
        date: new Date(),
        categoryId: dto.categoryId,
        userId: dto.userId,
      })
      .returning()
      .then(async result => {
        const category = await db
          .select({
            id: categorySchema.id,
            color: categorySchema.color,
          })
          .from(categorySchema)
          .where(eq(categorySchema.id, dto.categoryId))
          .limit(1)

        return {
          ...result,
          category: {
            id: category[0].id,
            color: category[0].color,
          },
        }
      })
  }

  async deleteOne(id: string, user_id: string): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id,
        user_id,
      },
    })
  }
}
