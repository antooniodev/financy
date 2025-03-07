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
    console.log('(Database) Connect')
  } catch (error) {
    console.error('(Database) Error', error)
  }
}
export const db = drizzle(client, { schema, logger: true })
