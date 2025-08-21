import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsStore } from "../store/products";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

export function EditProduct() {
  const { id } = useParams();
  const { products, updateProduct } = useProductsStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const product = products.find((p) => p.id === Number(id));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price?.toString() || "");
      setThumbnail(
        product.thumbnail &&
          product.thumbnail !== "/app-products/placeholder.svg"
          ? product.thumbnail
          : ""
      );
      setBrand(product.brand || "");
      setCategory(product.category || "");
    }
  }, [product]);

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

    if (!product) return;

    const updatedProduct = {
      ...product,
      title: title.trim(),
      description: description.trim(),
      price: priceValue,
      thumbnail: thumbnail.trim() || "/app-products/placeholder.svg",
      brand: brand.trim() || "",
      category: category.trim() || "",
    };

    updateProduct(product.id, updatedProduct);

    toast({
      title: "Товар обновлен",
      description: `"${updatedProduct.title}" успешно изменен`,
    });

    navigate(`/products/${product.id}`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Товар не найден
          </h2>
          <Button onClick={() => navigate("/products")}>
            Вернуться к товарам
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-violet-200/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent mb-2">
              Редактировать товар
            </h1>
            <p className="text-gray-600 font-medium">
              Измените информацию о товаре
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* остальной код без изменений */}
            <div className="mt-6 p-4 bg-violet-50/80 rounded-xl border border-violet-200/50">
              <p className="text-sm text-violet-700">
                <strong>Подсказка:</strong> Поля отмеченные * обязательны для
                заполнения. Оставьте поле изображения пустым, чтобы использовать
                заглушку.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
