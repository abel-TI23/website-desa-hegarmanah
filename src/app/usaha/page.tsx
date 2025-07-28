// src/app/usaha/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

// Definisikan struktur data untuk Usaha
interface Usaha {
  id: string;
  namaUsaha: string;
  jenisUsaha: string;
  urlLogo?: string;
}

export default function HalamanUsahaWarga() {
  const [daftarUsaha, setDaftarUsaha] = useState<Usaha[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'usahaPenduduk'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Usaha));
        setDaftarUsaha(data);
      } catch (error) {
        console.error("Error mengambil data: ", error);
      } finally {
        setLoading(false);
      }
    };

    ambilData();
  }, []);

  if (loading) {
    return <main className="container mx-auto p-8"><p>Memuat data usaha...</p></main>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Direktori Usaha Warga</h1>
      
      {daftarUsaha.length === 0 ? (
        <p className="text-center">Belum ada data usaha yang terdaftar.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {daftarUsaha.map((usaha) => (
            <Link key={usaha.id} href={`/usaha/${usaha.id}`} className="block hover:scale-105 transition-transform duration-200">
              <div className="border rounded-lg p-6 shadow-lg bg-white h-full">
                {usaha.urlLogo && (
                  <img 
                    src={usaha.urlLogo} 
                    alt={`Logo ${usaha.namaUsaha}`} 
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-2xl font-semibold mb-2">{usaha.namaUsaha}</h2>
                <p className="text-gray-600">{usaha.jenisUsaha}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}