// src/app/kalender/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Calendar, MapPin } from 'lucide-react';

// Definisikan struktur data untuk setiap kegiatan
interface Kegiatan {
  id: string;
  nama: string;
  lokasi: string;
  deskripsi: string;
  // Di Firestore, tanggal akan disimpan sebagai string format YYYY-MM-DD
  // agar mudah diurutkan
  tanggal: string; 
}

export default function HalamanKalender() {
  const [kegiatanDesa, setKegiatanDesa] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        // Query untuk mengambil data dan mengurutkannya dari yang paling baru
        const q = query(collection(db, "kalenderKegiatan"), orderBy("tanggal", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Kegiatan));
        setKegiatanDesa(data);
      } catch (error) {
        console.error("Error fetching kegiatan data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKegiatan();
  }, []);

  // Fungsi untuk memformat tanggal agar lebih mudah dibaca
  const formatTanggal = (tanggalString: string) => {
    const [year, month, day] = tanggalString.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center p-10">Memuat kalender kegiatan...</div>;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Kalender Kegiatan Desa</h1>
          <p className="text-xl text-gray-500 mt-2">Jadwal Acara dan Aktivitas di Desa Hegarmanah</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {kegiatanDesa.length === 0 ? (
            <p className="text-center">Belum ada kegiatan yang dijadwalkan.</p>
          ) : (
            kegiatanDesa.map((kegiatan) => (
              <div key={kegiatan.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <p className="ml-2 text-base font-semibold text-blue-600">{formatTanggal(kegiatan.tanggal)}</p>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{kegiatan.nama}</h2>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{kegiatan.lokasi}</span>
                </div>
                <p className="text-gray-700">
                  {kegiatan.deskripsi}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
