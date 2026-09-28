import { NextResponse } from 'next/server'
import pool, { initDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await initDB()
  const { id } = params
  await pool.query('DELETE FROM tareas WHERE id = $1', [id])
  return NextResponse.json({ ok: true })
}
