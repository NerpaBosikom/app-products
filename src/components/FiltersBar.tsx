import { FiHeart } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  showOnlyLiked: boolean;
  onToggleLiked: () => void;
};

export function FiltersBar({ showOnlyLiked, onToggleLiked }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggle = () => {
    const searchParams = new URLSearchParams(location.search);

    if (showOnlyLiked) {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", "liked");
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
    onToggleLiked();
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm transition-all ${
          showOnlyLiked
            ? "text-white bg-gradient-to-br from-violet-600 to-purple-500 shadow-md"
            : "text-violet-700 hover:bg-violet-100/80 bg-white/50 border border-violet-200/50 shadow-sm"
        }`}
      >
        <FiHeart
          className={`w-5 h-5 ${showOnlyLiked ? "text-white" : "text-red-500"}`}
        />
        {showOnlyLiked ? "Только избранное" : "Все товары"}
      </button>
    </div>
  );
}
