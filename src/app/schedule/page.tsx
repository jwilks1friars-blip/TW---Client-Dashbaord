"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { getAuthenticatedClient } from "@/lib/auth"

export default function SchedulePage() {
  const router = useRouter()

  useEffect(() => {
    const client = getAuthenticatedClient()
    if (!client) {
      router.push("/login")
    }
  }, [router])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Training Schedule</h1>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Week
              </Button>
              <h2 className="text-xl font-semibold">This Week</h2>
              <Button variant="outline" size="sm">
                Next Week
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Schedule
                </CardTitle>
                <CardDescription>Your training plan for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {[
                    { day: 'Sun', date: 'Jan 5', workouts: [] },
                    { day: 'Mon', date: 'Jan 6', workouts: [] },
                    { day: 'Tue', date: 'Jan 7', workouts: [] },
                    { day: 'Wed', date: 'Jan 8', workouts: [] },
                    { day: 'Thu', date: 'Jan 9', workouts: [] },
                    { day: 'Fri', date: 'Jan 10', workouts: [] },
                    { day: 'Sat', date: 'Jan 11', workouts: [] },
                  ].map((dayData) => (
                    <div key={dayData.day} className="border rounded-lg p-4 min-h-[120px]">
                      <div className="font-semibold text-sm mb-2">
                        {dayData.day}
                        <div className="text-xs text-muted-foreground">{dayData.date}</div>
                      </div>
                      <div className="space-y-2">
                        {dayData.workouts.length === 0 ? (
                          <div className="text-xs text-muted-foreground">Rest day</div>
                        ) : (
                          dayData.workouts.map((workout, index) => (
                            <div key={index} className="text-xs bg-primary/10 rounded p-2">
                              {workout}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Notes</CardTitle>
                <CardDescription>Coach instructions and reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center py-8">
                  No training notes for this week
                </p>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
