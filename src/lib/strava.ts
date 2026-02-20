"use client"

// Strava integration utilities
// Compatible with localStorage-based system

const STRAVA_CLIENT_ID = "191041"
const STRAVA_REDIRECT_URI =
  typeof window !== "undefined"
    ? `${window.location.origin}/strava/callback`
    : ""

export interface StravaToken {
  access_token: string
  refresh_token: string
  expires_at: number
  athlete: {
    id: number
    username: string
    firstname: string
    lastname: string
  }
}

export function getStravaToken(clientId: string): StravaToken | null {
  if (typeof window === "undefined") return null

  const key = `strava_token_${clientId.toLowerCase()}`
  const tokenData = localStorage.getItem(key)
  if (!tokenData) return null

  try {
    const token = JSON.parse(tokenData)
    // Check if token is expired
    if (token.expires_at && token.expires_at * 1000 < Date.now()) {
      return null // Token expired
    }
    return token
  } catch {
    return null
  }
}

export function setStravaToken(clientId: string, token: StravaToken) {
  if (typeof window === "undefined") return

  const key = `strava_token_${clientId.toLowerCase()}`
  localStorage.setItem(key, JSON.stringify(token))
}

export function clearStravaToken(clientId: string) {
  if (typeof window === "undefined") return

  const key = `strava_token_${clientId.toLowerCase()}`
  localStorage.removeItem(key)
}

export function isStravaConnected(clientId: string): boolean {
  return getStravaToken(clientId) !== null
}

export function getStravaAuthUrl(): string {
  const scope = "read,activity:read"
  const redirectUri = encodeURIComponent(STRAVA_REDIRECT_URI)
  return `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`
}

export async function exchangeCodeForToken(code: string): Promise<StravaToken> {
  const response = await fetch(`/api/strava/token?code=${code}`)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to exchange token")
  }

  const data = await response.json()
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() / 1000 + data.expires_in,
    athlete: data.athlete,
  }
}

export async function refreshStravaToken(
  existingToken: StravaToken
): Promise<StravaToken> {
  const response = await fetch("/api/strava/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: existingToken.refresh_token }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to refresh token")
  }

  const data = await response.json()
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() / 1000 + data.expires_in,
    athlete: existingToken.athlete,
  }
}

export async function fetchStravaActivities(
  accessToken: string
): Promise<any[]> {
  const response = await fetch("/api/strava/activities", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to fetch activities")
  }

  const data = await response.json()
  return data.activities || []
}

