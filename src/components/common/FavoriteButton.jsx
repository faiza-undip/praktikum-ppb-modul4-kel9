// src/components/common/FavoriteButton.jsx
import { Heart } from "lucide-react";

export default function FavoriteButton({ active = false, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "Hapus dari favorit" : "Tambahkan ke favorit"}
      className={`p-2 rounded-full bg-white/90 shadow hover:scale-105 transition ${className}`}
    >
      <Heart className={`w-5 h-5 ${active ? "fill-red-500 stroke-red-500" : "stroke-gray-500"}`} />
    </button>
  );
}
