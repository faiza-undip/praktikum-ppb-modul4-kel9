// src/pages/ProfilePage.jsx
export default function ProfilePage() {
  const kelompok = {
    namaKelompok: "Kelompok 9 - Praktikum Pemrograman Perangkat Bergerak",
    anggota: [
      { nama: "Faiza Tanjia", nim: "21120123140056" },
      { nama: "Muhammad Rafi Athallah", nim: "21120123130069" },
      { nama: "Mohammad Keanu Rassya Ramadhan", nim: "21120123140177" },
    ],
    deskripsi:
      "Kelompok ini bertugas mengembangkan proyek berbasis PWA React dan TailwindCSS untuk tugas modul 4 praktikum. Fokus utama kami adalah membangun antarmuka yang responsif dan fungsional.",
  };

  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Informasi Kelompok Praktikum
        </h1>
        <p className="text-gray-600 mt-2">
          Berikut adalah data anggota dan deskripsi singkat mengenai kelompok
          Anda.
        </p>

        {/* Nama Kelompok */}
        <div className="mt-6 border-l-4 border-blue-600 pl-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {kelompok.namaKelompok}
          </h2>
          <p className="text-gray-600 mt-1">{kelompok.deskripsi}</p>
        </div>

        {/* Daftar Anggota */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Daftar Anggota Kelompok
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border px-4 py-2 text-left">No</th>
                  <th className="border px-4 py-2 text-left">Nama</th>
                  <th className="border px-4 py-2 text-left">NIM</th>
                </tr>
              </thead>
              <tbody>
                {kelompok.anggota.map((a, i) => (
                  <tr
                    key={a.nim}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border px-4 py-2">{i + 1}</td>
                    <td className="border px-4 py-2">{a.nama}</td>
                    <td className="border px-4 py-2">{a.nim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500 text-center">
          © 2025 Praktikum Pemrograman Perangkat Bergerak, UNDIP — Kelompok 9
        </div>
      </div>
    </div>
  );
}
