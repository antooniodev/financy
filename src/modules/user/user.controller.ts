import { Request, Response } from 'express'
import { HandleError } from '../../shared/errors/handleError'
import { UserService } from './user.service'

const service = new UserService()

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const dto = req.body
      const userId: string = await service.create(dto)
      res.status(201).json({ id: userId })
    } catch (error) {
      console.log(error)
      if (error instanceof HandleError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'Ocorreu um erro ao criar a conta.' })
      }
    }
  }

  async listById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await service.findById(id)
      res.status(200).json(user)
    } catch (error) {
      if (error instanceof HandleError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'Ocorreu um erro ao buscar os dados.' })
      }
    }
  }
}

export default UserController
