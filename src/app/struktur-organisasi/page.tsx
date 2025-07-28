// src/app/struktur-organisasi/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
// --- TAMBAHKAN 'query' dan 'orderBy' ---
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface Perangkat {
  id: string;
  nama: string;
  jabatan: string;
  urlFoto: string;
  urutan: number; // Pastikan tipe data urutan adalah number
}

export default function HalamanStrukturOrganisasi() {
  const [perangkatDesa, setPerangkatDesa] = useState<Perangkat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilData = async () => {
      try {
        // --- PERBAIKAN UTAMA DI SINI ---
        // Membuat query untuk mengambil data dan mengurutkannya berdasarkan field 'urutan'
        // 'asc' berarti mengurutkan dari yang terkecil ke terbesar (ascending)
        const q = query(collection(db, "perangkatDesa"), orderBy("urutan", "asc"));
        
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Perangkat));
        setPerangkatDesa(data);
      } catch (error) {
        console.error("Error mengambil data perangkat desa: ", error);
      } finally {
        setLoading(false);
      }
    };
    ambilData();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Memuat data...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Struktur Perangkat Desa Hegarmanah</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {perangkatDesa.map((perangkat) => (
          <div key={perangkat.id} className="bg-white rounded-lg shadow-lg text-center overflow-hidden">
            <img 
              src={perangkat.urlFoto} 
              alt={`Foto ${perangkat.nama}`}
              className="w-full h-72 object-cover object-center" 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{perangkat.nama}</h2>
              <p className="text-blue-500">{perangkat.jabatan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
