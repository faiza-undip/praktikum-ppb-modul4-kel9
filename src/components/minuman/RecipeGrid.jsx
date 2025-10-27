import { Heart } from "lucide-react";

export default function RecipeGrid({
  recipes,
  onSelect,
  onToggleFavorite,
  favoriteSet,
  type = "minuman",
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((r) => {
        const favKey = `${type}-${r.id}`;
        const isFav = favoriteSet.has(favKey);

        const handleCardClick = (e) => {
          // biar klik di hati gak ikut buka resep
          if (e.target.closest(".fav-btn")) return;
          onSelect(r);
        };

        return (
          <div
            key={r.id}
            onClick={handleCardClick}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-transform duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 relative group"
          >
            {/* Gambar */}
            {r.image_url && (
              <img
                src={r.image_url}
                alt={r.name}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}

            {/* Tombol favorit ❤️ */}
            <button
              onClick={() => onToggleFavorite(type, r.id)}
              className="fav-btn absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white transition"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFav ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button>

            {/* Detail teks */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 line-clamp-2 transition">
                {r.name}
              </h3>
              {r.deskripsi && (
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                  {r.deskripsi}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
