import { NextResponse } from 'next/server'
import pool, { initDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  await initDB()
  const result = await pool.query('SELECT * FROM tareas WHERE eliminada = true ORDER BY id DESC')
  return NextResponse.json(result.rows)
}
