import { connection } from "next/server"
import { AppCrud } from "@/components/app-crud"
import { prisma } from "@/lib/prisma"

export default async function CrudPage() {
  await connection()
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, email: true, role: true, createdAt: true } })
  return <AppCrud users={users.map((user) => ({ ...user, createdAt: user.createdAt.toISOString() }))} />
}
