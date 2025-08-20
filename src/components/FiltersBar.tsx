// src/components/FiltersBar.tsx
import { FiHeart } from "react-icons/fi";

type Props = {
  showOnlyLiked: boolean;
  onToggleLiked: () => void;
};

export function FiltersBar({ showOnlyLiked, onToggleLiked }: Props) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onToggleLiked}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm transition-all ${
          showOnlyLiked
            ? "text-white bg-gradient-to-br from-violet-600 to-purple-500 shadow-md"
            : "text-violet-700 hover:bg-violet-100/80 bg-white/50 border border-violet-200/50 shadow-sm"
        }`}
      >
        <FiHeart className={`w-5 h-5 ${showOnlyLiked ? "text-white" : ""}`} />
        {showOnlyLiked ? "Только избранное" : "Все товары"}
      </button>
    </div>
  );
}
