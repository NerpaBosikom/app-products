
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, PlusCircle, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/products" className="flex items-center gap-2 font-semibold">
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center gap-2"
          >
            <ShoppingBag className="h-5 w-5" />
            Products
          </motion.span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/products"
            className="px-3 py-2 rounded-xl hover:bg-brand-100/60 transition"
          >
            Список
          </Link>
          <Link
            href="/create-product"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-brand-100/60 transition"
          >
            <PlusCircle className="h-4 w-4" />
            Создать
          </Link>
          <Link
            href="/products?favorite=1"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-brand-100/60 transition"
          >
            <Search className="h-4 w-4" />
            Избранное
          </Link>
        </nav>
      </div>
    </header>
  );
}
