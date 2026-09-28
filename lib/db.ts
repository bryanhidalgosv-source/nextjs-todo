import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? { rejectUnauthorized: false } : false,
})

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tareas (
      id SERIAL PRIMARY KEY,
      texto TEXT NOT NULL,
      completada BOOLEAN DEFAULT false,
      eliminada BOOLEAN DEFAULT false,
      creada_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export default pool
