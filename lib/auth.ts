import "server-only"

import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const SESSION_COOKIE = "ukk_admin_session"
const SESSION_TTL_SECONDS = 60 * 60 * 8

function sessionSignature(expiresAt: string) {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return null
  return createHmac("sha256", secret).update(expiresAt).digest("base64url")
}

function safeEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value)
  const expectedBuffer = Buffer.from(expected)
  return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer)
}

export async function createAdminSession() {
  const expiresAt = String(Date.now() + SESSION_TTL_SECONDS * 1000)
  const signature = sessionSignature(expiresAt)
  if (!signature) throw new Error("ADMIN_SESSION_SECRET is not configured")

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, `${expiresAt}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function hasAdminSession() {
  const value = (await cookies()).get(SESSION_COOKIE)?.value
  if (!value) return false

  const [expiresAt, providedSignature, ...extra] = value.split(".")
  if (!expiresAt || !providedSignature || extra.length || Number(expiresAt) <= Date.now()) return false

  const expectedSignature = sessionSignature(expiresAt)
  return expectedSignature ? safeEqual(providedSignature, expectedSignature) : false
}
 
