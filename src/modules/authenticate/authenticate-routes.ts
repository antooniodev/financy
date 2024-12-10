import { Router } from 'express'
import { AuthenticateController } from './authenticate-controller'

const authRouter = Router()
const controller = new AuthenticateController()
authRouter.post('/auth/session', controller.createSession)

export default authRouter
