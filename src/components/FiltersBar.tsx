
type Props = {
  showOnlyLiked: boolean
  onToggleLiked: () => void
}
export function FiltersBar({ showOnlyLiked, onToggleLiked }: Props) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={showOnlyLiked} onChange={onToggleLiked} />
        <span>Favorites only</span>
      </label>
    </div>
  )
}
