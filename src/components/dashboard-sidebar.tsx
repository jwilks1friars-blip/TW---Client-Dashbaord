"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Calendar, 
  Activity, 
  TrendingUp, 
  FileText, 
  Settings,
  LogOut
} from "lucide-react"
import { getAuthenticatedClient, clearAuthenticatedClient } from "@/lib/auth"

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    url: "#",
  },
  {
    title: "Schedule",
    icon: Calendar,
    url: "#",
  },
  {
    title: "Workouts",
    icon: Activity,
    url: "#",
  },
  {
    title: "Progress",
    icon: TrendingUp,
    url: "#",
  },
  {
    title: "Notes",
    icon: FileText,
    url: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#",
  },
]

export function DashboardSidebar() {
  const router = useRouter()
  const [client, setClient] = useState<{ id: string; name: string } | null>(null)

  useEffect(() => {
    const authenticatedClient = getAuthenticatedClient()
    setClient(authenticatedClient)
  }, [])

  const handleLogout = () => {
    clearAuthenticatedClient()
    router.push("/login")
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">TW</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Tyler Wilks</span>
            <span className="text-xs text-muted-foreground">Running</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="text-xs font-semibold">
              {client?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "CN"}
            </span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium truncate">
              {client?.name || "Client Name"}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {client?.id || "client@example.com"}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

