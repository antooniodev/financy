import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'
import postgres from 'postgres'

export const client = postgres({
  host: process.env.DATABASE_HOST,
  port: 5432,
  database: process.env.DATABASE_DB,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
})

export async function testConnection() {
  try {
    const result = await client`SELECT 1 AS test`
    console.log('Conexão bem-sucedida:', result)
  } catch (error) {
    console.error('Erro na conexão:', error)
  }
}
export const db = drizzle(client, { schema, logger: true })
