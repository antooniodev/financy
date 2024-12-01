import { Request, Response, Router } from 'express'
import { TransactionController } from './transaction-controller'
import verifyToken from '../../shared/middlewares/verify-token'

const transactionRouter = Router()

const controller = new TransactionController()

transactionRouter.get('/transactions', verifyToken, controller.list)

transactionRouter.get('/transactions/:id', verifyToken, controller.listOne)

transactionRouter.post('/transactions', verifyToken, controller.create)

transactionRouter.put('/transactions/:id', verifyToken, controller.edit)

transactionRouter.delete('/transactions/:id', verifyToken, controller.delete)

export default transactionRouter
