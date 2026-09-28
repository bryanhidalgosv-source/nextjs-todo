import { NextResponse } from 'next/server'
import pool, { initDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  await initDB()
  const result = await pool.query('SELECT * FROM tareas WHERE eliminada = false ORDER BY id DESC')
  return NextResponse.json(result.rows)
}

export async function POST(request: Request) {
  await initDB()
  const { texto } = await request.json()
  const result = await pool.query(
    'INSERT INTO tareas (texto) VALUES ($1) RETURNING *',
    [texto]
  )
  return NextResponse.json(result.rows[0])
}
