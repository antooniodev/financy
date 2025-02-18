import { eq, sql, sum } from 'drizzle-orm'
import { db } from '../../config/db'
import { transactionSchema, userSchema } from '../../config/db/schema'
import { IUser, IRegisterUser, IMonthlyGoal } from './user-entity'

export class UserRepository {
  async post(dto: IRegisterUser): Promise<string> {
    const data = await db
      .insert(userSchema)
      .values(dto)
      .returning({ id: userSchema.id })
    return data[0].id
  }

  async getOneByEmail(email: string): Promise<IUser> {
    const data = await db
      .select({
        id: userSchema.id,
        firstName: userSchema.firstName,
        lastName: userSchema.lastName,
        email: userSchema.email,
      })
      .from(userSchema)
      .where(eq(userSchema.email, email))
    return data[0]
  }

  async getOneById(id: string): Promise<IUser> {
    const data = await db
      .select({
        id: userSchema.id,
        firstName: userSchema.firstName,
        lastName: userSchema.lastName,
        email: userSchema.email,
      })
      .from(userSchema)
      .where(eq(userSchema.id, id))
      .limit(1)
    return data[0]
  }

  async getMonthlyGoal(
    id: string,
    startDate: string,
    endDate: string
  ): Promise<IMonthlyGoal> {
    const monthlyGoalData = await db
      .select({ monthlyGoal: userSchema.monthlyGoal })
      .from(userSchema)
      .where(eq(userSchema.id, id))
    const monthlyGoal: number = Number(monthlyGoalData[0].monthlyGoal)
    const expenses = await db.execute(
      sql`
        SELECT SUM(${transactionSchema.value}) as total
        FROM ${transactionSchema}
        WHERE ${transactionSchema.userId} = ${id}
        AND ${transactionSchema.type} = false
        AND ${transactionSchema.date} BETWEEN ${startDate} AND ${endDate}
      `
    )
    const totalOfExpenses: number = Number(expenses[0].total)
    const percentageOfExpenses = (totalOfExpenses / monthlyGoal) * 100

    return {
      monthlyGoal,
      totalOfExpenses,
      percentageOfExpenses: percentageOfExpenses > 0 ? percentageOfExpenses : 0,
    }
  }

  async updateMonthlyGoal(id: string, monthlyGoal: number): Promise<void> {
    await db
      .update(userSchema)
      .set({ monthlyGoal: monthlyGoal.toString() })
      .where(eq(userSchema.id, id))
  }
}
