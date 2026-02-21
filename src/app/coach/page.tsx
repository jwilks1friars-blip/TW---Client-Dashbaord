"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  PhoneCall,
  LogOut,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Target,
  Calendar,
  Loader2,
} from "lucide-react"

type Status = "new" | "contacted" | "onboarded" | "declined"

interface Signup {
  id: string
  createdAt: string
  updatedAt: string
  status: Status
  name: string
  email: string
  phone: string
  experienceLevel: string
  programInterest: string
  weeklyMileage: string
  goals: string
  availability: string
  coachNotes: string
}

const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bgColor: string; icon: React.ReactNode }
> = {
  new: {
    label: "New",
    color: "text-blue-400",
    bgColor: "bg-blue-500/15 border-blue-500/30",
    icon: <Clock className="h-3 w-3" />,
  },
  contacted: {
    label: "Contacted",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/15 border-yellow-500/30",
    icon: <PhoneCall className="h-3 w-3" />,
  },
  onboarded: {
    label: "Onboarded",
    color: "text-green-400",
    bgColor: "bg-green-500/15 border-green-500/30",
    icon: <CheckCircle className="h-3 w-3" />,
  },
  declined: {
    label: "Declined",
    color: "text-red-400",
    bgColor: "bg-red-500/15 border-red-500/30",
    icon: <XCircle className="h-3 w-3" />,
  },
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cfg.bgColor} ${cfg.color}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function SignupCard({
  signup,
  onUpdate,
}: {
  signup: Signup
  onUpdate: (id: string, updates: Partial<Signup>) => Promise<void>
}) {
  const [expanded, setExpanded] = useState(false)
  const [notes, setNotes] = useState(signup.coachNotes)
  const [savingNotes, setSavingNotes] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const handleStatusChange = async (status: Status) => {
    setUpdatingStatus(true)
    await onUpdate(signup.id, { status })
    setUpdatingStatus(false)
  }

  const handleSaveNotes = async () => {
    setSavingNotes(true)
    await onUpdate(signup.id, { coachNotes: notes })
    setSavingNotes(false)
  }

  return (
    <Card className={`bg-gray-900/60 border-white/10 transition-all ${expanded ? "ring-1 ring-blue-500/30" : ""}`}>
      <div
        className="p-4 cursor-pointer flex items-start justify-between gap-4"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white">{signup.name}</span>
            <StatusBadge status={signup.status} />
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {signup.email}
            </span>
            {signup.phone && (
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {signup.phone}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              {signup.programInterest}
            </span>
            <span className="text-xs text-gray-500">{formatDate(signup.createdAt)}</span>
          </div>
        </div>
        <div className="shrink-0 text-gray-500">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/5 p-4 space-y-5">
          {/* Details grid */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1">
                <Activity className="h-3 w-3" /> Experience
              </p>
              <p className="text-sm text-white font-medium">{signup.experienceLevel || "—"}</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1">
                <Target className="h-3 w-3" /> Weekly Mileage
              </p>
              <p className="text-sm text-white font-medium">{signup.weeklyMileage || "—"}</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-500 mb-0.5 flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Submitted
              </p>
              <p className="text-sm text-white font-medium">{formatDate(signup.createdAt)}</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Goals</p>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{signup.goals}</p>
          </div>

          {signup.availability && (
            <div className="space-y-1.5">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Availability</p>
              <p className="text-sm text-gray-300 leading-relaxed">{signup.availability}</p>
            </div>
          )}

          {/* Coach notes */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Coach Notes</p>
            <textarea
              rows={3}
              placeholder="Add private notes about this inquiry..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {notes !== signup.coachNotes && (
              <Button
                size="sm"
                variant="outline"
                className="border-white/10 text-gray-300 hover:bg-gray-800"
                onClick={handleSaveNotes}
                disabled={savingNotes}
              >
                {savingNotes ? (
                  <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Saving...</>
                ) : (
                  "Save Notes"
                )}
              </Button>
            )}
          </div>

          {/* Status actions */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {(["new", "contacted", "onboarded", "declined"] as Status[]).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={signup.status === s ? "default" : "outline"}
                  className={
                    signup.status === s
                      ? ""
                      : "border-white/10 text-gray-300 hover:bg-gray-800"
                  }
                  disabled={updatingStatus || signup.status === s}
                  onClick={() => handleStatusChange(s)}
                >
                  {updatingStatus && signup.status !== s ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    STATUS_CONFIG[s].label
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick contact link */}
          <div className="flex gap-2 pt-1">
            <a
              href={`mailto:${signup.email}?subject=Re: Coaching Inquiry - ${signup.programInterest}`}
              className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Email {signup.name.split(" ")[0]}
            </a>
          </div>
        </div>
      )}
    </Card>
  )
}

export default function CoachDashboardPage() {
  const router = useRouter()
  const [signups, setSignups] = useState<Signup[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all")
  const [authError, setAuthError] = useState(false)

  const fetchSignups = useCallback(async () => {
    try {
      const res = await fetch("/api/coach/signups")
      if (res.status === 401) {
        setAuthError(true)
        router.push("/coach/login")
        return
      }
      const data = await res.json()
      setSignups(data)
    } catch (err) {
      console.error("Failed to fetch signups:", err)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchSignups()
  }, [fetchSignups])

  const handleUpdate = async (id: string, updates: Partial<Signup>) => {
    const res = await fetch("/api/coach/signups", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    })
    if (res.ok) {
      const updated = await res.json()
      setSignups((prev) => prev.map((s) => (s.id === id ? updated : s)))
    }
  }

  const handleLogout = async () => {
    await fetch("/api/coach/login", { method: "DELETE" })
    router.push("/coach/login")
  }

  const filtered =
    filterStatus === "all"
      ? signups
      : signups.filter((s) => s.status === filterStatus)

  const counts = {
    all: signups.length,
    new: signups.filter((s) => s.status === "new").length,
    contacted: signups.filter((s) => s.status === "contacted").length,
    onboarded: signups.filter((s) => s.status === "onboarded").length,
    declined: signups.filter((s) => s.status === "declined").length,
  }

  if (authError) {
    return null // redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-semibold text-white text-sm">Tyler Wilks Running</span>
              <p className="text-xs text-gray-500">Coaching Inquiries</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="h-3.5 w-3.5 mr-1.5" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="bg-gray-900/60 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-400">Total</span>
              </div>
              <p className="text-2xl font-bold text-white">{counts.all}</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-blue-400">New</span>
              </div>
              <p className="text-2xl font-bold text-white">{counts.new}</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-xs text-green-400">Onboarded</span>
              </div>
              <p className="text-2xl font-bold text-white">{counts.onboarded}</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <PhoneCall className="h-4 w-4 text-yellow-400" />
                <span className="text-xs text-yellow-400">Contacted</span>
              </div>
              <p className="text-2xl font-bold text-white">{counts.contacted}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter tabs */}
        <Card className="bg-gray-900/60 border-white/10">
          <CardHeader className="pb-0 pt-4 px-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-base text-white">Inquiries</CardTitle>
              <div className="flex gap-1 flex-wrap">
                {(["all", "new", "contacted", "onboarded", "declined"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      filterStatus === s
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}{" "}
                    <span className="opacity-60">
                      ({s === "all" ? counts.all : counts[s as Status]})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <Users className="h-8 w-8 text-gray-700 mx-auto" />
                <p className="text-gray-500 text-sm">
                  {filterStatus === "all"
                    ? "No inquiries yet. Share your sign-up link to get started."
                    : `No ${filterStatus} inquiries.`}
                </p>
                {filterStatus === "all" && (
                  <p className="text-xs text-gray-600 font-mono bg-gray-900 px-3 py-1.5 rounded inline-block">
                    /signup
                  </p>
                )}
              </div>
            ) : (
              filtered.map((signup) => (
                <SignupCard key={signup.id} signup={signup} onUpdate={handleUpdate} />
              ))
            )}
          </CardContent>
        </Card>

        {/* Share link */}
        <Card className="bg-gray-900/40 border-white/5">
          <CardContent className="p-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-medium text-white">Share your sign-up form</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Send this link to potential clients
              </p>
            </div>
            <code className="text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg">
              tylerwilksrunning.com/signup
            </code>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
