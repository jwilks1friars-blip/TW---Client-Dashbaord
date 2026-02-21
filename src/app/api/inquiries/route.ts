import { NextRequest, NextResponse } from 'next/server'
import { readSignups, writeSignups } from '@/lib/signups'

const API_KEY = process.env.INQUIRIES_API_KEY || 'tw-inquiries-secret-key'

function checkApiKey(request: NextRequest): boolean {
  const key = request.headers.get('x-api-key')
  return key === API_KEY
}

// GET all signups — called by coach dashboard
export async function GET(request: NextRequest) {
  if (!checkApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const signups = readSignups()
  signups.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return NextResponse.json(signups)
}

// PATCH a signup's status or notes — called by coach dashboard
export async function PATCH(request: NextRequest) {
  if (!checkApiKey(request)) {
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
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (status !== undefined) signups[index].status = status
    if (coachNotes !== undefined) signups[index].coachNotes = coachNotes
    signups[index].updatedAt = new Date().toISOString()

    writeSignups(signups)
    return NextResponse.json(signups[index])
  } catch (error) {
    console.error('Update inquiry error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
