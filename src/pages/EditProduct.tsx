import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsStore } from "../store/products";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

export function EditProduct() {
  const { id } = useParams();
  const productId = Number(id);
  const product = useProductsStore((s) =>
    s.products.find((p) => p.id === productId)
  );
  const update = useProductsStore((s) => s.updateProduct);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [thumbnail, setThumbnail] = useState(product?.thumbnail || "");

  if (!product) return <p>Product not found.</p>;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    update(productId, {
      title: title.trim(),
      description: description.trim(),
      price: price ? Number(price) : undefined,
      thumbnail: thumbnail || undefined,
    });
    toast({
      title: "Product updated",
      description: `"${title}" has been successfully updated`,
      variant: "accent",
    });
    navigate(`/products/${productId}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto space-y-3 bg-white/70 border border-violet-200 rounded-xl p-4"
    >
      <h2 className="text-xl font-semibold">Edit product</h2>
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
        step="0.01"
      />
      <label className="block text-sm">Image URL</label>
      <Input
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        placeholder="https://…"
      />
      <div className="pt-2 flex gap-2">
        <Button type="submit" className="flex-1">
          Save
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
