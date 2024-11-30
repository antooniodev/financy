import { NextFunction, Request, Response } from 'express'

import { CategoryService } from './category-service'
import categoryValidator from '../../shared/validators/category-validator'
import paramsValidator from '../../shared/validators/params-validator'

const service = new CategoryService()
export default class CategoryController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, type } = await categoryValidator.findParams.validate({
        userId: req.params.userId,
        type: req.query.type,
      })
      const categories = await service.findMany(userId, type?.toString())
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryValidator.body.validate(req.body)
      const categoryId = await service.create(req.body)
      res.status(201).json({ id: categoryId })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await categoryValidator.body.validate(req.body)
      const categoryId = await service.update(id, req.body)
      res.status(200).json({ id: categoryId })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, userId } = await paramsValidator.index.validate(req.query)

      await service.delete(id, userId)
      res.status(200).json()
    } catch (error) {
      next(error)
    }
  }
}
