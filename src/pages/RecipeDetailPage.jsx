// src/pages/RecipeDetailPage.jsx
import { useMemo, useState } from "react";
import { ResepMakanan } from "../data/makanan";
import { ResepMinuman } from "../data/minuman";

import FavoriteButton from "../components/common/FavoriteButton";
import {
  isFavorite,
  toggleFavorite,
  toSetByKey,
  loadFavorites,
} from "../utils/favorites";

function findById(collectionObj, id) {
  return Object.values(collectionObj?.resep || {}).find(
    (r) => String(r.id) === String(id)
  );
}

export default function RecipeDetailPage({ type, id, onBack }) {
  // Guard biar gak error kalau type / id belum kebawa
  if (!type || !id) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          ← Kembali
        </button>
        <p>Data resep belum lengkap.</p>
      </div>
    );
  }

  const [favSet, setFavSet] = useState(() => toSetByKey(loadFavorites()));
  const favActive = useMemo(() => isFavorite(type, id, favSet), [type, id, favSet]);

  const isMakanan = type === "makanan";
  const recipe = isMakanan
    ? findById(ResepMakanan, id)
    : findById(ResepMinuman, id);

  if (!recipe) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          ← Kembali
        </button>
        <p>Resep tidak ditemukan.</p>
      </div>
    );
  }

  const { name, image_url, ingredients = [], steps = [] } = recipe;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pb-20 md:pb-8">
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          ← Kembali
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {image_url && (
            <img
              src={image_url}
              alt={name}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
              <FavoriteButton
                active={favActive}
                onClick={() => {
                  const next = toggleFavorite(type, id);
                  setFavSet(toSetByKey(next));
                }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <section>
                <h2 className="text-lg font-semibold mb-3">Bahan</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {ingredients.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-semibold mb-3">Langkah</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  {steps.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
