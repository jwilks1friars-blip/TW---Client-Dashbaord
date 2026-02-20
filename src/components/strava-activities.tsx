"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, ExternalLink, RefreshCw } from "lucide-react"
import {
  getStravaToken,
  isStravaConnected,
  getStravaAuthUrl,
  fetchStravaActivities,
  refreshStravaToken,
  clearStravaToken,
  setStravaToken,
} from "@/lib/strava"
import { getAuthenticatedClient } from "@/lib/auth"

interface StravaActivity {
  id: number
  name: string
  distance: string
  moving_time: number
  elapsed_time: number
  total_elevation_gain: string
  start_date: string
  start_date_local: string
  average_speed: number
  average_heartrate?: number
  max_heartrate?: number
  kudos_count: number
  achievement_count: number
  map?: {
    id: string
    summary_polyline: string
  }
}

export function StravaActivities() {
  const [connected, setConnected] = useState(false)
  const [activities, setActivities] = useState<StravaActivity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const client = getAuthenticatedClient()
    if (!client) return

    const connected = isStravaConnected(client.id)
    setConnected(connected)

    if (connected) {
      loadActivities()
    }
  }, [])

  const loadActivities = async () => {
    const client = getAuthenticatedClient()
    if (!client) return

    setLoading(true)
    setError(null)

    try {
      let token = getStravaToken(client.id)
      if (!token) {
        setConnected(false)
        return
      }

      // Check if token is expired and refresh if needed
      if (token.expires_at && token.expires_at * 1000 < Date.now()) {
        token = await refreshStravaToken(token)
        setStravaToken(client.id, token)
      }

      const activities = await fetchStravaActivities(token.access_token)
      setActivities(activities)
    } catch (err: any) {
      console.error("Error loading activities:", err)
      setError(err.message || "Failed to load activities")
      // If token is invalid, disconnect
      if (err.message?.includes("token")) {
        clearStravaToken(client.id)
        setConnected(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = () => {
    window.location.href = getStravaAuthUrl()
  }

  const handleDisconnect = () => {
    const client = getAuthenticatedClient()
    if (client) {
      clearStravaToken(client.id)
      setConnected(false)
      setActivities([])
    }
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }
    return `${minutes}m ${secs}s`
  }

  const formatPace = (speedMps: number): string => {
    // Convert m/s to min/mile
    const paceSecondsPerMile = 1609.34 / speedMps
    const minutes = Math.floor(paceSecondsPerMile / 60)
    const seconds = Math.floor(paceSecondsPerMile % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (!connected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Strava Activities</CardTitle>
          <CardDescription>
            Connect your Strava account to automatically sync your runs
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-4">
            Connect with Strava to see your running activities automatically
            synced to your dashboard.
          </p>
          <Button onClick={handleConnect} className="bg-[#FC4C02] hover:bg-[#e64402]">
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect with Strava
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Strava Activities</CardTitle>
            <CardDescription>
              Your runs synced from Strava
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadActivities}
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && activities.length === 0 && (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-4">
              Loading activities...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 mb-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!loading && activities.length === 0 && !error && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              No activities found. Go for a run and sync again!
            </p>
          </div>
        )}

        {activities.length > 0 && (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{activity.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(activity.start_date_local)}
                    </p>
                  </div>
                  <a
                    href={`https://www.strava.com/activities/${activity.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FC4C02] hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="font-semibold">{activity.distance} mi</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-semibold">
                      {formatTime(activity.moving_time)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pace</p>
                    <p className="font-semibold">
                      {formatPace(activity.average_speed)} /mi
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Elevation</p>
                    <p className="font-semibold">
                      {activity.total_elevation_gain} ft
                    </p>
                  </div>
                </div>

                {(activity.average_heartrate || activity.max_heartrate) && (
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                    {activity.average_heartrate && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Avg Heart Rate
                        </p>
                        <p className="font-semibold">
                          {activity.average_heartrate} bpm
                        </p>
                      </div>
                    )}
                    {activity.max_heartrate && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Max Heart Rate
                        </p>
                        <p className="font-semibold">
                          {activity.max_heartrate} bpm
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

