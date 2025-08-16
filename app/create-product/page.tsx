
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateProductPage() {
  const addProduct = useStore(s => s.addProduct);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !price || Number(price) <= 0) return;
    addProduct({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      thumbnail: "https://dummyjson.com/image/400x300/8b5cf6/ffffff?text=New+Product",
      favorite: false
    });
    router.push("/products");
  };

  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Создать продукт</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Название*</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required minLength={2} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Описание*</label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required minLength={5} rows={4} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Цена (€)*</label>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")} required min={1} />
        </div>
        <div className="pt-2">
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </section>
  );
}
