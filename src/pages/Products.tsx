import { useEffect, useMemo, useState } from "react";
import { useProductsStore } from "../store/products";
import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";
import { SearchBar } from "../components/SearchBar";
import { FiltersBar } from "../components/FiltersBar";
import { motion } from "framer-motion";

const PAGE_SIZE = 12;

export function Products() {
  const { products, fetchAll, likes, loading, error } = useProductsStore();
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    setPage(1);
  }, [showOnlyLiked, query]);

  const filtered = useMemo(() => {
    let list = products;

    if (showOnlyLiked) {
      list = list.filter((p) => likes.has(p.id));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [products, likes, showOnlyLiked, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getCounterText = () => {
    if (filtered.length === 0) return "Нет товаров";

    const count = filtered.length;
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${count} товаров`;
    }

    if (lastDigit === 1) return `${count} товар`;
    if (lastDigit >= 2 && lastDigit <= 4) return `${count} товара`;
    return `${count} товаров`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent">
          Каталог товаров
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-violet-600 font-medium">
            <span className="bg-violet-100 px-3 py-1 rounded-full text-violet-700">
              {getCounterText()}
              {showOnlyLiked && " в избранном"}
              {query && " найдено"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-violet-100">
        <SearchBar value={query} onChange={setQuery} />
        <FiltersBar
          showOnlyLiked={showOnlyLiked}
          onToggleLiked={() => setShowOnlyLiked((v) => !v)}
        />
      </div>

      {loading && (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-violet-700 font-medium">Загружаем товары...</p>
          <p className="text-violet-500 text-sm mt-1">Пожалуйста, подождите</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-500 text-4xl mb-3">⚠️</div>
          <p className="text-red-700 font-medium text-lg mb-2">
            Ошибка загрузки
          </p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 bg-white/60 rounded-2xl border border-violet-100 shadow-sm">
          <div className="text-violet-300 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-violet-800 mb-3">
            {showOnlyLiked ? "Нет избранных товаров" : "Товары не найдены"}
          </h3>
          <p className="text-violet-600 max-w-md mx-auto">
            {showOnlyLiked
              ? "Добавьте товары в избранное, чтобы увидеть их здесь"
              : query
              ? "Попробуйте изменить поисковый запрос или сбросить фильтры"
              : "Добавьте первый товар через меню выше"}
          </p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <>
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {current.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                description={p.description}
                price={p.price}
                thumbnail={p.thumbnail}
              />
            ))}
          </motion.div>

          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          )}
        </>
      )}
    </div>
  );
}
