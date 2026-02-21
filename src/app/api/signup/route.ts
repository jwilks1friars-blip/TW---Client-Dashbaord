import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const DATA_DIR =
  process.env.NODE_ENV === 'production'
    ? '/tmp'
    : path.join(process.cwd(), 'data')

const SIGNUPS_FILE = path.join(DATA_DIR, 'signups.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function readSignups(): SignupEntry[] {
  ensureDataDir()
  if (!fs.existsSync(SIGNUPS_FILE)) {
    return []
  }
  const content = fs.readFileSync(SIGNUPS_FILE, 'utf-8')
  return JSON.parse(content)
}

export function writeSignups(signups: SignupEntry[]) {
  ensureDataDir()
  fs.writeFileSync(SIGNUPS_FILE, JSON.stringify(signups, null, 2))
}

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

function buildEmailHtml(entry: SignupEntry): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: sans-serif; background: #111; color: #eee; padding: 32px;">
      <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; padding: 32px; border: 1px solid #333;">
        <h1 style="color: #3b82f6; margin-top: 0;">New Coaching Inquiry</h1>
        <p style="color: #aaa; margin-bottom: 24px;">Someone filled out your sign-up form on Tyler Wilks Running.</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #aaa; width: 160px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${entry.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #aaa;">Email</td><td style="padding: 8px 0;"><a href="mailto:${entry.email}" style="color: #3b82f6;">${entry.email}</a></td></tr>
          ${entry.phone ? `<tr><td style="padding: 8px 0; color: #aaa;">Phone</td><td style="padding: 8px 0;">${entry.phone}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #aaa;">Program</td><td style="padding: 8px 0;">${entry.programInterest}</td></tr>
          <tr><td style="padding: 8px 0; color: #aaa;">Experience</td><td style="padding: 8px 0;">${entry.experienceLevel}</td></tr>
          <tr><td style="padding: 8px 0; color: #aaa;">Weekly Mileage</td><td style="padding: 8px 0;">${entry.weeklyMileage}</td></tr>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #222; border-radius: 8px; border-left: 3px solid #3b82f6;">
          <p style="margin: 0 0 4px; color: #aaa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Goals</p>
          <p style="margin: 0;">${entry.goals}</p>
        </div>

        ${entry.availability ? `
        <div style="margin-top: 12px; padding: 16px; background: #222; border-radius: 8px; border-left: 3px solid #10b981;">
          <p style="margin: 0 0 4px; color: #aaa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Availability</p>
          <p style="margin: 0;">${entry.availability}</p>
        </div>` : ''}

        <p style="margin-top: 24px; font-size: 12px; color: #555;">Submitted ${new Date(entry.createdAt).toLocaleString()}</p>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      experienceLevel,
      programInterest,
      weeklyMileage,
      goals,
      availability,
    } = body

    if (!name || !email || !programInterest || !goals) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const newSignup: SignupEntry = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      status: 'new',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      experienceLevel: experienceLevel || '',
      programInterest: programInterest || '',
      weeklyMileage: weeklyMileage || '',
      goals: goals.trim(),
      availability: (availability || '').trim(),
      coachNotes: '',
    }

    const signups = readSignups()
    signups.push(newSignup)
    writeSignups(signups)

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Tyler Wilks Running <notifications@tylerwilksrunning.com>',
            to: process.env.NOTIFICATION_EMAIL,
            subject: `New Coaching Inquiry from ${newSignup.name}`,
            html: buildEmailHtml(newSignup),
          }),
        })
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true, id: newSignup.id })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
