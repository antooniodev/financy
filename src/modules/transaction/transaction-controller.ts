import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../shared/errors/custom-error'
import { TransactionService } from './transaction-service'
import validator from './transaction-validator'
const service = new TransactionService()
export class TransactionController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, startDate, endDate, page, limit, orderBy } =
        await validator.findMany.validate({
          userId: req.headers.userId,
          startDate: req.query.startDate,
          endDate: req.query.endDate,
          page: req.query.page,
          limit: req.query.limit,
          orderBy: req.query.orderBy,
        })

      const transactions = await service.findMany(
        userId,
        startDate,
        endDate,
        page,
        limit,
        orderBy
      )
      res.status(200).json(transactions)
    } catch (error) {
      next(error)
    }
  }

  async listOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, id } = await validator.findOne.validate({
        userId: req.headers.userId,
        id: req.params.id,
      })
      const transaction = await service.findOne(id, userId)
      res.status(200).json(transaction)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = await validator.create.validate({
        title: req.body.title,
        value: req.body.value,
        type: req.body.type,
        date: req.body.date,
        categoryId: req.body.categoryId,
        userId: req.headers.userId,
      })

      const transaction = await service.create(userId, req.body)
      res.status(201).json({ id: transaction })
    } catch (error) {
      next(error)
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, id } = await validator.edit.validate({
        title: req.body.title,
        value: req.body.value,
        type: req.body.type,
        date: req.body.date,
        categoryId: req.body.categoryId,
        userId: req.headers.userId,
        id: req.params.id,
      })
      const transaction = await service.update(id, userId, req.body)
      res.status(201).json({ id: transaction })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, id } = await validator.remove.validate({
        userId: req.headers.userId,
        id: req.params.id,
      })
      await service.delete(id, userId)
      res.status(200).json({})
    } catch (error) {
      next(error)
    }
  }

  async listMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, startDate, endDate } =
        await validator.findMetrics.validate({
          userId: req.headers.userId,
          startDate: req.query.startDate,
          endDate: req.query.endDate,
        })

      const metrics = await service.getMetrics(userId, startDate, endDate)
      res.status(200).json(metrics)
    } catch (error) {
      next(error)
    }
  }
}
