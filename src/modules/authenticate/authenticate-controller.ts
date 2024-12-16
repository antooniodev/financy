import { NextFunction, Request, Response } from 'express'
import { AuthenticateService } from './authenticate-service'
import authenticateValidator from './authenticate-validator'
const service = new AuthenticateService()
export class AuthenticateController {
  async createSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = await authenticateValidator.body.validate(
        req.body
      )
      const userAuthenticated = await service.createSession(email, password)
      res.status(200).json(userAuthenticated)
    } catch (error) {
      next(error)
    }
  }
}
