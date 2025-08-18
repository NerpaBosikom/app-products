
type Props = {
  page: number
  totalPages: number
  onPage: (p: number) => void
}
export function Pagination({ page, totalPages, onPage }: Props) {
  if (totalPages <= 1) return null
  const prev = () => onPage(Math.max(1, page - 1))
  const next = () => onPage(Math.min(totalPages, page + 1))
  const pages = Array.from({length: totalPages}, (_,i)=>i+1).slice(0,10)
  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      <button onClick={prev} className="px-3 py-1 rounded border border-violet-300">{'<'}</button>
      {pages.map(p => (
        <button key={p} onClick={()=>onPage(p)} className={`px-3 py-1 rounded border ${p===page?'bg-violet-600 text-white border-violet-600':'border-violet-300'}`}>{p}</button>
      ))}
      <button onClick={next} className="px-3 py-1 rounded border border-violet-300">{'>'}</button>
    </div>
  )
}
