// src/pages/HomePage.jsx
import { useMemo } from "react";
import { ResepMakanan } from "../data/makanan";
import { ResepMinuman } from "../data/minuman";

function FeaturedGrid({ items, onClickItem }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((r) => (
        <button
          key={`${r.id}-${r.name}`}
          onClick={() => onClickItem?.(r.id)}
          className="text-left bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden"
        >
          {r.image_url && (
            <img
              src={r.image_url}
              alt={r.name}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="font-semibold line-clamp-2">{r.name}</h3>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function HomePage({
  onSelectMakanan,
  onSelectMinuman,
  onSeeAllMakanan,
  onSeeAllMinuman,
}) {
  // ambil 4 teratas sebagai featured (bisa diganti random kalau mau)
  const featuredMakanan = useMemo(
    () => Object.values(ResepMakanan.resep).slice(0, 4),
    []
  );
  const featuredMinuman = useMemo(
    () => Object.values(ResepMinuman.resep).slice(0, 4),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12">
        {/* Hero / Intro singkat */}
        <section className="bg-white rounded-2xl p-8 shadow">
          <h1 className="text-2xl md:text-3xl font-bold">
            Resep Nusantara – Selamat Datang!
          </h1>
          <p className="text-gray-600 mt-2">
            Jelajahi resep makanan & minuman favoritmu. Coba pilihan unggulan di
            bawah ini.
          </p>
        </section>

        {/* Featured Makanan */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold">
              Featured Makanan
            </h2>
            <button
              onClick={onSeeAllMakanan}
              className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            >
              Lihat semua →
            </button>
          </div>
          <FeaturedGrid items={featuredMakanan} onClickItem={onSelectMakanan} />
        </section>

        {/* Featured Minuman */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold">
              Featured Minuman
            </h2>
            <button
              onClick={onSeeAllMinuman}
              className="text-sm px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            >
              Lihat semua →
            </button>
          </div>
          <FeaturedGrid items={featuredMinuman} onClickItem={onSelectMinuman} />
        </section>
      </main>
    </div>
  );
}
