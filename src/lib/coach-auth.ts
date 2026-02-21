import crypto from 'crypto'

const COACH_PASSWORD = process.env.COACH_PASSWORD || 'coach123'
const SESSION_SECRET = process.env.SESSION_SECRET || 'tw-running-secret-2024'

function generateSessionToken(password: string): string {
  return crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(password)
    .digest('hex')
}

export function isValidCoachSession(token: string): boolean {
  const expected = generateSessionToken(COACH_PASSWORD)
  return token === expected
}

export function createSessionToken(): string {
  return generateSessionToken(COACH_PASSWORD)
}
