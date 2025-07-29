// src/app/dusun/[slug]/page.tsx

// --- LANGKAH DEBUGGING TERAKHIR: Menjadikan halaman sebagai Server Component ---
// Dengan menghapus 'use client', kita menjadikan ini Server Component,
// bentuk paling dasar dari sebuah halaman di Next.js App Router.
// Jika build dengan kode ini TETAP GAGAL, maka masalahnya hampir pasti
// berada di luar kode aplikasi (misalnya cache Vercel, bug versi Next.js, dll.)

// Kita mendefinisikan tipe props untuk halaman dinamis ini.
type DusunPageProps = {
  params: {
    slug: string;
  };
};

export default function HalamanDetailDusun({ params }: DusunPageProps) {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Halaman Uji Coba untuk Dusun: {params.slug}
        </h1>
        <p className="mt-4">
          Ini adalah Server Component. Jika Anda melihat halaman ini, berarti proses build berhasil.
        </p>
      </div>
    </div>
  );
}
