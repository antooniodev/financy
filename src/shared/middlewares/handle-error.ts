import { ValidationError } from 'yup'
import { CustomError } from '../errors/custom-error'
import { NextFunction, Request, Response } from 'express'
import { Error as PostgresError } from 'postgres'

const extractDuplicateKeyDetails = (message: string): string | null => {
  const match = message.match(/unique constraint "(.*?)"/)
  if (match) {
    const constraintName = match[1]
    if (constraintName.includes('categories_title_unique')) {
      return 'Já existe uma categoria com este nome.'
    }
    if (constraintName.includes('users_email_unique')) {
      return 'Já existe uma conta vinculada a este email.'
    }
    return `Erro de duplicidade no campo relacionado à constraint "${constraintName}".`
  }
  return null
}

const postgresErrorMessages: Record<string, string> = {
  '23505': 'Valor duplicado para um campo único.', // Código de erro para chave única duplicada
}

const handleError = (
  error: PostgresError,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (error.code && postgresErrorMessages[error.code]) {
    const customMessage = extractDuplicateKeyDetails(
      error.message || postgresErrorMessages[error.code]
    )
    return response.status(409).json({
      error: customMessage,
    })
  }

  if (error instanceof CustomError) {
    return response.status(error.statusCode).json({ error: error.message })
  }
  if (error instanceof ValidationError) {
    return response.status(400).json({ error: error.message })
  }
  console.log('UNMAPPED ERROR', error.message)
  return response
    .status(500)
    .json({ error: 'Ocorreu um erro ao fazer a requisição.' })
}

export default handleError
