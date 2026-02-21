import { NextRequest, NextResponse } from 'next/server'
import { readSignups, writeSignups } from '@/lib/signups'

const API_KEY = process.env.INQUIRIES_API_KEY || 'tw-inquiries-secret-key'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
}

function checkApiKey(request: NextRequest): boolean {
  const key = request.headers.get('x-api-key')
  return key === API_KEY
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

// GET all signups — called by coach dashboard
export async function GET(request: NextRequest) {
  if (!checkApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: CORS })
  }

  const signups = readSignups()
  signups.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return NextResponse.json(signups, { headers: CORS })
}

// PATCH a signup's status or notes — called by coach dashboard
export async function PATCH(request: NextRequest) {
  if (!checkApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: CORS })
  }

  try {
    const body = await request.json()
    const { id, status, coachNotes } = body

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400, headers: CORS })
    }

    const signups = readSignups()
    const index = signups.findIndex((s) => s.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404, headers: CORS })
    }

    if (status !== undefined) signups[index].status = status
    if (coachNotes !== undefined) signups[index].coachNotes = coachNotes
    signups[index].updatedAt = new Date().toISOString()

    writeSignups(signups)
    return NextResponse.json(signups[index], { headers: CORS })
  } catch (error) {
    console.error('Update inquiry error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: CORS })
  }
}
