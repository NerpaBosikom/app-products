// src/components/Header.tsx
import { Link, NavLink } from "react-router-dom";
import { FiPackage, FiPlus, FiHeart } from "react-icons/fi";
import { useProductsStore } from "../store/products";

export function Header() {
  const likes = useProductsStore((s) => s.likes);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-violet-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/products"
          className="flex items-center gap-2 font-semibold text-violet-700 hover:text-violet-800 transition-colors"
        >
          <div className="p-2 bg-gradient-to-br from-violet-600 to-purple-500 rounded-xl shadow-sm">
            <FiPackage className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent">
            ProductsHub
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/create-product"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? "text-white font-medium bg-gradient-to-br from-violet-600 to-purple-500 shadow-md"
                  : "text-violet-700 hover:bg-violet-100/80 backdrop-blur-sm shadow-sm bg-white/50 border border-violet-200/50"
              }`
            }
          >
            <FiPlus className="w-4 h-4" />
            Добавить товар
          </NavLink>

          <div className="flex items-center gap-2 ml-4 px-3 py-2 bg-white/50 backdrop-blur-sm rounded-xl border border-violet-200/50 shadow-sm">
            <FiHeart className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-violet-700">
              {likes.size}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
