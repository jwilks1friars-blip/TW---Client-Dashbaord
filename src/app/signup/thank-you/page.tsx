import Link from "next/link"
import { CheckCircle, Activity, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/30 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-white">Tyler Wilks Running</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Success icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-3">
              Application Received!
            </h1>
            <p className="text-gray-400 text-lg">
              Thanks for your interest in coaching. I&apos;ll personally review your application and reach out soon.
            </p>
          </div>

          {/* What happens next */}
          <Card className="bg-gray-900/60 border-white/10 text-left">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                What happens next
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600/20 rounded-lg shrink-0 mt-0.5">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Check your inbox</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      You&apos;ll receive a confirmation email shortly.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600/20 rounded-lg shrink-0 mt-0.5">
                    <Clock className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Expect a reply within 24 hours</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      I&apos;ll review your application and reach out to schedule an intro call.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600/20 rounded-lg shrink-0 mt-0.5">
                    <Activity className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Build your plan together</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Once onboarded, you&apos;ll get access to your personalized training portal.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-white/10 text-gray-300 hover:bg-gray-800"
            >
              <Link href="/signup">Submit Another</Link>
            </Button>
            <Button asChild className="flex-1">
              <a href="https://tylerwilksrunning.com" target="_blank" rel="noopener noreferrer">
                Back to Website
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
