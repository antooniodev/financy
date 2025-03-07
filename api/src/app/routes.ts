import express, { Router } from 'express'
import userRouter from '../modules/user/user-routes'
import categoryRouter from '../modules/category/category-routes'
import transactionRouter from '../modules/transaction/transaction-routes'
import authRouter from '../modules/authenticate/authenticate-routes'

const routes = Router()
routes.use(
  express.json(),
  userRouter,
  categoryRouter,
  transactionRouter,
  authRouter
)

export default routes
