// src/app/dusun/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

interface Dusun {
  id: string;
  nama: string;
  slug: string;
  kepalaDusun: string;
  urlFotoUtama: string;
  deskripsiSingkat: string;
}

// --- FUNGSI BANTUAN YANG DIPERBAIKI ---
// Fungsi ini akan "membongkar" format data dari Firestore
// menjadi objek JavaScript yang bersih dan mudah digunakan.
function unwrapFirestoreData(data: any): any {
  if (!data) return data;

  // Cek apakah ini wrapper untuk tipe data primitif
  if (data.stringValue !== undefined) return data.stringValue;
  if (data.integerValue !== undefined) return parseInt(data.integerValue, 10);
  if (data.doubleValue !== undefined) return data.doubleValue;
  if (data.booleanValue !== undefined) return data.booleanValue;
  if (data.nullValue !== undefined) return null;

  // Cek apakah ini wrapper untuk Array
  if (data.arrayValue?.values) {
    return data.arrayValue.values.map(unwrapFirestoreData);
  }

  // Cek apakah ini wrapper untuk Map (objek bersarang)
  if (data.mapValue?.fields) {
    const unwrappedObject: { [key: string]: any } = {};
    for (const key in data.mapValue.fields) {
      unwrappedObject[key] = unwrapFirestoreData(data.mapValue.fields[key]);
    }
    return unwrappedObject;
  }

  // Jika bukan tipe di atas, anggap ini adalah objek dokumen itu sendiri.
  // Ulangi proses untuk setiap properti di dalamnya.
  if (typeof data === 'object') {
    const unwrappedObject: { [key: string]: any } = {};
    for (const key in data) {
      unwrappedObject[key] = unwrapFirestoreData(data[key]);
    }
    return unwrappedObject;
  }

  return data;
}


// Komponen Skeleton Loading yang lebih baik untuk halaman daftar
const ListSkeleton = () => (
    <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mt-4 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gray-200 w-full h-56 animate-pulse"></div>
                    <div className="p-5">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 mt-1 animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


export default function HalamanDaftarDusun() {
  const [daftarDusun, setDaftarDusun] = useState<Dusun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDusunData = async () => {
      try {
        const [dusunSnapshot, perangkatSnapshot] = await Promise.all([
          getDocs(query(collection(db, "dusun"), orderBy("nama"))),
          getDocs(collection(db, "perangkatDesa"))
        ]);

        const perangkatMap = new Map<string, string>();
        perangkatSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.jabatan && data.nama) {
            perangkatMap.set(data.jabatan, data.nama);
          }
        });

        const data = dusunSnapshot.docs.map(doc => {
          // "Bongkar" data mentah menjadi objek JavaScript yang bersih
          const dusunData = unwrapFirestoreData(doc.data());
          
          // Sekarang dusunData.nama adalah string, logika ini aman
          const jabatanKadus = "Kepala Dusun " + dusunData.nama;
          const namaKepalaDusun = perangkatMap.get(jabatanKadus) || "Data tidak ditemukan";
          
          return {
            id: doc.id,
            ...dusunData,
            kepalaDusun: namaKepalaDusun,
          } as Dusun;
        });

        setDaftarDusun(data);

      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDusunData();
  }, []);

  if (loading) {
    return <ListSkeleton />;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Wilayah Dusun Desa Hegarmanah</h1>
          <p className="text-xl text-gray-500 mt-2">Kenali lebih dekat setiap wilayah di desa kita.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarDusun.map((dusun) => (
            // Sekarang dusun.slug adalah string, link ini akan bekerja dengan benar
            <Link key={dusun.id} href={`/dusun/${dusun.slug}`} className="block group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform hover:-translate-y-2 transition-transform duration-300">
                <div className="relative w-full h-56">
                  <Image
                    src={dusun.urlFotoUtama}
                    alt={`Foto ${dusun.nama}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">{dusun.nama}</h2>
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Kepala Dusun: {dusun.kepalaDusun}</span>
                  </div>
                  <p className="text-gray-600 mt-3 text-sm">
                    {dusun.deskripsiSingkat}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
