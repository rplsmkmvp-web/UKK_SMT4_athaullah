import Link from "next/link"
import { LayoutDashboard, ListOrdered, Package } from "lucide-react"

export function NavbarMenu() {
  return (
    <nav
      aria-label="Navigasi data admin"
      className="flex min-h-14 items-center gap-2 overflow-x-auto rounded-xl border bg-card px-3 py-2"
    >
      <Link
        href="/admin"
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <LayoutDashboard className="size-4" />
        Dashboard
      </Link>
      <span aria-hidden="true" className="h-6 w-px shrink-0 bg-border" />
      <Link
        href="/admin/crud"
        aria-current="page"
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
      >
        <ListOrdered className="size-4" />
        Data user
      </Link>
      <Link href="/admin/produk" className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Package className="size-4" />Data produk</Link>
    </nav>
  )
}
