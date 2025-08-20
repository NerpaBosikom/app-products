// src/components/ProductCard.tsx
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useProductsStore } from "../store/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

type Props = {
  id: number;
  title: string;
  description: string;
  price?: number;
  thumbnail?: string;
};

export function ProductCard({
  id,
  title,
  description,
  price,
  thumbnail,
}: Props) {
  const toggleLike = useProductsStore((s) => s.toggleLike);
  const remove = useProductsStore((s) => s.removeProduct);
  const liked = useProductsStore((s) => s.likes.has(id));
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);

  const handleDelete = () => {
    remove(id);
    toast({
      title: "Товар удалён",
      description: `"${title}" был успешно удалён`,
      variant: "accent" as const,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="relative flex flex-col h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
        <button
          aria-label="like"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleLike(id);
          }}
          className={`absolute right-3 top-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm transition-all hover:scale-110 ${
            liked ? "text-red-500" : "text-gray-600"
          }`}
          title="Like"
        >
          <FiHeart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
        </button>

        <div className="absolute left-3 top-3">
          <Dialog>
            <DialogTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm transition-all hover:scale-110"
                title="Delete"
              >
                <FiTrash2 className="w-5 h-5 text-gray-600" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-lg rounded-2xl border border-gray-200">
              <DialogHeader>
                <DialogTitle className="text-gray-900 text-xl font-bold">
                  Удалить товар?
                </DialogTitle>
                <DialogDescription className="text-gray-600 text-base">
                  Это действие нельзя будет отменить. Товар «{title}» будет
                  удалён.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Отмена
                </Button>
                <Button
                  variant="default"
                  className="bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                  onClick={handleDelete}
                >
                  Удалить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Link to={`/products/${id}`} className="flex-1 flex flex-col">
          <CardHeader className="p-0">
            {thumbnail ? (
              <img
                src={
                  imageError
                    ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f3e8ff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23ddd6fe;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='14' fill='%237c3aed'%3ENo Image%3C/text%3E%3C/svg%3E"
                    : thumbnail
                }
                alt={title}
                className="w-full h-48 object-cover"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center">
                <span className="text-violet-500 font-medium">No Image</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between p-4">
            <div>
              <CardTitle className="mb-2 text-gray-900 text-lg font-bold line-clamp-2">
                {title}
              </CardTitle>
              <p className="text-gray-600 line-clamp-3 text-sm">
                {description}
              </p>
            </div>
            {price !== undefined && (
              <p className="mt-3 font-bold text-violet-700 text-lg">${price}</p>
            )}
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
