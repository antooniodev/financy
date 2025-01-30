import { and, desc, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../../config/db'
import {
  categorySchema,
  transactionSchema,
  userSchema,
} from '../../config/db/schema'
import {
  Transaction,
  TransactionMetrics,
  TransactionRequestBody,
  TransactionWithPagination,
} from './transaction-entity'
import { number, string } from 'yup'
import { CustomError } from '../../shared/errors/custom-error'

export class TransactionRepository {
  async getAllInPeriod(
    userId: string,
    startDate: string,
    endDate: string,
    page: number,
    limit: number
  ): Promise<TransactionWithPagination> {
    const data: Transaction[] = await db
      .select({
        id: transactionSchema.id,
        title: transactionSchema.title,
        value: transactionSchema.value,
        type: transactionSchema.type,
        date: transactionSchema.date,
        category: {
          id: categorySchema.id,
          title: categorySchema.title,
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
          gte(transactionSchema.date, new Date(startDate)),
          lte(transactionSchema.date, new Date(endDate))
        )
      )
      .orderBy(desc(transactionSchema.date))
      .limit(limit)
      .offset((page - 1) * limit)

    const totalOfTransactons: number = await db
      .select({ count: sql`COUNT(${transactionSchema.id})` })
      .from(transactionSchema)
      .where(
        and(
          eq(transactionSchema.userId, userId),
          gte(transactionSchema.date, new Date(startDate)),
          lte(transactionSchema.date, new Date(endDate))
        )
      )
      .then(result => Number(result[0].count))

    const quantityOfPages = Math.ceil(totalOfTransactons / limit)
    const pagination = {
      next: page < quantityOfPages,
      prev: page > 1,
      total: quantityOfPages,
    }
    return {
      pagination,
      data,
    }
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

  async postOne(userId: string, dto: TransactionRequestBody): Promise<string> {
    const categoryExists = await db
      .select({ id: categorySchema.id })
      .from(categorySchema)
      .where(eq(categorySchema.id, dto.categoryId))
      .limit(1)

    if (categoryExists.length === 0) {
      throw new CustomError(404, 'Essa categoria não existe')
    }

    const userExists = await db
      .select({ id: userSchema.id })
      .from(userSchema)
      .where(eq(userSchema.id, userId))
      .limit(1)

    if (userExists.length === 0) {
      throw new CustomError(404, 'Esse usuário não existe')
    }

    console.log('aqui')

    const data = await db
      .insert(transactionSchema)
      .values({
        title: dto.title,
        value: dto.value.toString(),
        type: dto.type,
        date: new Date(dto.date),
        categoryId: dto.categoryId,
        userId,
      })
      .returning({ id: transactionSchema.id })

    const transactionId = data[0].id
    return transactionId
  }

  async putOne(
    id: string,
    userId: string,
    dto: TransactionRequestBody
  ): Promise<string> {
    const data = await db
      .update(transactionSchema)
      .set({
        title: dto.title,
        value: dto.value.toString(),
        date: new Date(dto.date),
        type: dto.type,
        categoryId: dto.categoryId,
      })
      .where(
        and(eq(transactionSchema.id, id), eq(transactionSchema.userId, userId))
      )
      .returning({ id: transactionSchema.id })
    const transactionId = data[0].id
    return transactionId
  }

  async deleteOne(id: string, userId: string): Promise<void> {
    await db
      .delete(transactionSchema)
      .where(
        and(eq(transactionSchema.id, id), eq(transactionSchema.userId, userId))
      )
  }

  async selectMetrics(userId: string, startDate: string, endDate: string) {
    const exepense =
      sql`SELECT COALESCE(SUM(${transactionSchema.value}), 0) as expenses 
      FROM ${transactionSchema} 
      WHERE ${and(eq(transactionSchema.userId, userId), eq(transactionSchema.type, false))} 
      AND ${transactionSchema.date} BETWEEN ${startDate} AND ${endDate}`.mapWith(
        number
      )
    const incomes =
      sql`SELECT COALESCE(SUM(${transactionSchema.value}), 0) as incomes 
      FROM ${transactionSchema} 
      WHERE ${and(eq(transactionSchema.userId, userId), eq(transactionSchema.type, true))} 
      AND ${transactionSchema.date} BETWEEN ${startDate} AND ${endDate}`.mapWith(
        number
      )
    const [expenseResult] = await db.execute(exepense)
    const [incomeResult] = await db.execute(incomes)
    return { ...expenseResult, ...incomeResult }
  }
}
