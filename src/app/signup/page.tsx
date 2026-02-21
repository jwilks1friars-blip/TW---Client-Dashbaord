"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ChevronRight, Activity } from "lucide-react"

const PROGRAMS = [
  {
    id: "5k",
    label: "5K Training",
    description: "Build speed and endurance for your first or fastest 5K",
    emoji: "⚡",
  },
  {
    id: "10k",
    label: "10K Training",
    description: "Bridge the gap between short races and longer distances",
    emoji: "🏃",
  },
  {
    id: "half",
    label: "Half Marathon",
    description: "13.1 miles of structured, progressive training",
    emoji: "🥈",
  },
  {
    id: "full",
    label: "Marathon",
    description: "Full 26.2-mile preparation with periodized planning",
    emoji: "🏅",
  },
  {
    id: "custom",
    label: "Custom Coaching",
    description: "Fully personalized plan built around your specific goals",
    emoji: "✨",
  },
  {
    id: "general",
    label: "General Improvement",
    description: "Get faster, stronger, and more consistent as a runner",
    emoji: "📈",
  },
]

const EXPERIENCE_LEVELS = [
  {
    id: "beginner",
    label: "Just Getting Started",
    description: "New to running or returning after a long break",
  },
  {
    id: "intermediate",
    label: "Some Experience",
    description: "Running regularly for 1–2 years, completed a race or two",
  },
  {
    id: "advanced",
    label: "Experienced Runner",
    description: "3+ years of consistent training, chasing new PRs",
  },
  {
    id: "competitive",
    label: "Competitive Athlete",
    description: "Racing frequently at a high level, serious about performance",
  },
]

const MILEAGE_OPTIONS = [
  "0–10 miles / week",
  "10–20 miles / week",
  "20–30 miles / week",
  "30–40 miles / week",
  "40+ miles / week",
]

interface FormData {
  name: string
  email: string
  phone: string
  programInterest: string
  experienceLevel: string
  weeklyMileage: string
  goals: string
  availability: string
}

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    programInterest: "",
    experienceLevel: "",
    weeklyMileage: "",
    goals: "",
    availability: "",
  })

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const canAdvanceStep1 =
    form.name.trim() && form.email.trim() && form.programInterest
  const canAdvanceStep2 = form.experienceLevel && form.weeklyMileage
  const canSubmit = form.goals.trim()

  const handleSubmit = async () => {
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Something went wrong")
      }
      router.push("/signup/thank-you")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-white">Tyler Wilks Running</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Start Your Coaching Journey
          </h1>
          <p className="text-gray-400 text-lg">
            Tell me a bit about yourself and your goals — I&apos;ll reach out within 24 hours.
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                  step > s
                    ? "bg-blue-600 text-white"
                    : step === s
                    ? "bg-blue-600 text-white ring-4 ring-blue-600/20"
                    : "bg-gray-800 text-gray-500"
                }`}
              >
                {step > s ? <CheckCircle className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 w-12 sm:w-20 transition-all ${
                    step > s ? "bg-blue-600" : "bg-gray-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div className="flex justify-between text-xs text-gray-500 mb-8 px-1">
          <span className={step >= 1 ? "text-blue-400" : ""}>Contact & Program</span>
          <span className={step >= 2 ? "text-blue-400" : ""}>Experience</span>
          <span className={step >= 3 ? "text-blue-400" : ""}>Goals</span>
        </div>

        {/* Step 1: Contact info + Program */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Card className="bg-gray-900/60 border-white/10">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-white">Your Info</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">
                    Phone Number{" "}
                    <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                Which program interests you? <span className="text-red-400">*</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {PROGRAMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => update("programInterest", p.label)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      form.programInterest === p.label
                        ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/50"
                        : "border-white/10 bg-gray-900/60 hover:border-white/20 hover:bg-gray-800/60"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{p.emoji}</span>
                    <p className="font-semibold text-white text-sm">{p.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{p.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full h-12 text-base"
              disabled={!canAdvanceStep1}
              onClick={() => setStep(2)}
            >
              Continue <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Experience + Mileage */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                How would you describe your experience? <span className="text-red-400">*</span>
              </h2>
              <div className="space-y-2">
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => update("experienceLevel", lvl.label)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      form.experienceLevel === lvl.label
                        ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/50"
                        : "border-white/10 bg-gray-900/60 hover:border-white/20 hover:bg-gray-800/60"
                    }`}
                  >
                    <p className="font-semibold text-white text-sm">{lvl.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{lvl.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                Current weekly mileage? <span className="text-red-400">*</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MILEAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => update("weeklyMileage", opt)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      form.weeklyMileage === opt
                        ? "border-blue-500 bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/50"
                        : "border-white/10 bg-gray-900/60 text-gray-300 hover:border-white/20 hover:bg-gray-800/60"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 border-white/10 text-gray-300 hover:bg-gray-800"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1 h-12 text-base"
                disabled={!canAdvanceStep2}
                onClick={() => setStep(3)}
              >
                Continue <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Goals + Availability */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Card className="bg-gray-900/60 border-white/10">
              <CardContent className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">
                    What are your running goals? <span className="text-red-400">*</span>
                  </label>
                  <p className="text-xs text-gray-500">
                    Share any races you&apos;re targeting, times you want to hit, or what you want coaching to help you achieve.
                  </p>
                  <textarea
                    rows={4}
                    placeholder="e.g. I want to break 4 hours in my first marathon this October. I've been running casually for 2 years and want a structured plan..."
                    value={form.goals}
                    onChange={(e) => update("goals", e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">
                    Availability & schedule{" "}
                    <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <p className="text-xs text-gray-500">
                    When do you typically train? Any days or times that don&apos;t work?
                  </p>
                  <textarea
                    rows={3}
                    placeholder="e.g. I can run Mon/Wed/Fri mornings before work, and Saturday for a long run..."
                    value={form.availability}
                    onChange={(e) => update("availability", e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="bg-blue-950/30 border-blue-500/20">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3">
                  Your Summary
                </p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name</span>
                    <span className="text-white font-medium">{form.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Program</span>
                    <span className="text-white font-medium">{form.programInterest}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Experience</span>
                    <span className="text-white font-medium">{form.experienceLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mileage</span>
                    <span className="text-white font-medium">{form.weeklyMileage}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 border-white/10 text-gray-300 hover:bg-gray-800"
                onClick={() => setStep(2)}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                className="flex-1 h-12 text-base"
                disabled={!canSubmit || loading}
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>

            <p className="text-center text-xs text-gray-600">
              Your information is kept private and will only be used to follow up on your coaching inquiry.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
