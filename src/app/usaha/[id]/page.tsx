// src/app/usaha/[id]/page.tsx

import { db } from '@/lib/firebase';
// FIX: Menghapus 'DocumentData' yang tidak digunakan
import { doc, getDoc } from 'firebase/firestore'; 
import Link from 'next/link';
import { notFound } from 'next/navigation';
// FIX: Mengimpor komponen Image dari Next.js
import Image from 'next/image';

// 1. Definisikan struktur data Usaha di sini
interface Usaha {
  id: string;
  namaUsaha: string;
  jenisUsaha: string;
  urlLogo?: string;
  ecommerce?: string;
  sosialMedia?: {
    facebook?: string;
    instagram?: string;
  };
}

type DetailUsahaPageProps = {
  params: {
    id: string;
  };
};

// 2. Perbarui fungsi untuk menggunakan tipe Usaha
async function getUsahaById(id: string): Promise<Usaha | null> {
  const docRef = doc(db, 'usahaPenduduk', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // 3. Gunakan 'as Usaha' untuk memberitahu TypeScript bahwa data ini sesuai dengan interface Usaha
    return { id: docSnap.id, ...docSnap.data() } as Usaha;
  } else {
    return null;
  }
}

export default async function DetailUsahaPage({ params }: DetailUsahaPageProps) {
  const usaha = await getUsahaById(params.id);

  if (!usaha) {
    notFound();
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
        <Link href="/usaha" className="text-blue-500 hover:underline mb-6 inline-block">
          &larr; Kembali ke Daftar Usaha
        </Link>
        
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          {usaha.urlLogo && (
            // FIX: Mengganti tag <img> dengan komponen <Image> untuk optimasi
            <Image
              src={usaha.urlLogo}
              alt={`Logo ${usaha.namaUsaha}`}
              width={400} // Tentukan lebar gambar (bisa disesuaikan)
              height={400} // Tentukan tinggi gambar (bisa disesuaikan)
              className="w-full md:w-1/3 h-auto object-cover rounded-lg border"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{usaha.namaUsaha}</h1>
            <p className="text-xl text-gray-600 mt-2">{usaha.jenisUsaha}</p>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Informasi Kontak & Tautan</h2>
          <div className="space-y-4">
            {usaha.sosialMedia?.facebook && (
              <a href={usaha.sosialMedia.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <strong>Facebook:</strong> <span className="text-blue-600 truncate">{usaha.sosialMedia.facebook}</span>
              </a>
            )}
            {usaha.sosialMedia?.instagram && (
              <a href={usaha.sosialMedia.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <strong>Instagram:</strong> <span className="text-purple-600 truncate">{usaha.sosialMedia.instagram}</span>
              </a>
            )}
            {usaha.ecommerce && (
               <a href={usaha.ecommerce} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <strong>E-commerce:</strong> <span className="text-green-600 truncate">{usaha.ecommerce}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
