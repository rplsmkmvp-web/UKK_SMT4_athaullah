import { LandingNavbar } from "@/components/landing-navbar"
import { SplineBackground } from "@/components/spline-background"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-[14px]">
      <div className="relative min-h-[calc(100vh-28px)] overflow-hidden rounded-[10px] border border-slate-200 bg-white">
        {/* <SplineBackground
          sceneUrl="https://my.spline.design/bannerfortransportlogisticsoptitranslog-jSB2qZb3viqkZkuyzFmCZyht/"
        /> */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-white/35" />
        <div className="relative z-10">
          <LandingNavbar />
          <section className="flex flex-col items-center justify-center h-screen">
            <h1 className="max-w-[700px] text-[clamp(3.25rem,7vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-slate-800">
              <span className="block">Website Bulan,</span>
              <span className="block">melampaui</span>
              <span className="block">ekspektasi</span>
            </h1>
            <p className="mt-6 max-w-[510px] text-lg leading-[1.35] text-slate-500 sm:text-[21px]">
              Bangun website yang menarik dan wujudkan
              <br className="hidden sm:block" /> lebih dari yang Anda harapkan.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm">
              <Link
                href="/admin/crud"
                className="inline-flex h-9 items-center justify-center rounded-[4px] bg-indigo-600 px-4 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Mulai sekarang
              </Link>
              <span className="text-slate-500">atau</span>
              <Link
                href="/admin"
                className="inline-flex h-9 items-center justify-center rounded-[4px] border border-slate-300 bg-white px-3.5 font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Dashboard
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
