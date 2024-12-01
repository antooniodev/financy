import { eq } from 'drizzle-orm'
import { db } from '../../config/db'
import { userSchema } from '../../config/db/schema'
import { IUser, IRegisterUser } from './user-entity'

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
}
