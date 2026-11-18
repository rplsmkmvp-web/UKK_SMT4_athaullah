"use client"

import { useActionState } from "react"
import Link from "next/link"
import { registerAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, {})
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
    <section className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">← Kembali ke beranda</Link>
      <p className="mt-8 text-sm font-medium text-indigo-600">Portal UKK</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Daftar admin</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">Buat akun admin pertama untuk mulai mengelola data.</p>
      <form action={action} className="mt-7 space-y-5">
        <label className="block space-y-2 text-sm font-medium">Email<Input className="h-11" name="email" type="email" autoComplete="email" required placeholder="nama@email.com" /></label>
        <label className="block space-y-2 text-sm font-medium">Kata sandi<Input className="h-11" name="password" type="password" autoComplete="new-password" minLength={8} required placeholder="Minimal 8 karakter" /></label>
        <Button disabled={pending} className="h-11 w-full bg-indigo-600 text-white hover:bg-indigo-700">{pending ? "Membuat akun..." : "Daftar"}</Button>
        {state.message && <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">{state.message}</p>}
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Sudah punya akun? <Link className="font-medium text-indigo-600 hover:underline" href="/login">Masuk</Link></p>
    </section>
  </main>
}
