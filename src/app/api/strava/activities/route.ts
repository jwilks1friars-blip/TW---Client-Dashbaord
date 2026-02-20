import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  const perPage = request.nextUrl.searchParams.get('per_page') || '30'

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Access token required' },
      { status: 401 }
    )
  }

  try {
    // Fetch activities from Strava API
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          error: errorData.message || 'Failed to fetch activities',
          details: errorData.errors,
        },
        { status: response.status }
      )
    }

    const activities = await response.json()

    // Filter for runs only and format
    const runs = activities
      .filter((activity: any) => activity.sport_type === 'Run')
      .map((activity: any) => ({
        id: activity.id,
        name: activity.name,
        distance: (activity.distance / 1609.34).toFixed(2), // Convert meters to miles
        moving_time: activity.moving_time, // seconds
        elapsed_time: activity.elapsed_time, // seconds
        total_elevation_gain: (activity.total_elevation_gain * 3.28084).toFixed(0), // Convert meters to feet
        start_date: activity.start_date,
        start_date_local: activity.start_date_local,
        average_speed: activity.average_speed, // m/s
        average_heartrate: activity.average_heartrate,
        max_heartrate: activity.max_heartrate,
        kudos_count: activity.kudos_count,
        achievement_count: activity.achievement_count,
        map: activity.map,
      }))

    return NextResponse.json({ activities: runs })
  } catch (error) {
    console.error('Activities fetch error:', error)
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

