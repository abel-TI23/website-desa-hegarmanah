// src/app/galeri/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Image from 'next/image';

// Definisikan struktur data untuk item galeri
interface GaleriItem {
  id: string;
  src: string;
  caption: string;
  date: string;
}

export default function HalamanGaleri() {
  const [galeriItems, setGaleriItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        // Query untuk mengambil data dan mengurutkannya dari yang paling baru
        const q = query(collection(db, "galeri"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GaleriItem));
        setGaleriItems(data);
      } catch (error) {
        console.error("Error fetching galeri data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGaleri();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Memuat galeri...</div>;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Galeri Kegiatan Desa</h1>
          <p className="text-xl text-gray-500 mt-2">Dokumentasi Momen dan Aktivitas di Desa Hegarmanah</p>
        </div>
        
        {galeriItems.length === 0 ? (
          <p className="text-center text-gray-600">Belum ada foto di galeri.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeriItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                <div className="relative w-full h-56">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Gagal+Muat'; }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">{item.date}</p>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1 truncate">{item.caption}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
