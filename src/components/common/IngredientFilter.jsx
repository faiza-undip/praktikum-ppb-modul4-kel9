// src/components/common/IngredientFilter.jsx
export default function IngredientFilter({ value, onChange }) {
  return (
    <div className="w-full max-w-xl">
      <label className="block text-sm text-gray-600 mb-1">
        Filter berdasarkan bahan (pisahkan dengan koma): contoh: bawang putih, gula
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Contoh: bawang, gula, kecap"
        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
      <p className="text-xs text-gray-500 mt-1">Pencarian menggunakan logika AND untuk semua kata.</p>
    </div>
  );
}
