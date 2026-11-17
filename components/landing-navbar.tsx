import Link from "next/link"

const links = [
  { label: "Fitur", href: "/admin/crud" },
  { label: "Layanan", href: "/admin/crud" },
  { label: "Informasi", href: "/admin" },
  { label: "Tentang", href: "/admin" },
]

export function LandingNavbar() {
  return (
    <header className="flex min-h-[62px] w-full items-center justify-between gap-6 px-5 sm:px-9">
      <div className="flex min-w-0 items-center gap-8">
        <Link href="/" className="flex w-fit shrink-0 items-center" aria-label="UKK, beranda">
          <svg
            aria-hidden="true"
            viewBox="0 0 40 40"
            className="size-9 shrink-0 drop-shadow-sm"
            fill="none"
          >
            <path d="M20 2.5 37 11.7 20 21 3 11.7 20 2.5Z" fill="#500a2d" />
            <path d="M3 11.7 20 21v17L3 28.7v-17Z" fill="#1687F8" />
            <path d="M37 11.7 20 21v17l17-9.3v-17Z" fill="#0756D9" />
            <path d="M20 21v17M3 11.7 20 21l17-9.3" stroke="white" strokeWidth="1.4" />
          </svg>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-6">
        <Link
          href="/admin"
          className="hidden whitespace-nowrap text-[13px] font-medium text-slate-700 transition-colors hover:text-slate-950 sm:inline-flex"
        >
          Hubungi kami
        </Link>
        <Link
          href="/login"
          className="inline-flex whitespace-nowrap text-[13px] font-medium text-slate-700 transition-colors hover:text-slate-950"
        >
          Masuk
        </Link>
        <Link
          href="/admin/crud"
          className="inline-flex h-[34px] items-center justify-center whitespace-nowrap rounded-[4px] bg-indigo-600 px-3.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Mulai sekarang
        </Link>
      </div>
    </header>
  )
}
