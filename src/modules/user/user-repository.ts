import { eq } from 'drizzle-orm'
import { db } from '../../config/db'
import { userSchema } from '../../config/db/schema'
import { UserRequestBody, User, IRegisterUser } from './user-entity'

export class UserRepository {
  async post(dto: IRegisterUser): Promise<string> {
    const data = await db
      .insert(userSchema)
      .values(dto)
      .returning({ id: userSchema.id })
    return data[0].id
  }

  async getOneByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!data) return null
    return data
  }

  async getOneById(id: string): Promise<any> {
    const data = await db
      .select({
        id: userSchema.id,
        firstName: userSchema.firstName,
        lastName: userSchema.lastName,
        email: userSchema.email,
      })
      .from(userSchema)
      .where(eq(userSchema.id, id))
    return data
  }
}
