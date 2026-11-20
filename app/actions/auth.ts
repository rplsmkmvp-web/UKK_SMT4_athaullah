"use server"

import { createAdminSession, hasAdminSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export type LoginState = { message?: string }

export async function registerAction(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  if (!email || password.length < 8) return { message: "Isi email dan kata sandi minimal 8 karakter." }
  if (!process.env.ADMIN_SESSION_SECRET) return { message: "Konfigurasi sesi admin belum tersedia di file .env." }

  try {
    const existing = await prisma.user.count()
    if (existing > 0) return { message: "Registrasi admin sudah ditutup. Silakan masuk dengan akun yang tersedia." }
    const passwordHash = await bcrypt.hash(password, 12)
    await prisma.user.create({ data: { email, passwordHash, role: "admin" } })
  } catch {
    return { message: "Registrasi gagal. Pastikan database aktif dan email belum digunakan." }
  }
  await createAdminSession()
  redirect("/admin")
}

export async function loginAction(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (!process.env.ADMIN_SESSION_SECRET) {
    return { message: "Konfigurasi sesi admin belum tersedia di file .env." }
  }

  let user: { passwordHash: string; role: string } | null
  try {
    user = await prisma.user.findUnique({ where: { email } })
  } catch (error) {
    console.error("[login] Database query failed", error instanceof Error ? { name: error.name, message: error.message } : error)
    return { message: "Database belum dapat dihubungi. Periksa URL dan port MySQL." }
  }

  if (!user || !(await bcrypt.compare(password, user.passwordHash)) || user.role !== "admin") {
    return { message: "Email atau kata sandi salah." }
  }

  await createAdminSession()
  redirect("/admin")
}

export type OrderInput = { reference: string; customer: string; city: string; status: "processing" | "shipped"; total: number }

export async function saveOrderAction(id: number | null, input: OrderInput) {
  if (!(await hasAdminSession())) throw new Error("Sesi admin tidak valid.")
  const data = { reference: input.reference.trim(), customer: input.customer.trim(), city: input.city.trim(), status: input.status, total: input.total }
  if (!data.reference || !data.customer || !data.city || !Number.isFinite(data.total) || data.total < 0) throw new Error("Data pesanan tidak valid.")
  if (id) await prisma.order.update({ where: { id }, data })
  else await prisma.order.create({ data })
  revalidatePath("/admin/crud")
}

export async function deleteOrderAction(id: number) {
  if (!(await hasAdminSession())) throw new Error("Sesi admin tidak valid.")
  await prisma.order.delete({ where: { id } })
  revalidatePath("/admin/crud")
}

export type UserInput = { email: string; password: string; role: "admin" | "user" }

export async function saveUserAction(id: number | null, input: UserInput) {
  if (!(await hasAdminSession())) throw new Error("Sesi admin tidak valid.")
  const email = input.email.trim().toLowerCase()
  if (!email || !email.includes("@")) throw new Error("Email tidak valid.")
  if (!id && input.password.length < 8) throw new Error("Kata sandi minimal 8 karakter.")
  if (id && input.password && input.password.length < 8) throw new Error("Kata sandi minimal 8 karakter.")

  const data = { email, role: input.role }
  if (id) {
    await prisma.user.update({ where: { id }, data: input.password ? { ...data, passwordHash: await bcrypt.hash(input.password, 12) } : data })
  } else {
    await prisma.user.create({ data: { ...data, passwordHash: await bcrypt.hash(input.password, 12) } })
  }
  revalidatePath("/admin/crud")
}

export async function deleteUserAction(id: number) {
  if (!(await hasAdminSession())) throw new Error("Sesi admin tidak valid.")
  const user = await prisma.user.findUnique({ where: { id }, select: { role: true } })
  if (!user) return
  if (user.role === "admin" && await prisma.user.count({ where: { role: "admin" } }) <= 1) {
    throw new Error("Admin terakhir tidak dapat dihapus.")
  }
  await prisma.user.delete({ where: { id } })
  revalidatePath("/admin/crud")
}

export type ProductInput = { name: string; category: string; stock: number; price: number }

export async function saveProductAction(id: number | null, input: ProductInput) {
  if (!(await hasAdminSession())) throw new Error("Sesi admin tidak valid.")
  const data = { name: input.name.trim(), category: input.category.trim(), stock: input.stock, price: input.price }
  if (!data.name || !data.category || !Number.isInteger(data.stock) || data.stock < 0 || !Number.isFinite(data.price) || data.price < 0) throw new Error("Data produk tidak valid.")
  if (id) await prisma.product.update({ where: { id }, data })
  else await prisma.product.create({ data })
  revalidatePath("/admin/produk")
}

export async function deleteProductAction(id: number) {
  if (!(await hasAdminSession())) throw new Error("Sesi admin tidak valid.")
  await prisma.product.delete({ where: { id } })
  revalidatePath("/admin/produk")
}
