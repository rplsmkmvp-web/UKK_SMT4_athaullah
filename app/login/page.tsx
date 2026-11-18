import { Suspense } from "react"
import { SplitLoginForm } from "@/components/app-login"
import { RegisterForm } from "@/components/app-register"

export default function LoginPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  return <Suspense fallback={<div className="min-h-screen bg-white" />}>
    <LoginContent searchParams={searchParams} />
  </Suspense>
}

async function LoginContent({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const { mode } = await searchParams
  return mode === "register" ? <RegisterForm /> : <SplitLoginForm />
}
