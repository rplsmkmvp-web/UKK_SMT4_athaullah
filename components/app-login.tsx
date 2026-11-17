"use client"

import { useActionState } from "react"
import Link from "next/link"
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginAction } from "@/app/actions/auth"

export function SplitLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {})

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_25%,#4f46e5_0,transparent_38%),radial-gradient(circle_at_80%_80%,#0ea5e9_0,transparent_32%)]" />
        <Link href="/" className="relative z-10 flex w-fit items-center gap-3 font-semibold">
          <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">U</span>
          UKK
        </Link>
        <div className="relative z-10 max-w-lg pb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-indigo-200">Portal UKK</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">Selamat datang kembali.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
            Masuk untuk melanjutkan ke panel administrasi dan mengelola data.
          </p>
        </div>
        <p className="relative z-10 text-xs text-slate-400">© UKK</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900">
            <ArrowLeft className="size-4" />
            Kembali ke beranda
          </Link>
          <div className="mb-8">
            <p className="text-sm font-medium text-indigo-600">Portal UKK</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Masuk akun</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Masukkan email dan kata sandi untuk melanjutkan.</p>
          </div>

          <form action={formAction} className="space-y-5">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Email
              <span className="relative block">
                <Mail aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  required
                  className="h-11 pl-10"
                />
              </span>
            </label>
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Kata sandi
              <span className="relative block">
                <LockKeyhole aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Masukkan kata sandi"
                  minLength={8}
                  required
                  className="h-11 pl-10"
                />
              </span>
            </label>
            <Button type="submit" disabled={pending} className="h-11 w-full bg-indigo-600 text-white hover:bg-indigo-700">
              {pending ? "Memeriksa..." : "Masuk"}
            </Button>
            {state.message && (
              <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm leading-5 text-amber-900">
                {state.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}
