
import { ProductsGrid } from "@/components/products/ProductsGrid";

export const dynamic = "force-static";

export default function ProductsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-bold">Список продуктов</h1>
      <ProductsGrid />
    </section>
  );
}
