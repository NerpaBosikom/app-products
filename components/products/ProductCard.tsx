
"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { useStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const toggle = useStore(s => s.toggleFavorite);
  const remove = useStore(s => s.removeProduct);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Card className="overflow-hidden">
        <div className="relative">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            priority={false}
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => toggle(product.id)}
              aria-label="like"
              className="rounded-full p-2 bg-white/90 hover:bg-white shadow"
            >
              <Heart className={`h-5 w-5 ${product.favorite ? "fill-brand-600 text-brand-600" : ""}`} />
            </button>
            <button
              onClick={() => remove(product.id)}
              aria-label="delete"
              className="rounded-full p-2 bg-white/90 hover:bg-white shadow"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <CardContent>
          <Link href={`/products/${product.id}`} className="block group">
            <h3 className="font-semibold group-hover:text-brand-700 transition clamp-1">{product.title}</h3>
            <p className="mt-1 text-sm text-gray-600 clamp-3">{product.description}</p>
            <p className="mt-3 font-semibold">€ {product.price}</p>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
