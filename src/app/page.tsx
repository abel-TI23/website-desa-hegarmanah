// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto text-center py-20 md:py-32 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Selamat Datang di Website
          <span className="block text-blue-600">Desa Hegarmanah</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Temukan informasi terbaru, data desa, potensi wilayah, dan direktori usaha warga kami di sini.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/profil-desa" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Lihat Profil Desa
          </Link>
          <Link href="/berita" className="bg-white text-blue-600 border border-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors">
            Baca Berita
          </Link>
          <Link href="/potensi-desa" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors">
            Lihat Potensi Desa
          </Link>
          <Link href="/dusun" className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors">
            Lihat Dusun
          </Link>
        </div>
      </div>
    </div>
  );
}