// src/app/data-desa/page.tsx

import TableCard from '@/components/TableCard';

// Data Statistik Utama 2024
const dataDesa = {
  jumlahPenduduk: 9300, // Penjumlahan dari 5.563 Perempuan + 3.737 Laki-laki
  jumlahKK: 1822, // Data dari profil lama, bisa diupdate jika ada data baru
  jumlahRT: 36,   // Data dari profil lama
  jumlahRW: 10,   // Data dari profil lama
  skorIDM: 75.89, // Data dari profil lama
  tahunData: 2024,
  linkAPBDes: "/dokumen/apbdes-2024.pdf" 
};

// Data baru berdasarkan Status Perkawinan 2024
const dataStatusPerkawinan = [
    ["Belum Kawin", 1361, 1727, 3088],
    ["Sudah Kawin", 1891, 1931, 3822],
    ["Cerai Hidup", 82, 53, 135],
    ["Cerai Mati", 229, 44, 273]
];

// Data baru berdasarkan Pendidikan 2024
const dataPendidikan = [
    ["Belum Sekolah", 945, 990, 1935],
    ["Belum Tamat SD", 265, 333, 598],
    ["Tamat SD", 1507, 1489, 2996],
    ["Tamat SLTP", 475, 464, 939],
    ["Tamat SLTA", 327, 405, 732],
    ["Tamat DI/DII", 7, 6, 13],
    ["Tamat DIII", 8, 13, 21], // Menggabungkan DII ke DIII untuk penyederhanaan
    ["Tamat DIV/S1", 29, 36, 65],
    ["Tamat S2", 1, 0, 1],
    ["Tamat S3", 0, 0, 0]
];


// Komponen untuk menampilkan satu item data
const DataBox = ({ label, value, unit }: { label: string, value: string | number, unit?: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <p className="text-lg text-gray-500">{label}</p>
    <p className="text-4xl font-bold text-blue-600 mt-2">
      {value} <span className="text-2xl text-gray-700">{unit}</span>
    </p>
  </div>
);

export default function HalamanDataDesa() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Data Statistik Desa Hegarmanah</h1>
        <p className="text-center text-gray-600 mb-12">Data berdasarkan sensus terakhir pada tahun {dataDesa.tahunData}</p>
        
        {/* Kartu Statistik Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DataBox label="Jumlah Penduduk" value={dataDesa.jumlahPenduduk.toLocaleString('id-ID')} unit="Jiwa" />
          <DataBox label="Laki-laki" value={(3737).toLocaleString('id-ID')} unit="Jiwa" />
          <DataBox label="Perempuan" value={(5563).toLocaleString('id-ID')} unit="Jiwa" />
          <DataBox label="Kepala Keluarga" value={dataDesa.jumlahKK.toLocaleString('id-ID')} unit="KK" />
        </div>
        
        {/* Bagian Tabel-Tabel Rinci */}
        <div className="space-y-8">
            <TableCard 
              title="Jumlah Penduduk Berdasarkan Status Perkawinan" 
              headers={["Status", "Perempuan", "Laki-laki", "Total"]} 
              rows={dataStatusPerkawinan} 
            />
            <TableCard 
              title="Jumlah Penduduk Berdasarkan Tingkat Pendidikan" 
              headers={["Tingkat Pendidikan", "Perempuan", "Laki-laki", "Total"]} 
              rows={dataPendidikan} 
            />
        </div>

      </div>
    </div>
  );
}