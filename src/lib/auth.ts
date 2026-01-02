"use client"

// Authentication utilities
// Compatible with existing localStorage-based system

export interface Client {
  id: string
  name: string
}

export function getAuthenticatedClient(): Client | null {
  if (typeof window === "undefined") return null

  const client = sessionStorage.getItem("authenticatedClient")
  if (!client) return null

  try {
    return JSON.parse(client)
  } catch {
    return null
  }
}

export function setAuthenticatedClient(client: Client) {
  if (typeof window === "undefined") return
  sessionStorage.setItem("authenticatedClient", JSON.stringify(client))
}

export function clearAuthenticatedClient() {
  if (typeof window === "undefined") return
  sessionStorage.removeItem("authenticatedClient")
}

export function isAuthenticated(): boolean {
  return getAuthenticatedClient() !== null
}

