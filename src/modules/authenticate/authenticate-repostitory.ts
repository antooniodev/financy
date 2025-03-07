import { and, eq } from 'drizzle-orm'
import { db } from '../../config/db'
import { userSchema } from '../../config/db/schema'
import { UserCredentials, UserResponseBody } from './authenticate-entity'

export class AuthenticateRepository {
  async getUserByEmail({
    email,
    password,
  }: UserCredentials): Promise<UserResponseBody> {
    const data = await db
      .select({
        userId: userSchema.id,
        firstName: userSchema.firstName,
        monthlyGoal: userSchema.monthlyGoal,
      })
      .from(userSchema)
      .where(
        and(eq(userSchema.email, email), eq(userSchema.password, password))
      )
      .catch(error => {
        console.log(error)
        return []
      })

    const user = data[0]
    return {
      ...user,
      monthlyGoal: Number(user.monthlyGoal),
    }
  }
}
