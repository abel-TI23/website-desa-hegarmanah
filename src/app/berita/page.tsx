// src/app/berita/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';

// Impor komponen baru
import { SkeletonGrid } from '@/components/CardSkeleton';
import ErrorMessage from '@/components/ErrorMessage';
import Pagination from '@/components/pagination';

// Definisikan struktur data untuk Berita
interface Berita {
  id: string;
  judul: string;
  ringkasan: string;
  urlGambar?: string;
  tanggal: {
    seconds: number;
    nanoseconds: number;
  };
}

const ITEMS_PER_PAGE = 6; // Tampilkan 6 berita per halaman

export default function HalamanDaftarBerita() {
  const [semuaBerita, setSemuaBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const ambilData = async () => {
      try {
        const q = query(collection(db, "berita"), orderBy("tanggal", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Berita));
        setSemuaBerita(data);
      } catch (err) {
        setError("Gagal mengambil data berita dari server.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    ambilData();
  }, []);

  // Logika Paginasi
  const totalPages = Math.ceil(semuaBerita.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const beritaSaatIni = semuaBerita.slice(startIndex, endIndex);

  const formatTanggal = (timestamp: { seconds: number }) => {
    return new Date(timestamp.seconds * 1000).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  const renderContent = () => {
    if (loading) {
      return <SkeletonGrid count={6} />;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (beritaSaatIni.length === 0) {
      return <p className="text-center">Belum ada berita yang dipublikasikan.</p>;
    }
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beritaSaatIni.map((berita) => (
            <Link key={berita.id} href={`/berita/${berita.id}`} className="block group">
              <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {berita.urlGambar && (
                  <div className="relative w-full h-48">
                    <img 
                      src={berita.urlGambar} 
                      alt={berita.judul}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm text-gray-500 mb-2">{formatTanggal(berita.tanggal)}</p>
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors flex-grow">
                    {berita.judul}
                  </h2>
                  <span className="text-blue-500 font-semibold mt-4 inline-block">
                    Baca Selengkapnya &rarr;
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </>
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Berita Desa Hegarmanah</h1>
      {renderContent()}
    </div>
  );
}
