"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { exchangeCodeForToken, setStravaToken } from "@/lib/strava"
import { getAuthenticatedClient } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function StravaCallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Connecting to Strava...")

  useEffect(() => {
    const code = searchParams.get("code")
    const client = getAuthenticatedClient()

    if (!code) {
      setStatus("error")
      setMessage("No authorization code received from Strava.")
      return
    }

    if (!client) {
      setStatus("error")
      setMessage("Please log in first.")
      setTimeout(() => router.push("/login"), 2000)
      return
    }

    // Exchange code for token
    exchangeCodeForToken(code)
      .then((token) => {
        setStravaToken(client.id, token)
        setStatus("success")
        setMessage("Strava connected successfully! Redirecting to dashboard...")
        setTimeout(() => router.push("/"), 2000)
      })
      .catch((error) => {
        console.error("Strava connection error:", error)
        setStatus("error")
        setMessage(error.message || "Failed to connect to Strava. Please try again.")
      })
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Strava Connection</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent>
          {status === "loading" && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          {status === "success" && (
            <div className="text-center py-4">
              <div className="text-green-500 text-4xl mb-4">✓</div>
              <p className="text-sm text-muted-foreground">
                You will be redirected shortly...
              </p>
            </div>
          )}
          {status === "error" && (
            <div className="text-center py-4">
              <Button onClick={() => router.push("/")} className="mt-4">
                Go to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function StravaCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Strava Connection</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <StravaCallbackContent />
    </Suspense>
  )
}

