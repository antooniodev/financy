import { type Request, type Response, Router } from 'express'
import UserController from './user-controller'
import verifyToken from '../../shared/middlewares/verify-token'

const userRouter = Router()
const controller = new UserController()

userRouter.post('/users', controller.register)
userRouter.put('/users/monthly-goal', verifyToken, controller.updateMonthlyGoal)

userRouter.get('/users/monthly-goal', verifyToken, controller.getMonthlyGoal)

userRouter.get('/users/:id', verifyToken, controller.listById)

export default userRouter
