import "server-only"

import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "@/generated/prisma/client"

const globalForPrisma = globalThis as typeof globalThis & {
  prismaClient?: PrismaClient
}

function createPrismaClient() {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST ?? "127.0.0.1",
    port: Number(process.env.DATABASE_PORT ?? "3306"),
    user: process.env.DATABASE_USER ?? "root",
    password: process.env.DATABASE_PASSWORD ?? "",
    database: process.env.DATABASE_NAME ?? "db_mts3_athaullah",
    connectionLimit: 5,
  })

  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prismaClient ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaClient = prisma
}
