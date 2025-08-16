
"use client";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProductsGrid() {
  const { products, loading, error, fetchProducts, query, updateQuery, filter, setFilter, page, setPage, pageSize } =
    useStore();

  const params = useSearchParams();
  useEffect(() => {
    fetchProducts();
    const fav = params.get("favorite");
    if (fav) setFilter("favorite");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products
      .filter((p) => p.title !== "__deleted__")
      .filter((p) => (filter === "favorite" ? p.favorite : true))
      .filter((p) => (q ? (p.title + " " + p.description).toLowerCase().includes(q) : true));
  }, [products, query, filter]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Поиск..."
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
          />
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            Все
          </Button>
          <Button variant={filter === "favorite" ? "default" : "outline"} onClick={() => setFilter("favorite")}>
            Избранное
          </Button>
        </div>
        <div className="text-sm opacity-80">Найдено: {total}</div>
      </div>

      {loading && <div className="p-8 text-center">Загрузка…</div>}
      {error && <div className="p-8 text-center text-red-600">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button variant="outline" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Назад</Button>
          <span className="px-2">{page} / {pages}</span>
          <Button variant="outline" onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages}>Вперёд</Button>
        </div>
      )}
    </div>
  );
}
