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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newProduct = {
      title: title.trim(),
      description: description.trim(),
      price: price ? parseFloat(price) : undefined, // поддержка десятичных чисел
      thumbnail: thumbnail || undefined,
    };

    add(newProduct);

    toast({
      title: "Товар добавлен",
      description: `"${newProduct.title}" успешно добавлен`,
      variant: "accent",
    });

    // Очистка формы
    setTitle("");
    setDescription("");
    setPrice("");
    setThumbnail("");

    // Навигация на страницу продуктов
    navigate("/products", { replace: true });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto space-y-3 bg-white/70 border border-violet-200 rounded-xl p-4"
    >
      <h2 className="text-xl font-semibold">Create product</h2>

      <label className="block text-sm">Title*</label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <label className="block text-sm">Description*</label>
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <label className="block text-sm">Price</label>
      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        type="number"
        min="0"
        step="0.01" // теперь можно вводить десятичные значения
      />

      <label className="block text-sm">Image URL</label>
      <Input
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        placeholder="https://…"
      />

      <div className="pt-2">
        <Button type="submit" className="w-full">
          Create
        </Button>
      </div>
    </form>
  );
}
