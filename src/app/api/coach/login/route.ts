import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const COACH_PASSWORD = process.env.COACH_PASSWORD || 'coach123'
const SESSION_SECRET = process.env.SESSION_SECRET || 'tw-running-secret-2024'

function generateSessionToken(password: string): string {
  return crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(password)
    .digest('hex')
}

export function isValidCoachSession(token: string): boolean {
  const expected = generateSessionToken(COACH_PASSWORD)
  return token === expected
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    if (password !== COACH_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = generateSessionToken(password)

    const response = NextResponse.json({ success: true })
    response.cookies.set('coach_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Coach login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('coach_session')
  return response
}
