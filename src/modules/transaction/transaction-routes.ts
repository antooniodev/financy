import { Request, Response, Router } from 'express'
import { TransactionController } from './transaction-controller'

const transactionRouter = Router()

const controller = new TransactionController()

transactionRouter.get('/transactions/:userId', controller.list)

transactionRouter.get('/transaction/:id', controller.listOne)

transactionRouter.post('/transactions', controller.create)

transactionRouter.delete('/transactions/:id', controller.delete)

export default transactionRouter
