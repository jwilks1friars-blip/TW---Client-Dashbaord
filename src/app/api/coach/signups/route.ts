import { NextRequest, NextResponse } from 'next/server'
import { readSignups, writeSignups } from '@/app/api/signup/route'
import { isValidCoachSession } from '@/app/api/coach/login/route'

function checkAuth(request: NextRequest): boolean {
  const token = request.cookies.get('coach_session')?.value
  return !!token && isValidCoachSession(token)
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const signups = readSignups()
  // Sort newest first
  signups.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return NextResponse.json(signups)
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status, coachNotes } = body

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const signups = readSignups()
    const index = signups.findIndex((s) => s.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Signup not found' }, { status: 404 })
    }

    if (status !== undefined) signups[index].status = status
    if (coachNotes !== undefined) signups[index].coachNotes = coachNotes
    signups[index].updatedAt = new Date().toISOString()

    writeSignups(signups)
    return NextResponse.json(signups[index])
  } catch (error) {
    console.error('Update signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
