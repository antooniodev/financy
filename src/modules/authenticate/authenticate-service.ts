import { CustomError } from '../../shared/errors/custom-error'
import handleError from '../../shared/middlewares/handle-error'
import { UserAuthenticatedBody } from './authenticate-entity'
import { AuthenticateRepository } from './authenticate-repostitory'
import jwt from 'jsonwebtoken'
const repository = new AuthenticateRepository()
const privateKey = process.env.SECRET_KEY! as string
export class AuthenticateService {
  async createSession(
    email: string,
    password: string
  ): Promise<UserAuthenticatedBody> {
    const user = await repository.getUserByEmail({ email, password })
    if (!user) {
      throw new CustomError(404, 'Email ou senha incorretos.')
    }
    const token = jwt.sign(
      { userId: user.userId, firstName: user.firstName },
      privateKey,
      { algorithm: 'HS256', expiresIn: '1d' }
    )
    return {
      user: {
        userId: user.userId,
        firstName: user.firstName,
      },
      token,
    }
  }
}
