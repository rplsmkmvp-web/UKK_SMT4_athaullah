import { connection } from "next/server"
import { prisma } from "@/lib/prisma"
import { ProductCrud } from "@/components/product-crud"

export default async function ProductPage() {
  await connection()
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } })
  return <ProductCrud products={products.map((product) => ({ ...product, price: Number(product.price), createdAt: product.createdAt.toISOString() }))} />
}
