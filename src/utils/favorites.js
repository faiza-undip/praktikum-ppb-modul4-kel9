const KEY = "favorites";

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      makanan: Array.isArray(parsed.makanan) ? parsed.makanan : [],
      minuman: Array.isArray(parsed.minuman) ? parsed.minuman : [],
    };
  } catch {
    return { makanan: [], minuman: [] };
  }
}

export function saveFavorites(favs) {
  localStorage.setItem(KEY, JSON.stringify(favs));
  // trigger event buat sinkronisasi antar tab/komponen
  window.dispatchEvent(new Event("storage"));
}

export function toggleFavorite(type, id) {
  const favs = loadFavorites();
  const list = favs[type] || [];

  const index = list.indexOf(id);
  if (index === -1) {
    list.push(id); // tambahkan
  } else {
    list.splice(index, 1); // hapus
  }

  const updated = { ...favs, [type]: list };
  saveFavorites(updated);
  return updated;
}

export function isFavorite(type, id) {
  const favs = loadFavorites();
  const list = favs[type] || [];
  return list.includes(id);
}

export function toSetByKey(favs = { makanan: [], minuman: [] }) {
  const makanan = Array.isArray(favs.makanan) ? favs.makanan : [];
  const minuman = Array.isArray(favs.minuman) ? favs.minuman : [];
  return new Set([
    ...makanan.map(id => `makanan-${id}`),
    ...minuman.map(id => `minuman-${id}`),
  ]);
}
