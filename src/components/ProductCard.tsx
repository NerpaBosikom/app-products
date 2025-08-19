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

  const handleDelete = () => {
    remove(id);
    toast({
      title: "Товар удалён",
      description: `"${title}" был успешно удалён`,
      variant: "accent",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="relative">
        {/* Like */}
        <button
          aria-label="like"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleLike(id);
          }}
          className={`absolute right-3 top-3 p-2 rounded-full glass ${
            liked ? "text-violet-700" : "text-slate-600"
          }`}
          title="Like"
        >
          <FiHeart className={liked ? "fill-current" : ""} />
        </button>

        {/* Delete with modal */}
        <div className="absolute left-3 top-3">
          <Dialog>
            <DialogTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full glass"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Удалить товар?</DialogTitle>
                <DialogDescription>
                  Это действие нельзя будет отменить. Товар «{title}» будет
                  удалён.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-2 justify-end">
                <Button variant="outline">Отмена</Button>
                {/* у кнопки удаления красим классами, чтобы не добавлять новый variant */}
                <Button
                  variant="default"
                  className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-400"
                  onClick={handleDelete}
                >
                  Удалить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Link to={`/products/${id}`}>
          <CardHeader>
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-40 object-cover rounded-lg"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-40 rounded-lg bg-gradient-to-br from-violet-100 to-violet-200" />
            )}
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-1">{title}</CardTitle>
            <p className="line-clamp-3">{description}</p>
            {price !== undefined && (
              <p className="mt-2 font-medium text-violet-700">{price} $</p>
            )}
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
