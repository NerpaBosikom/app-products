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

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0) {
      toast({
        title: "Ошибка",
        description: "Цена должна быть положительным числом",
      });
      return;
    }

    const newProduct = {
      title: title.trim(),
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
            {/* остальной код без изменений */}
            <div className="mt-6 p-4 bg-violet-50/80 rounded-xl border border-violet-200/50">
              <p className="text-sm text-violet-700">
                <strong>Подсказка:</strong> Поля отмеченные * обязательны для
                заполнения. Если не указать изображение, будет использована
                заглушка.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
