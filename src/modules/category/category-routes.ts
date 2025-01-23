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

categoryRouter.get('/categories/:id', verifyToken, controller.listOne)

categoryRouter.get(/categories/, verifyToken, controller.listAllCategories)

categoryRouter.post('/categories', verifyToken, controller.create)

categoryRouter.delete('/categories/:id', verifyToken, controller.delete)

categoryRouter.put('/categories/:id', verifyToken, controller.update)

export default categoryRouter
