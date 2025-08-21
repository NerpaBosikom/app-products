import { useParams, Link } from "react-router-dom";
import { useProductsStore } from "../store/products";
import { Button } from "../components/ui/button";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { useState } from "react";

export function ProductDetails() {
  const { id } = useParams();
  const { products, toggleLike, likes } = useProductsStore();
  const [imageError, setImageError] = useState(false);
  const product = products.find((p) => p.id === Number(id));
  const isLiked = product ? likes.has(product.id) : false;

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Товар не найден
        </h2>
        <Link to="/products">
          <Button className="bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white">
            Вернуться к товарам
          </Button>
        </Link>
      </div>
    );
  }

  const handleLikeClick = () => {
    toggleLike(product.id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/products" className="inline-block mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white/80 border-violet-200 text-violet-700 hover:bg-violet-50"
        >
          <FiArrowLeft className="w-4 h-4" />
          Назад к товарам
        </Button>
      </Link>

      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-violet-200/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-full">
              {product.thumbnail && !imageError ? (
                <div className="w-full aspect-square bg-gradient-to-br from-violet-50 to-indigo-100 rounded-2xl flex items-center justify-center p-6">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-80 max-w-full object-contain rounded-xl"
                    loading="lazy"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl flex items-center justify-center">
                  <img
                    src="/app-products/placeholder.svg"
                    alt="No Image"
                    className="w-24 h-24 object-contain opacity-70"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              <button
                onClick={handleLikeClick}
                className={`absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md transition-all hover:scale-110 ${
                  isLiked ? "text-red-500" : "text-gray-400"
                }`}
                aria-label={
                  isLiked ? "Удалить из избранного" : "Добавить в избранное"
                }
              >
                <FiHeart
                  className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {product.brand && (
                  <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.brand}
                  </span>
                )}
                {product.category && (
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                )}
              </div>

              {product.price !== undefined && (
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent mb-6">
                  ${product.price}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Описание
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Link to="/products" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full bg-white/80 border-violet-200 text-violet-700 hover:bg-violet-50"
                >
                  Все товары
                </Button>
              </Link>
              <Link to={`/edit-product/${product.id}`} className="flex-1">
                <Button className="w-full bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white">
                  Редактировать
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
