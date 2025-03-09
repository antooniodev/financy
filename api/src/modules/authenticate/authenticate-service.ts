import { CustomError } from '../../shared/errors/custom-error'
import { UserAuthenticatedBody } from './authenticate-entity'
import { AuthenticateRepository } from './authenticate-repostitory'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
const repository = new AuthenticateRepository()
export class AuthenticateService {
  async createSession(
    email: string,
    password: string
  ): Promise<UserAuthenticatedBody> {
    const user = await repository.getUserByEmail({ email, password })
      
    if (!user || Object.keys(user).length === 0) {
      throw new CustomError(404, 'Email ou senha incorretos.')
    }
    const token = jwt.sign(
      { userId: user.userId, firstName: user.firstName },
      process.env.SECRET_KEY!,
      { algorithm: 'HS256', expiresIn: '1d' }
    )
    return {
      user: {
        userId: user.userId,
        firstName: user.firstName,
        monthlyGoal: user.monthlyGoal ?? 0,
      },
      token,
    }
  }
}
