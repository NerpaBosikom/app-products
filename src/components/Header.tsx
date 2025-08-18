
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiPackage, FiPlus } from 'react-icons/fi'

export function Header() {
  const location = useLocation()
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-violet-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/products" className="flex items-center gap-2 font-semibold text-violet-700">
          <FiPackage />
          Products
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/products" className={({isActive}) => isActive ? 'text-violet-700 font-medium' : 'text-slate-600 hover:text-violet-700'}>All</NavLink>
          <NavLink to="/create-product" className={({isActive}) => isActive ? 'text-violet-700 font-medium' : 'text-slate-600 hover:text-violet-700'}>
            <span className="inline-flex items-center gap-1"><FiPlus/>Create</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
