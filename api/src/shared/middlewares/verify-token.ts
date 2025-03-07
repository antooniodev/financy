import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers.authorization?.split(' ')[1] || ''

  if (!token) {
    res.status(401).json({ error: 'Token not provided' })
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!)
    req.headers.userId = (decoded as jwt.JwtPayload).userId
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
}

export default verifyToken
