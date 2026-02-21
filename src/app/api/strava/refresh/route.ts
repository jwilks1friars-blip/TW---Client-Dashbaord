import { NextRequest, NextResponse } from 'next/server'

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET

if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET) {
  throw new Error('STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET must be set in environment variables')
}

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json()

    if (!refresh_token) {
      return NextResponse.json(
        { error: 'Refresh token required' },
        { status: 400 }
      )
    }

    // Refresh the access token
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: refresh_token,
        grant_type: 'refresh_token',
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.message || 'Failed to refresh token',
          details: data.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      access_token: data.access_token,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token,
    })
  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

