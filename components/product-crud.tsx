"use client"

import { useState, type FormEvent } from "react"
import { Pencil, Plus, Trash2, X } from "lucide-react"
import { deleteProductAction, saveProductAction } from "@/app/actions/auth"
import { NavbarMenu } from "@/components/NavbarMenu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Product = { id: number; name: string; category: string; stock: number; price: number; createdAt: string }
type ProductForm = Pick<Product, "name" | "category" | "stock" | "price">
const emptyForm: ProductForm = { name: "", category: "", stock: 0, price: 0 }

export function ProductCrud({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  function startCreate() { setEditingId(null); setForm(emptyForm); setError(""); setFormOpen(true) }
  function startEdit(product: Product) { setEditingId(product.id); setForm({ name: product.name, category: product.category, stock: product.stock, price: product.price }); setError(""); setFormOpen(true) }
  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("")
    try { await saveProductAction(editingId, form); window.location.reload() }
    catch { setError("Produk gagal disimpan. Periksa kembali data yang diisi.") }
    finally { setPending(false) }
  }
  async function deleteProduct(product: Product) {
    if (!window.confirm(`Hapus produk ${product.name}?`)) return
    try { await deleteProductAction(product.id); setProducts((current) => current.filter((item) => item.id !== product.id)) }
    catch { setError("Produk gagal dihapus. Coba muat ulang halaman.") }
  }

  return <div className="space-y-4">
    <NavbarMenu />
    <div className="flex items-center justify-between gap-3"><div><h1 className="text-2xl font-semibold">Data Produk</h1><p className="text-sm text-muted-foreground">Kelola nama, kategori, stok, dan harga produk.</p></div><Button type="button" onClick={startCreate}><Plus className="mr-2 size-4" />Tambah produk</Button></div>
    {error && !formOpen && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <div className="overflow-hidden rounded-xl border bg-card"><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b bg-muted/40 text-muted-foreground"><tr><th className="px-4 py-3 font-medium">Nama produk</th><th className="px-4 py-3 font-medium">Kategori</th><th className="px-4 py-3 font-medium">Stok</th><th className="px-4 py-3 font-medium">Harga</th><th className="px-4 py-3 text-right font-medium">Aksi</th></tr></thead>
      <tbody className="divide-y">{products.length ? products.map((product) => <tr key={product.id}><td className="px-4 py-3 font-medium">{product.name}</td><td className="px-4 py-3">{product.category}</td><td className="px-4 py-3">{product.stock}</td><td className="px-4 py-3">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price)}</td><td className="px-4 py-3"><div className="flex justify-end gap-1"><Button type="button" variant="ghost" size="icon-sm" aria-label={`Edit ${product.name}`} onClick={() => startEdit(product)}><Pencil /></Button><Button type="button" variant="ghost" size="icon-sm" aria-label={`Hapus ${product.name}`} onClick={() => void deleteProduct(product)}><Trash2 /></Button></div></td></tr>) : <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">Belum ada data produk.</td></tr>}</tbody>
    </table></div></div>
    {formOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false) }}><section role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" className="w-full max-w-lg rounded-2xl border bg-background p-6 shadow-xl">
      <div className="mb-5 flex items-start justify-between"><div><h2 id="product-dialog-title" className="text-xl font-semibold">{editingId ? "Edit produk" : "Tambah produk"}</h2><p className="mt-1 text-sm text-muted-foreground">Lengkapi informasi produk berikut.</p></div><Button type="button" variant="ghost" size="icon-sm" aria-label="Tutup" onClick={() => setFormOpen(false)}><X /></Button></div>
      <form onSubmit={saveProduct} className="space-y-4"><label className="block space-y-1.5 text-sm font-medium">Nama produk<Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required placeholder="Nama produk" /></label><label className="block space-y-1.5 text-sm font-medium">Kategori<Input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required placeholder="Kategori" /></label><div className="grid grid-cols-2 gap-3"><label className="block space-y-1.5 text-sm font-medium">Stok<Input type="number" min="0" step="1" value={form.stock} onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })} required /></label><label className="block space-y-1.5 text-sm font-medium">Harga (Rp)<Input type="number" min="0" step="100" value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} required /></label></div>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<div className="flex justify-end gap-2 pt-2"><Button type="button" variant="outline" onClick={() => setFormOpen(false)}>Batal</Button><Button disabled={pending} type="submit">{pending ? "Menyimpan..." : editingId ? "Simpan perubahan" : "Tambah produk"}</Button></div></form>
    </section></div>}
  </div>
}
