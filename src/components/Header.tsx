import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiPackage, FiPlus, FiHeart, FiMenu } from "react-icons/fi";
import { useProductsStore } from "../store/products";
import { useState } from "react";

export function Header() {
  const likes = useProductsStore((s) => s.likes);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLikedFilterActive = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("filter") === "liked";
  };

  const handleHeartClick = () => {
    if (!isFilterablePage) return;

    const searchParams = new URLSearchParams(location.search);

    if (isLikedFilterActive()) {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", "liked");
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
    setIsMenuOpen(false);
  };

  const isFilterablePage =
    location.pathname === "/" || location.pathname === "/products";

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

        <nav className="hidden md:flex items-center gap-2">
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

          <div
            onClick={handleHeartClick}
            className={`flex items-center gap-2 ml-4 px-3 py-2 rounded-xl border shadow-sm transition-all ${
              isLikedFilterActive()
                ? "bg-gradient-to-br from-violet-600 to-purple-500 text-white border-violet-600 shadow-md"
                : "bg-white/50 backdrop-blur-sm border-violet-200/50 text-violet-700"
            } ${
              isFilterablePage
                ? "hover:bg-violet-100/80 cursor-pointer"
                : "cursor-default opacity-70"
            }`}
          >
            <FiHeart
              className={`w-5 h-5 ${
                isLikedFilterActive() ? "text-white" : "text-red-500"
              }`}
            />
            <span className="text-sm font-medium">{likes.size}</span>
          </div>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/50 border border-violet-200/50 shadow-sm"
        >
          <FiMenu className="w-6 h-6 text-violet-700" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-violet-200/50">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            <NavLink
              to="/create-product"
              onClick={() => setIsMenuOpen(false)}
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

            <div
              onClick={handleHeartClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border shadow-sm transition-all ${
                isLikedFilterActive()
                  ? "bg-gradient-to-br from-violet-600 to-purple-500 text-white border-violet-600 shadow-md"
                  : "bg-white/50 backdrop-blur-sm border-violet-200/50 text-violet-700"
              } ${
                isFilterablePage
                  ? "hover:bg-violet-100/80 cursor-pointer"
                  : "cursor-default opacity-70"
              }`}
            >
              <FiHeart
                className={`w-5 h-5 ${
                  isLikedFilterActive() ? "text-white" : "text-red-500"
                }`}
              />
              <span className="text-sm font-medium">
                Избранное ({likes.size})
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
