"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, ExternalLink, CheckCircle2 } from "lucide-react"
import {
  isStravaConnected,
  getStravaAuthUrl,
  getStravaToken,
} from "@/lib/strava"
import { getAuthenticatedClient } from "@/lib/auth"

export function StravaConnectCard() {
  const [connected, setConnected] = useState(false)
  const [athleteName, setAthleteName] = useState<string | null>(null)

  useEffect(() => {
    const client = getAuthenticatedClient()
    if (!client) return

    const isConnected = isStravaConnected(client.id)
    setConnected(isConnected)

    if (isConnected) {
      const token = getStravaToken(client.id)
      if (token?.athlete) {
        setAthleteName(
          `${token.athlete.firstname} ${token.athlete.lastname}`.trim() ||
            token.athlete.username ||
            null
        )
      }
    }
  }, [])

  const handleConnect = () => {
    window.location.href = getStravaAuthUrl()
  }

  if (connected) {
    return (
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <CardTitle>Strava Connected</CardTitle>
            </div>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <CardDescription>
            {athleteName
              ? `Connected as ${athleteName}`
              : "Your Strava account is connected"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Your runs are automatically syncing to your dashboard. View your
            activities below.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              // Scroll to Strava activities section
              const element = document.getElementById("strava-activities")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Activities
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-[#FC4C02]/20 bg-gradient-to-br from-[#FC4C02]/5 to-[#FC4C02]/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#FC4C02]" />
          <CardTitle>Connect Strava</CardTitle>
        </div>
        <CardDescription>
          Sync your runs automatically to your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Connect your Strava account to automatically sync your running
            activities. Your runs will appear on your dashboard as soon as you
            log them.
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Automatic activity sync</li>
            <li>View distance, pace, and elevation</li>
            <li>Track your progress over time</li>
          </ul>
          <Button
            onClick={handleConnect}
            className="w-full bg-[#FC4C02] hover:bg-[#e64402] text-white"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect with Strava
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

