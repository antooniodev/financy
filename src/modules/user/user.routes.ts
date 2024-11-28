import { type Request, type Response, Router } from "express"
import UserController from "./user.controller"

const userRouter = Router()
const controller = new UserController()

userRouter.post("/user", (req: Request, res: Response) => {
  controller.create(req, res)
})

userRouter.get('/user/:id', (req: Request, res: Response) => {
    controller.listById(req, res)
})

export default userRouter
