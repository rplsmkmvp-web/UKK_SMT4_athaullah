"use server"

import { createAdminSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export type LoginState = { message?: string }

export async function loginAction(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (!process.env.ADMIN_SESSION_SECRET) {
    return { message: "Konfigurasi sesi admin belum tersedia di file .env." }
  }

  let user: { passwordHash: string; role: string } | null
  try {
    user = await prisma.user.findUnique({ where: { email } })
  } catch {
    return { message: "Database belum dapat dihubungi. Periksa URL dan port MySQL." }
  }

  if (!user || !(await bcrypt.compare(password, user.passwordHash)) || user.role !== "admin") {
    return { message: "Email atau kata sandi salah." }
  }

  await createAdminSession()
  redirect("/admin")
}
