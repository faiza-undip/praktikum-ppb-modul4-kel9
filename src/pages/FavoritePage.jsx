import { useMemo, useState, useEffect } from "react";
import { ResepMakanan } from "../data/makanan";
import { ResepMinuman } from "../data/minuman";
import { loadFavorites, toggleFavorite, toSetByKey } from "../utils/favorites";
import RecipeGrid from "../components/makanan/RecipeGrid"; // bisa pakai grid yang sama

export default function FavoritePage({ onSelectRecipe }) {
  const [favoriteSet, setFavoriteSet] = useState(() =>
    toSetByKey(loadFavorites())
  );

  useEffect(() => {
    const handler = () => setFavoriteSet(toSetByKey(loadFavorites()));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const allMakanan = Object.values(ResepMakanan.resep);
  const allMinuman = Object.values(ResepMinuman.resep);

  const favorites = useMemo(() => {
    const favs = loadFavorites() || {};
    const makananFav = Array.isArray(favs.makanan) ? favs.makanan : [];
    const minumanFav = Array.isArray(favs.minuman) ? favs.minuman : [];

    const favMakanan = allMakanan.filter((r) => makananFav.includes(r.id));
    const favMinuman = allMinuman.filter((r) => minumanFav.includes(r.id));

    return { makanan: favMakanan, minuman: favMinuman };
  }, [favoriteSet]);

  const handleToggleFavorite = (type, id) => {
    const next = toggleFavorite(type, id);
    setFavoriteSet(toSetByKey(next));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Resep Favorit ❤️
        </h1>

        {favorites.makanan.length === 0 && favorites.minuman.length === 0 ? (
          <p className="text-gray-600 mt-4">
            Belum ada resep favorit yang disimpan.
          </p>
        ) : (
          <>
            {favorites.makanan.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-orange-700">
                  Makanan
                </h2>
                <RecipeGrid
                  type="makanan"
                  recipes={favorites.makanan}
                  onSelect={onSelectRecipe}
                  onToggleFavorite={handleToggleFavorite}
                  favoriteSet={favoriteSet}
                />
              </section>
            )}
            {favorites.minuman.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-700">Minuman</h2>
                <RecipeGrid
                  type="minuman"
                  recipes={favorites.minuman}
                  onSelect={onSelectRecipe}
                  onToggleFavorite={handleToggleFavorite}
                  favoriteSet={favoriteSet}
                />
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
