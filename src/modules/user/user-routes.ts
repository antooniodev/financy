import { type Request, type Response, Router } from 'express'
import UserController from './user-controller'

const userRouter = Router()
const controller = new UserController()

userRouter.post('/user', controller.register)

userRouter.get('/user/:id', controller.listById)

export default userRouter
