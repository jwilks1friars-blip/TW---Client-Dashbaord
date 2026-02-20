import { NextRequest, NextResponse } from 'next/server'

// Protect Strava API routes: require an Authorization header.
// Page-level auth is handled client-side via sessionStorage guards.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api/strava/')) {
    const authHeader = request.headers.get('Authorization')
    // The token route and refresh route are called with credentials in the
    // body/query — they don't need a bearer token themselves.
    const isCredentialRoute =
      pathname === '/api/strava/token' || pathname === '/api/strava/refresh'

    if (!isCredentialRoute && (!authHeader || !authHeader.startsWith('Bearer '))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/strava/:path*',
}
