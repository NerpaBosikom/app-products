
import Image from "next/image";
import Link from "next/link";

type Params = { id: string };

export const dynamic = "force-static";

export async function generateStaticParams() {
  // Build-time fetch to know which IDs to export
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  return (data.products || []).map((p: any) => ({ id: String(p.id) }));
}

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = await getProduct(params.id);
  if (!product) {
    return <div className="p-6">Товар не найден</div>;
  }
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div className="rounded-2xl overflow-hidden border border-brand-100/80 bg-white/80">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={800}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-xl font-semibold">€ {product.price}</p>

        <Link href="/products" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-600 text-white hover:bg-brand-700">
          ← На главную
        </Link>
      </div>
    </section>
  );
}
