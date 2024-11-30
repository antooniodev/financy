import * as yup from 'yup'
const envSchema = yup.object({
  DATABASE_URL: yup.string().url(),
})

export const env = envSchema.validateSync(process.env)
