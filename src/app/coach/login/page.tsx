"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Lock } from "lucide-react"

export default function CoachLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/coach/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push("/coach")
      } else {
        const data = await res.json()
        setError(data.error || "Invalid password")
        setLoading(false)
      }
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mx-auto mb-4">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Tyler Wilks Running</h1>
          <p className="text-gray-400 mt-1">Coaching Portal</p>
        </div>

        <Card className="bg-gray-900/80 border-white/10">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg mx-auto mb-3">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <CardTitle className="text-white">Coach Sign In</CardTitle>
            <CardDescription>Enter your coach password to access inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter coach password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11"
                disabled={loading || !password}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-600">
          Set your coach password via the <code className="text-gray-500">COACH_PASSWORD</code> environment variable.
        </p>
      </div>
    </div>
  )
}
