import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../shared/errors/custom-error'
import { UserService } from './user-service'
import userValidator from './user-validator'

const service = new UserService()

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await userValidator.body.validate(req.body)
      const userId = await service.create(req.body)
      res.status(201).json({ id: userId })
    } catch (error) {
      next(error)
    }
  }

  async listById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const user = await service.findById(id)
      res.status(200).json({ user })
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
