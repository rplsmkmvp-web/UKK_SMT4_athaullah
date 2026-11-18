"use client"

import { useState, type FormEvent } from "react"
import { Pencil, Plus, Trash2, X } from "lucide-react"
import { deleteUserAction, saveUserAction } from "@/app/actions/auth"
import { NavbarMenu } from "@/components/NavbarMenu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type UserRow = { id: number; email: string; role: string; createdAt: string }
type UserForm = { email: string; password: string; role: "admin" | "user" }
const emptyForm: UserForm = { email: "", password: "", role: "user" }

export function AppCrud({ users: initialUsers }: { users: UserRow[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [form, setForm] = useState<UserForm>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  function startCreate() { setEditingId(null); setForm(emptyForm); setError(""); setFormOpen(true) }
  function startEdit(user: UserRow) { setEditingId(user.id); setForm({ email: user.email, password: "", role: user.role === "admin" ? "admin" : "user" }); setError(""); setFormOpen(true) }
  async function saveUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("")
    try {
      await saveUserAction(editingId, form)
      window.location.reload()
    } catch { setError("User gagal disimpan. Periksa email, kata sandi, dan pastikan email belum dipakai.") }
    finally { setPending(false) }
  }
  async function deleteUser(user: UserRow) {
    if (!window.confirm(`Hapus user ${user.email}?`)) return
    setError("")
    try { await deleteUserAction(user.id); setUsers((current) => current.filter((item) => item.id !== user.id)) }
    catch { setError("User gagal dihapus. Admin terakhir tidak bisa dihapus.") }
  }

  return <div className="space-y-4">
    <NavbarMenu />
    <div className="flex items-center justify-between gap-3"><div><h1 className="text-2xl font-semibold">Data User</h1><p className="text-sm text-muted-foreground">Kelola akun yang tersimpan di database.</p></div><Button type="button" onClick={startCreate}><Plus className="mr-2 size-4" />Tambah user</Button></div>
    {error && !formOpen && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-b bg-muted/40 text-muted-foreground"><tr><th className="px-4 py-3 font-medium">Email</th><th className="px-4 py-3 font-medium">Role</th><th className="px-4 py-3 font-medium">Dibuat</th><th className="px-4 py-3 text-right font-medium">Aksi</th></tr></thead>
        <tbody className="divide-y">{users.length ? users.map((user) => <tr key={user.id}><td className="px-4 py-3 font-medium">{user.email}</td><td className="px-4 py-3"><span className="rounded-full bg-muted px-2.5 py-1 text-xs">{user.role}</span></td><td className="px-4 py-3 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString("id-ID")}</td><td className="px-4 py-3"><div className="flex justify-end gap-1"><Button type="button" variant="ghost" size="icon-sm" aria-label={`Edit ${user.email}`} onClick={() => startEdit(user)}><Pencil /></Button><Button type="button" variant="ghost" size="icon-sm" aria-label={`Hapus ${user.email}`} onClick={() => void deleteUser(user)}><Trash2 /></Button></div></td></tr>) : <tr><td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">Belum ada data user.</td></tr>}</tbody>
      </table></div>
    </div>
    {formOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false) }}>
      <section role="dialog" aria-modal="true" aria-labelledby="user-dialog-title" className="w-full max-w-lg rounded-2xl border bg-background p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between"><div><h2 id="user-dialog-title" className="text-xl font-semibold">{editingId ? "Edit user" : "Tambah user"}</h2><p className="mt-1 text-sm text-muted-foreground">{editingId ? "Kosongkan kata sandi jika tidak ingin mengubahnya." : "Masukkan detail akun baru."}</p></div><Button type="button" variant="ghost" size="icon-sm" aria-label="Tutup" onClick={() => setFormOpen(false)}><X /></Button></div>
        <form onSubmit={saveUser} className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium">Email<Input type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required placeholder="nama@email.com" /></label>
          <label className="block space-y-1.5 text-sm font-medium">Kata sandi<Input type="password" autoComplete={editingId ? "new-password" : "new-password"} minLength={8} required={!editingId} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder={editingId ? "Kosongkan jika tidak diubah" : "Minimal 8 karakter"} /></label>
          <label className="block space-y-1.5 text-sm font-medium">Role<select className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value as UserForm["role"] })}><option value="user">User</option><option value="admin">Admin</option></select></label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="outline" onClick={() => setFormOpen(false)}>Batal</Button><Button disabled={pending} type="submit">{pending ? "Menyimpan..." : editingId ? "Simpan perubahan" : "Tambah user"}</Button></div>
        </form>
      </section>
    </div>}
  </div>
}
