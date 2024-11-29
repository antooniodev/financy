import { Router } from 'express'
import CategoryController from './category-controller'

const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get('/categories/:userId', controller.list)

categoryRouter.post('/categories', controller.create)

categoryRouter.delete('/categories', controller.delete)

categoryRouter.put('/categories/:id', controller.update)

export default categoryRouter
