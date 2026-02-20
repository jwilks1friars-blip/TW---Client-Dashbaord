"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Check if already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authenticatedClient = sessionStorage.getItem("authenticatedClient")
      if (authenticatedClient) {
        router.push("/")
      }
    }
  }, [router])

  const authenticateClient = (clientId: string, password: string) => {
    if (typeof window === "undefined") return false

    const clients = JSON.parse(
      localStorage.getItem("clientCredentials") || "{}"
    )
    const client = clients[clientId.toLowerCase()]

    if (!client) {
      return false
    }

    if (client.password === password) {
      return {
        id: clientId.toLowerCase(),
        name: client.name || clientId,
      }
    }

    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!email || !password) {
      setError("Please enter both Email and Password")
      setLoading(false)
      return
    }

    const client = authenticateClient(email, password)

    if (client) {
      // Store authenticated client session
      sessionStorage.setItem("authenticatedClient", JSON.stringify(client))
      // Redirect to dashboard
      router.push("/")
    } else {
      setError("Invalid Email or Password. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Client Portal</CardTitle>
          <CardDescription>
            Access your personalized training schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    alert(
                      "Please contact your coach to reset your password.\n\nEmail: jwilks1.friars@gmail.com\nOr visit: tylerwilksrunning.com"
                    )
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Need help? Contact your coach
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

