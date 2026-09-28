import { NextResponse } from 'next/server'
import pool, { initDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await initDB()
  const { id } = params
  const body = await request.json()

  if (body.texto !== undefined) {
    const result = await pool.query(
      'UPDATE tareas SET texto = $1 WHERE id = $2 RETURNING *',
      [body.texto, id]
    )
    return NextResponse.json(result.rows[0])
  }

  const result = await pool.query(
    'UPDATE tareas SET completada = NOT completada WHERE id = $1 RETURNING *',
    [id]
  )
  return NextResponse.json(result.rows[0])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await initDB()
  const { id } = params
  await pool.query('UPDATE tareas SET eliminada = true WHERE id = $1', [id])
  return NextResponse.json({ ok: true })
}
