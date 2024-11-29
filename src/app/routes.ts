import express, { Router } from 'express'
import userRouter from '../modules/user/user-routes'
import categoryRouter from '../modules/category/category-routes'
import transactionRouter from '../modules/transaction/transaction-routes'

const routes = Router()
routes.use(express.json(), userRouter, categoryRouter, transactionRouter)

export default routes
