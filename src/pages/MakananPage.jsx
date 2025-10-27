import { useEffect, useMemo, useState } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import IngredientFilter from '../components/common/IngredientFilter';
import { loadFavorites, toggleFavorite, toSetByKey } from '../utils/favorites';

export default function MakananPage({ onSelectRecipe }) {
  const allMakanan = useMemo(() => Object.values(ResepMakanan.resep), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 3; // <= sesuai request

  // favorites
  const [favoriteSet, setFavoriteSet] = useState(() => toSetByKey(loadFavorites()));
  useEffect(() => {
    // sinkron kalau tab lain mengubah
    const handler = () => setFavoriteSet(toSetByKey(loadFavorites()));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const ingredientTokens = useMemo(() =>
    ingredientQuery
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean),
  [ingredientQuery]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allMakanan.filter(r => {
      const nameHit = q ? (r.name || '').toLowerCase().includes(q) : true;

      const ingredients = (r.ingredients || []).map(i => i.toLowerCase());
      const ingredientHit = ingredientTokens.length === 0
        ? true
        : ingredientTokens.every(tok => ingredients.some(i => i.includes(tok)));

      return nameHit && ingredientHit;
    });
  }, [allMakanan, searchQuery, ingredientTokens]);

  const start = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  const handleToggleFavorite = (type, id) => {
    const next = toggleFavorite(type, id);
    setFavoriteSet(toSetByKey(next));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6">
        <SearchBar
          value={searchQuery}
          onChange={(v) => { setPage(1); setSearchQuery(v); }}
          placeholder="Cari makanan..."
        />
        <IngredientFilter
          value={ingredientQuery}
          onChange={(v) => { setPage(1); setIngredientQuery(v); }}
        />

        <RecipeGrid
          type="makanan"
          recipes={paged}
          onSelect={(recipe) => onSelectRecipe(recipe.id)}
          onToggleFavorite={handleToggleFavorite}
          favoriteSet={favoriteSet}
        />

        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          total={filtered.length}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}
