import { Request, Response, Router } from 'express'
import { TransactionController } from './transaction-controller'

const transactionRouter = Router()

const controller = new TransactionController()

transactionRouter.get('/transactions/:userId', controller.list)

transactionRouter.get('/transactions/:userId/:id', controller.listOne)

transactionRouter.post('/transactions', controller.create)

transactionRouter.put('/transactions/:userId/:id', controller.edit)

transactionRouter.delete('/transactions/:id', controller.delete)

export default transactionRouter
