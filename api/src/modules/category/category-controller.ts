import { NextFunction, Request, Response } from 'express'

import { CategoryService } from './category-service'
import validator from './category-validator'

const service = new CategoryService()
export default class CategoryController {
  async listSummaryCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, type, startDate, endDate } =
        await validator.getSummary.validate({
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
      const { type } = await validator.findAll.validate({
        type: req.query.type,
        userId: req.headers.userId,
      })

      const categories = await service.findAllCategoriesByType(type)
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }
}
