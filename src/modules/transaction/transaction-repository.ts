import { and, eq, gte, lte } from 'drizzle-orm'
import { db } from '../../config/db'
import { categorySchema, transactionSchema } from '../../config/db/schema'
import { Transaction, TransactionRequestBody } from './transaction-entity'
import { string } from 'yup'

export class TransactionRepository {
  async getAllInPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    console.log(userId)

    const data = db
      .select({
        id: transactionSchema.id,
        title: transactionSchema.title,
        value: transactionSchema.value,
        type: transactionSchema.type,
        date: transactionSchema.date,
        category: {
          id: categorySchema.id,
          color: categorySchema.color,
        },
      })
      .from(transactionSchema)
      .innerJoin(
        categorySchema,
        eq(transactionSchema.categoryId, categorySchema.id)
      )
      .where(
        and(
          eq(transactionSchema.userId, userId),
          gte(transactionSchema.date, startDate),
          lte(transactionSchema.date, endDate)
        )
      )
    return data
  }

  async getOneById(id: string, userId: string): Promise<Transaction> {
    const data = await db
      .select({
        id: transactionSchema.id,
        title: transactionSchema.title,
        value: transactionSchema.value,

        type: transactionSchema.type,
        date: transactionSchema.date,
        category: {
          id: transactionSchema.categoryId,
        },
      })
      .from(transactionSchema)
      .where(
        and(eq(transactionSchema.id, id), eq(transactionSchema.userId, userId))
      )

    const transaction = data[0]
    return transaction
  }

  async postOne(dto: TransactionRequestBody): Promise<Transaction> {
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

    const transaction = data[0]

    return {
      id: transaction.id,
      title: transaction.title,
      value: transaction.value,
      type: transaction.type,
      date: transaction.date,
      category: {
        id: transaction.categoryId,
      },
    }
  }

  async putOne(
    id: string,
    userId: string,
    dto: TransactionRequestBody
  ): Promise<Transaction> {
    const data = await db
      .update(transactionSchema)
      .set({
        title: dto.title,
        value: dto.value,
        date: new Date(dto.date),
        type: dto.type,
        categoryId: dto.categoryId,
      })
      .where(
        and(eq(transactionSchema.id, id), eq(transactionSchema.userId, userId))
      )
      .returning()
    const transaction = data[0]
    return {
      id: transaction.id,
      title: transaction.title,
      value: transaction.value,
      type: transaction.type,
      date: transaction.date,
      category: {
        id: transaction.categoryId,
      },
    }
  }

  async deleteOne(id: string, userId: string): Promise<void> {
    await db
      .delete(transactionSchema)
      .where(
        and(eq(transactionSchema.id, id), eq(transactionSchema.userId, userId))
      )
  }
}
