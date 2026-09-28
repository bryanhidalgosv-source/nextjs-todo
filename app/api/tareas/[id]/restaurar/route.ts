import { NextResponse } from 'next/server'
import pool, { initDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await initDB()
  const { id } = params
  const result = await pool.query(
    'UPDATE tareas SET eliminada = false WHERE id = $1 RETURNING *',
    [id]
  )
  return NextResponse.json(result.rows[0])
}
