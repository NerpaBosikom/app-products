
import { useEffect, useMemo, useState } from 'react'
import { useProductsStore } from '../store/products'
import { ProductCard } from '../components/ProductCard'
import { Pagination } from '../components/Pagination'
import { SearchBar } from '../components/SearchBar'
import { FiltersBar } from '../components/FiltersBar'
import { motion } from 'framer-motion'

const PAGE_SIZE = 12

export function Products() {
  const { products, fetchAll, likes, loading, error } = useProductsStore()
  const [showOnlyLiked, setShowOnlyLiked] = useState(false)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => { fetchAll() }, [fetchAll])
  useEffect(() => { setPage(1) }, [showOnlyLiked, query])

  const filtered = useMemo(() => {
    let list = products
    if (showOnlyLiked) list = list.filter(p => likes.has(p.id))
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    return list
  }, [products, likes, showOnlyLiked, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <SearchBar value={query} onChange={setQuery} />
        <FiltersBar showOnlyLiked={showOnlyLiked} onToggleLiked={()=>setShowOnlyLiked(v=>!v)} />
      </div>

      {loading && <p className="text-slate-600">Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {current.map(p => (
          <ProductCard key={p.id} id={p.id} title={p.title} description={p.description} price={p.price} thumbnail={p.thumbnail} />
        ))}
      </motion.div>

      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  )
}
