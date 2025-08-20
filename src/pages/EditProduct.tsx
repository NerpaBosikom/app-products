import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsStore } from "../store/products";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";
import { FiArrowLeft } from "react-icons/fi";

export function EditProduct() {
  const { id } = useParams();
  const productId = Number(id);
  const { products, updateProduct } = useProductsStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const product = products.find((p) => p.id === productId);
  const [imageError, setImageError] = useState(false);

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [thumbnail, setThumbnail] = useState(product?.thumbnail || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [category, setCategory] = useState(product?.category || "");

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Товар не найден
        </h2>
        <Button
          onClick={() => navigate("/products")}
          className="bg-violet-600 hover:bg-violet-700 text-white"
        >
          Вернуться к товарам
        </Button>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля: название и описание",
      });
      return;
    }

    updateProduct(productId, {
      title: title.trim(),
      description: description.trim(),
      price: price ? parseFloat(price) : 0,
      thumbnail: thumbnail.trim() || "/placeholder.png",
      brand: brand.trim() || "",
      category: category.trim() || "",
    });

    toast({
      title: "Товар обновлён",
      description: `"${title}" успешно обновлён`,
    });

    navigate(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-block mb-6">
          <Button variant="outline" className="flex items-center gap-2">
            <FiArrowLeft className="w-4 h-4" />
            Назад
          </Button>
        </button>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Редактировать товар
            </h1>
            <p className="text-gray-600 font-medium">
              Измените информацию о товаре
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Название товара *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название товара"
                className="w-full px-4 py-3 bg-white border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Описание *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Опишите товар подробно"
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl resize-none"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Цена ($)
                </label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Бренд
                </label>
                <Input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Производитель"
                  className="w-full px-4 py-3 bg-white border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Категория
                </label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Категория товара"
                  className="w-full px-4 py-3 bg-white border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Ссылка на изображение
                </label>
                <Input
                  value={thumbnail}
                  onChange={(e) => {
                    setThumbnail(e.target.value);
                    setImageError(false);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-white border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                />
              </div>
            </div>

            {thumbnail && (
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Предпросмотр
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-white">
                  <img
                    src={imageError ? "/placeholder.png" : thumbnail}
                    alt="Предпросмотр"
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/products/${productId}`)}
                className="flex-1 py-3 text-gray-700 border-gray-300 hover:bg-gray-50 rounded-xl"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white rounded-xl shadow-md"
              >
                Сохранить изменения
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-violet-50 rounded-xl border border-violet-200">
            <p className="text-sm text-violet-700">
              <strong>Подсказка:</strong> Поля отмеченные * обязательны для
              заполнения.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
