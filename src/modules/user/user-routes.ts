import { type Request, type Response, Router } from 'express'
import UserController from './user-controller'
import verifyToken from '../../shared/middlewares/verify-token'

const userRouter = Router()
const controller = new UserController()

userRouter.post('/user', controller.register)
userRouter.put('/user/monthly-goal', verifyToken, controller.updateMonthlyGoal)

userRouter.get('/user/monthly-goal', verifyToken, controller.getMonthlyGoal)

userRouter.get('/user/:id', verifyToken, controller.listById)

export default userRouter
