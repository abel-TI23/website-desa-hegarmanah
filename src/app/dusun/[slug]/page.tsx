// src/app/dusun/[slug]/page.tsx
'use client';

// --- LANGKAH DEBUGGING: Menggunakan tipe yang paling sederhana dan benar ---
// Kita mendefinisikan tipe props untuk halaman dinamis ini.
type DusunPageProps = {
  params: {
    slug: string;
  };
};

/**
 * --- LANGKAH DEBUGGING: Menyederhanakan Komponen ---
 * Kami mengganti seluruh logika kompleks dengan satu baris JSX sederhana.
 * Ini bertujuan untuk memeriksa apakah error build berasal dari pengetikan (typing)
 * atau dari logika di dalam komponen (useState, useEffect, Firebase, dll).
 * * Jika build dengan kode ini BERHASIL, berarti masalah ada di dalam logika
 * yang kita hapus sementara.
 * Jika build dengan kode ini TETAP GAGAL, berarti masalahnya lebih dalam
 * (kemungkinan di konfigurasi tsconfig.json atau bug di versi Next.js).
 */
export default function HalamanDetailDusun({ params }: DusunPageProps) {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Halaman Uji Coba untuk Dusun: {params.slug}
        </h1>
        <p className="mt-4">Jika Anda melihat halaman ini, berarti proses build berhasil.</p>
      </div>
    </div>
  );
}
