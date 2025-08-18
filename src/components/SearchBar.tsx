
import { Input } from './ui/input'
import { FiSearch } from 'react-icons/fi'

type Props = {
  value: string
  onChange: (v: string) => void
}
export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
      <Input
        placeholder="Search…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}
