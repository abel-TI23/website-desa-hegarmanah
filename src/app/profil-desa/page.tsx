// src/app/profil-desa/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Target, Eye, BookOpen, MapPin } from 'lucide-react';

// Definisikan struktur data yang lebih sederhana
interface ProfilData {
  visi: string;
  misi: string; // Misi sekarang adalah satu blok teks
  sejarah: string; // Sejarah sekarang adalah satu blok teks
  batasUtara: string;
  batasTimur: string;
  batasSelatan: string;
  batasBarat: string;
}

export default function HalamanProfilDesa() {
  const [profil, setProfil] = useState<ProfilData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const docRef = doc(db, "profilDesa", "dataUtama");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfil(docSnap.data() as ProfilData);
        }
      } catch (error) {
        console.error("Error fetching profil data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfil();
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Profil Desa Hegarmanah</h1>

        {/* Bagian Visi & Misi */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-6">Visi & Misi</h2>
          {loading ? (
            <p className="text-center text-gray-500">Memuat Visi & Misi...</p>
          ) : profil ? (
            <div className="space-y-8">
              <div className="bg-blue-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-3"><Eye className="w-8 h-8 text-blue-500" /><h3 className="text-2xl font-bold ml-3 text-blue-800">Visi</h3></div>
                <p className="text-gray-700 italic">"{profil.visi}"</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-3"><Target className="w-8 h-8 text-green-500" /><h3 className="text-2xl font-bold ml-3 text-green-800">Misi</h3></div>
                {/* 'whitespace-pre-line' akan menjaga baris baru dari Google Form */}
                <p className="text-white-700 whitespace-pre-line">{profil.misi}</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Visi & Misi belum tersedia.</p>
          )}
        </section>

        {/* Bagian Sejarah Desa */}
        <section className="mb-12">
          <div className="flex items-center border-b-2 border-blue-500 pb-2 mb-6">
            <BookOpen className="w-8 h-8 text-gray-700" />
            <h2 className="text-3xl font-semibold text-gray-700 ml-3">Sejarah Desa</h2>
          </div>
          {loading ? <p>Memuat Sejarah...</p> : profil ? (
            <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
              {profil.sejarah}
            </div>
          ) : <p>Sejarah belum tersedia.</p>}
        </section>

        {/* Bagian Batas Wilayah */}
        <section>
          <div className="flex items-center border-b-2 border-blue-500 pb-2 mb-6">
            <MapPin className="w-8 h-8 text-gray-700" />
            <h2 className="text-3xl font-semibold text-gray-700 ml-3">Wilayah & Batas Administratif</h2>
          </div>
          {loading ? <p>Memuat Batas Wilayah...</p> : profil ? (
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <ul className="space-y-3 text-lg">
                <li className="flex items-start"><strong className="w-36 flex-shrink-0">Sebelah Utara</strong>: <span className="ml-2">{profil.batasUtara}</span></li>
                <li className="flex items-start"><strong className="w-36 flex-shrink-0">Sebelah Timur</strong>: <span className="ml-2">{profil.batasTimur}</span></li>
                <li className="flex items-start"><strong className="w-36 flex-shrink-0">Sebelah Selatan</strong>: <span className="ml-2">{profil.batasSelatan}</span></li>
                <li className="flex items-start"><strong className="w-36 flex-shrink-0">Sebelah Barat</strong>: <span className="ml-2">{profil.batasBarat}</span></li>
              </ul>
            </div>
          ) : <p>Data Batas Wilayah belum tersedia.</p>}
        </section>

      </div>
    </div>
  );
}
