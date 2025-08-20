import { useParams, Link } from "react-router-dom";
import { useProductsStore } from "../store/products";
import { Button } from "../components/ui/button";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

export function ProductDetails() {
  const { id } = useParams();
  const { products } = useProductsStore();
  const [imageError, setImageError] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Товар не найден
        </h2>
        <Link to="/products">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            Вернуться к товарам
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/products" className="inline-block mb-6">
        <Button variant="outline" className="flex items-center gap-2">
          <FiArrowLeft className="w-4 h-4" />
          Назад к товарам
        </Button>
      </Link>

      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {product.thumbnail ? (
              <img
                src={imageError ? "/placeholder.png" : product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover rounded-xl"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-violet-100 to-violet-200 rounded-xl flex items-center justify-center">
                <span className="text-violet-500 font-medium">No Image</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {product.brand && (
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Бренд:</span> {product.brand}
              </p>
            )}

            {product.category && (
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Категория:</span>{" "}
                {product.category}
              </p>
            )}

            {product.price !== undefined && (
              <p className="text-2xl font-bold text-violet-700 mb-6">
                ${product.price}
              </p>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Описание
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-4">
              <Link to="/products" className="flex-1">
                <Button variant="outline" className="w-full">
                  Все товары
                </Button>
              </Link>
              <Link to={`/edit-product/${product.id}`} className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
