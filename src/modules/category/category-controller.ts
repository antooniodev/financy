import { NextFunction, Request, Response } from 'express'

import { CategoryService } from './category-service'
import categoryValidator from './category-validator'
import paramsValidator from '../../shared/validators/params-validator'

const service = new CategoryService()
export default class CategoryController {
  async listSummaryCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, type, startDate, endDate } =
        await categoryValidator.getSummary.validate({
          userId: req.headers.userId,
          type: req.query.type,
          startDate: req.query.startDate,
          endDate: req.query.endDate,
        })

      const summary = await service.getSummaryOfCategoriesByPeriod(
        userId,
        type,
        startDate,
        endDate
      )
      res.status(200).json(summary)
    } catch (error) {
      next(error)
    }
  }

  async listAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = await categoryValidator.findAllParams.validate({
        type: req.query.type,
        userId: req.headers.userId,
      })

      const categories = await service.findAllCategoriesByType(type)
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }

  async listOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, id } = await paramsValidator.index.validate({
        userId: req.headers.userId,
        id: req.params.id,
      })
      const category = await service.findOne(id)
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryValidator.bodyPost.validate(req.body)
      const userId = await paramsValidator.userId.validate(req.headers.userId)
      const categoryId = await service.create(req.body)
      res.status(201).json({ id: categoryId })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, userId } = await paramsValidator.index.validate({
        userId: req.headers.userId,
        id: req.params.id,
      })
      await categoryValidator.bodyPut.validate(req.body)
      const categoryId = await service.update(id, req.body)
      res.status(200).json({ data: categoryId })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, userId } = await paramsValidator.index.validate({
        userId: req.headers.userId,
        id: req.params.id,
      })

      await service.delete(id)
      res.status(200).json({})
    } catch (error) {
      next(error)
    }
  }
}
