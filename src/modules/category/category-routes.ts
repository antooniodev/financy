import { Router } from 'express'
import CategoryController from './category-controller'

const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.get('/categories/:userId', controller.list)

categoryRouter.get('/categories/:userId/:id', controller.listOne)

categoryRouter.post('/categories', controller.create)

categoryRouter.delete('/categories/:userId/:id', controller.delete)

categoryRouter.put('/categories/:userId/:id', controller.update)

export default categoryRouter
