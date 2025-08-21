import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductsStore } from "../store/products";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

export function CreateProduct() {
  const add = useProductsStore((s) => s.addProduct);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [imageError, setImageError] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !price.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля: название, описание и цена",
      });
      return;
    }

    if (description.trim().length < 10) {
      toast({
        title: "Ошибка",
        description: "Описание должно содержать минимум 10 символов",
      });
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0) {
      toast({
        title: "Ошибка",
        description: "Цена должна быть положительным числом",
      });
      return;
    }

    const formattedTitle = title.trim().replace(/^\s+/, "");
    const capitalizedTitle =
      formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);

    const newProduct = {
      title: capitalizedTitle,
      description: description.trim(),
      price: priceValue,
      thumbnail: thumbnail.trim() || "/app-products/placeholder.svg",
      brand: brand.trim() || "",
      category: category.trim() || "",
    };

    add(newProduct);

    toast({
      title: "Товар добавлен",
      description: `"${newProduct.title}" успешно создан`,
    });

    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-violet-200/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent mb-2">
              Добавить товар
            </h1>
            <p className="text-gray-600 font-medium">
              Заполните информацию о новом товаре
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название товара *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название товара"
                className="w-full px-4 py-3 bg-white/80 border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание * (минимум 10 символов)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Опишите товар подробно"
                className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl resize-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-400 focus:outline-none hover:border-violet-300"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Цена ($) *
                </label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/80 border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Бренд
                </label>
                <Input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Производитель"
                  className="w-full px-4 py-3 bg-white/80 border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория
                </label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Категория товара"
                  className="w-full px-4 py-3 bg-white/80 border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ссылка на изображение
                </label>
                <Input
                  value={thumbnail}
                  onChange={(e) => {
                    setThumbnail(e.target.value);
                    setImageError(false);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-white/80 border-gray-300 focus:border-violet-400 focus:ring-violet-400 rounded-xl"
                />
              </div>
            </div>

            {(thumbnail || imageError) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Предпросмотр
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-white/50 hover:border-violet-300 transition-colors">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="max-h-44 max-w-full object-contain"
                    loading="lazy"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/products")}
                className="flex-1 py-3 text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-violet-300 transition-colors rounded-xl"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-br from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white rounded-xl shadow-md transition-all"
              >
                Создать товар
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-violet-50/80 rounded-xl border border-violet-200/50">
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
