import { Router } from 'express'
import CategoryController from './category-controller'
import verifyToken from '../../shared/middlewares/verify-token'

const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get(
  '/categories/summary/',
  verifyToken,
  controller.listSummaryCategories
)

categoryRouter.get(/categories/, verifyToken, controller.listAllCategories)

export default categoryRouter
