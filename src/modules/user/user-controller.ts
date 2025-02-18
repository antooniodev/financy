import { NextFunction, Request, Response } from 'express'
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

  async updateMonthlyGoal(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, monthlyGoal } =
        await userValidator.updateMonthlyGoal.validate({
          userId: req.headers.userId,
          monthlyGoal: req.body.monthlyGoal,
        })
      await service.updateMonthlyGoal(userId, monthlyGoal)
      res.status(204).json({})
    } catch (error) {
      next(error)
    }
  }

  async getMonthlyGoal(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = await userValidator.getMonthlyGoal.validate({
        userId: req.headers.userId,
      })
      const monthlyGoal = await service.getMonthlyGoal(userId)
      res.status(200).json(monthlyGoal)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
