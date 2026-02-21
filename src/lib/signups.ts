import fs from 'fs'
import path from 'path'

const DATA_DIR =
  process.env.NODE_ENV === 'production'
    ? '/tmp'
    : path.join(process.cwd(), 'data')

const SIGNUPS_FILE = path.join(DATA_DIR, 'signups.json')

export interface SignupEntry {
  id: string
  createdAt: string
  updatedAt: string
  status: 'new' | 'contacted' | 'onboarded' | 'declined'
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

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function readSignups(): SignupEntry[] {
  ensureDataDir()
  if (!fs.existsSync(SIGNUPS_FILE)) return []
  const content = fs.readFileSync(SIGNUPS_FILE, 'utf-8')
  return JSON.parse(content)
}

export function writeSignups(signups: SignupEntry[]) {
  ensureDataDir()
  fs.writeFileSync(SIGNUPS_FILE, JSON.stringify(signups, null, 2))
}
