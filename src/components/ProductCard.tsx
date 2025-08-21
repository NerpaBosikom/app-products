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
  brand?: string;
  category?: string;
};

export function ProductCard({
  id,
  title,
  description,
  price,
  thumbnail,
  brand,
  category,
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
            liked ? "text-red-500" : "text-gray-400"
          }`}
          title={liked ? "Удалить из избранного" : "Добавить в избранное"}
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
                <FiTrash2 className="w-5 h-5 text-gray-400" />
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
            {thumbnail && !imageError ? (
              <div className="w-full h-48 bg-gradient-to-br from-violet-50 to-indigo-100 flex items-center justify-center">
                <img
                  src={thumbnail}
                  alt={title}
                  className="max-h-40 max-w-full object-contain"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-violet-100/80 to-violet-200/80 backdrop-blur-sm flex items-center justify-center">
                <img
                  src="/app-products/placeholder.svg"
                  alt="Placeholder"
                  className="w-12 h-12 object-contain opacity-80"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between p-4 space-y-3">
            <div className="space-y-2">
              <CardTitle className="text-gray-900 text-lg font-bold line-clamp-2">
                {title}
              </CardTitle>

              <div className="flex flex-wrap gap-1">
                {brand && (
                  <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-xs font-medium">
                    {brand}
                  </span>
                )}
                {category && (
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                    {category}
                  </span>
                )}
              </div>

              <p className="text-gray-600 line-clamp-2 text-sm">
                {description}
              </p>
            </div>

            {price !== undefined && (
              <p className="font-bold text-violet-700 text-lg">${price}</p>
            )}
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
