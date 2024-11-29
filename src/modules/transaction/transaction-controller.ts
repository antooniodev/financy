import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../shared/errors/custom-error'
import { TransactionService } from './transaction-service'
import transactionValidator from '../../shared/validators/transaction-validator'
import paramsValidator from '../../shared/validators/params-validator'
const service = new TransactionService()
export class TransactionController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, startDate, endDate } =
        await transactionValidator.findManyParams.validate(req.query)

      const transactions = await service.findMany(userId, startDate, endDate)
      res.status(200).json(transactions)
    } catch (error) {
      next(error)
    }
  }

  async listOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, id } = await paramsValidator.index.validate(req.params)
      const transaction = await service.findOne(id, userId)
      res.status(200).json(transaction)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await transactionValidator.body.validate(req.body)
      const transactionId = await service.create(req.body)
      res.status(201).json({ id: transactionId })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, id } = await paramsValidator.index.validate(req.params)
      await service.delete(id, userId)
      res.status(200).json({})
    } catch (error) {
      next(error)
    }
  }
}
