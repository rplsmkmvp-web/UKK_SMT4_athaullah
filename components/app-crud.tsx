"use client"

import { useState, type FormEvent } from "react"
import { initialOrders, Pattern as AppTabel, type IOrder } from "@/components/app-tabel"
import { NavbarMenu } from "@/components/NavbarMenu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type OrderForm = Pick<IOrder, "reference" | "customer" | "city" | "status" | "total">

const emptyForm: OrderForm = {
  reference: "",
  customer: "",
  city: "",
  status: "processing",
  total: 0,
}

export function AppCrud() {
  const [orders, setOrders] = useState<IOrder[]>(initialOrders)
  const [form, setForm] = useState<OrderForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  function startCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setFormOpen(true)
  }

  function startEdit(order: IOrder) {
    setEditingId(order.id)
    setForm({
      reference: order.reference,
      customer: order.customer,
      city: order.city,
      status: order.status,
      total: order.total,
    })
    setFormOpen(true)
  }

  function saveOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (editingId) {
      setOrders((current) => current.map((order) =>
        order.id === editingId ? { ...order, ...form } : order,
      ))
    } else {
      const initials = form.customer
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
      setOrders((current) => [
        ...current,
        {
          ...form,
          id: `order-${Date.now()}`,
          avatar: "",
          initials,
        },
      ])
    }
    setFormOpen(false)
    setEditingId(null)
  }

  function deleteOrder(id: string) {
    setOrders((current) => current.filter((order) => order.id !== id))
  }

  return (
    <div className="space-y-4">
      <NavbarMenu />
      <div className="flex justify-end">
        <Button type="button" onClick={startCreate}>Tambah data</Button>
      </div>

      {formOpen && (
        <form onSubmit={saveOrder} className="grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            aria-label="Nomor pesanan"
            placeholder="Nomor pesanan"
            value={form.reference}
            onChange={(event) => setForm({ ...form, reference: event.target.value })}
            required
          />
          <Input
            aria-label="Nama pelanggan"
            placeholder="Nama pelanggan"
            value={form.customer}
            onChange={(event) => setForm({ ...form, customer: event.target.value })}
            required
          />
          <Input
            aria-label="Kota"
            placeholder="Kota"
            value={form.city}
            onChange={(event) => setForm({ ...form, city: event.target.value })}
            required
          />
          <select
            aria-label="Status"
            className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm"
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value as IOrder["status"] })}
          >
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
          </select>
          <Input
            aria-label="Total"
            placeholder="Total"
            type="number"
            min="0"
            step="0.01"
            value={form.total}
            onChange={(event) => setForm({ ...form, total: Number(event.target.value) })}
            required
          />
          <div className="flex gap-2">
            <Button type="submit">{editingId ? "Simpan perubahan" : "Simpan"}</Button>
            <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>Batal</Button>
          </div>
        </form>
      )}

      <div id="data-pesanan">
        <AppTabel orders={orders} onEdit={startEdit} onDelete={deleteOrder} />
      </div>
    </div>
  )
}
