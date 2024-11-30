import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'
import postgres from 'postgres'
import { env } from '../../env'

export const client = postgres({
  host: 'localhost',
  port: 5432,
  database: 'financy-db',
  user: 'victor',
  password: 'Av81915485',
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
