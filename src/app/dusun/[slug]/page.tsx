// src/app/dusun/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';
// --- PERBAIKAN: Hapus 'User' dan 'Camera' yang tidak digunakan ---
import { Home, Building, HeartHandshake, MapPin, Globe, Link as LinkIcon, TreePine, Store, Mountain, ShoppingCart } from 'lucide-react';

// Definisikan semua tipe data yang dibutuhkan
interface Aparatur { nama: string; jabatan: string; }
interface Potensi { nama: string; gambar: string; peta: string; sosmed?: string; }
interface Fasilitas { nama: string; alamat: string; peta: string; }
interface Usaha { nama: string; gambar: string; ecommerce?: string; sosmed?: string; }

interface DusunDetail {
  id: string;
  nama: string;
  kepalaDusun: string;
  urlFotoKadus: string;
  deskripsiLengkap: string;
  portalSosmed: { facebook?: string; tiktok?: string; };
  galeriFoto: string[];
  daftarRT: Aparatur[];
  daftarRW: Aparatur[];
  potensi: { sda: Potensi[]; umkm: Potensi[]; pariwisata: Potensi[]; };
  fasilitas: { pendidikan: Fasilitas[]; ibadah: Fasilitas[]; kesehatan: Fasilitas[]; };
  usaha: Usaha[];
}

// Ikon TikTok sebagai komponen SVG
const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.63-1.1-6.16-2.96-1.2-1.47-1.6-3.35-1.55-5.22.03-1.17.26-2.33.69-3.43.44-1.13 1.04-2.16 1.81-3.09.8-1.02 1.8-1.86 2.93-2.48.59-.32 1.23-.57 1.87-.78.01 2.9.01 5.8-.01 8.7.01.02.01.04.02.06.01-.22.02-.43.02-.64.01-2.87.01-5.74-.02-8.61-.02-.85-.11-1.69-.24-2.53-.18-1.18-.51-2.33-1.05-3.42-.35-.71-.8-1.36-1.33-1.94-.19-.22-.43-.41-.67-.58-.09-.06-.18-.12-.28-.17.28-.15.56-.29.85-.41 1.08-.47 2.24-.73 3.45-.77.63-.02 1.26-.02 1.89-.02.12 0 .24 0 .36.01z"></path>
  </svg>
);

export default function HalamanDetailDusun({ params }: { params: { slug: string } }) {
  const [dusun, setDusun] = useState<DusunDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.slug) return;
    const fetchDetailDusun = async () => {
      try {
        const q = query(collection(db, "dusun"), where("slug", "==", params.slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          
          let kepalaDusun = "Data tidak ditemukan";
          let urlFotoKadus = "https://placehold.co/150x150/cccccc/ffffff?text=Foto";
          
          const kadusDocId = `kepala-dusun-${dusunData.nama.toLowerCase().replace(/\s+/g, '-')}`;
          const kadusDocRef = doc(db, "perangkatDesa", kadusDocId);
          const kadusDocSnap = await getDoc(kadusDocRef);

          if (kadusDocSnap.exists()) {
            kepalaDusun = kadusDocSnap.data().nama;
            urlFotoKadus = kadusDocSnap.data().urlFoto;
          }

          const dataLengkap = {
            ...docData,
            kepalaDusun: kepalaDusun,
            urlFotoKadus: urlFotoKadus,
            daftarRT: docData.daftarRT || [],
            daftarRW: docData.daftarRW || [],
            potensi: docData.potensi || { sda: [], umkm: [], pariwisata: [] },
            fasilitas: docData.fasilitas || { pendidikan: [], ibadah: [], kesehatan: [] },
            usaha: docData.usaha || [],
            galeriFoto: docData.galeriFoto || [],
            portalSosmed: docData.portalSosmed || {}
          };
          setDusun({ id: querySnapshot.docs[0].id, ...dataLengkap } as DusunDetail);
        }
      } catch (error) { console.error("Error fetching detail dusun: ", error); }
      finally { setLoading(false); }
    };
    fetchDetailDusun();
  }, [params.slug]);

  if (loading) return <div className="text-center p-10">Memuat detail dusun...</div>;
  if (!dusun) return notFound();

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12"><h1 className="text-5xl font-extrabold text-gray-800">Dusun {dusun.nama}</h1></div>

        {/* Aparatur Wilayah */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Aparatur Wilayah</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <Image src={dusun.urlFotoKadus} alt={`Foto ${dusun.kepalaDusun}`} width={150} height={150} className="rounded-full mx-auto border-4 border-white shadow-lg" />
              <h3 className="text-2xl font-bold mt-4">{dusun.kepalaDusun}</h3>
              <p className="text-blue-600 font-semibold">Kepala Dusun</p>
            </div>
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-semibold mb-3">Ketua RW ({dusun.daftarRW.length})</h4>
                  <ul className="space-y-2 text-sm">{dusun.daftarRW.map(rw => <li key={rw.nama}>{rw.jabatan}: {rw.nama}</li>)}</ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">Ketua RT ({dusun.daftarRT.length})</h4>
                  <ul className="space-y-2 text-sm">{dusun.daftarRT.map(rt => <li key={rt.nama}>{rt.jabatan}: {rt.nama}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deskripsi & Potensi */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Deskripsi & Potensi Unggulan</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-10">{dusun.deskripsiLengkap}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PotensiKategori title="Sumber Daya Alam" data={dusun.potensi.sda} icon={<TreePine />} />
            <PotensiKategori title="UMKM" data={dusun.potensi.umkm} icon={<Store />} />
            <PotensiKategori title="Pariwisata" data={dusun.potensi.pariwisata} icon={<Mountain />} />
          </div>
        </section>
        
        {/* Direktori Usaha */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Direktori Usaha Dusun</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dusun.usaha.map(u => (
              <div key={u.nama} className="bg-white p-3 rounded-lg shadow-md text-center border">
                <Image src={u.gambar} alt={u.nama} width={200} height={200} className="w-full h-24 object-cover rounded mb-2" />
                <p className="font-bold text-sm">{u.nama}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-3 mt-2">
                  {u.ecommerce && <a href={u.ecommerce} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline"><ShoppingCart size={14} className="inline mr-1"/> E-commerce</a>}
                  {u.sosmed && <a href={u.sosmed} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline"><LinkIcon size={14} className="inline mr-1"/> Sosmed</a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portal & Galeri */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Aktivitas & Galeri</h2>
          <div className="text-center mb-8 flex justify-center gap-4">
            {dusun.portalSosmed.facebook && <a href={dusun.portalSosmed.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"><Globe /></a>}
            {dusun.portalSosmed.tiktok && <a href={dusun.portalSosmed.tiktok} target="_blank" rel="noopener noreferrer" className="bg-black text-white p-3 rounded-full hover:bg-gray-800"><TikTokIcon /></a>}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dusun.galeriFoto.map((src, i) => <Image key={i} src={src} alt={`Galeri ${i+1}`} width={400} height={400} className="rounded-lg shadow-md w-full h-full object-cover" />)}
          </div>
        </section>

        {/* Fasilitas Umum */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Fasilitas Umum</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FasilitasKategori title="Pendidikan" data={dusun.fasilitas.pendidikan} icon={<Building />} />
            <FasilitasKategori title="Ibadah" data={dusun.fasilitas.ibadah} icon={<Home />} />
            <FasilitasKategori title="Kesehatan" data={dusun.fasilitas.kesehatan} icon={<HeartHandshake />} />
          </div>
        </section>
      </div>
    </div>
  );
}

// --- PERBAIKAN: Tambahkan tipe eksplisit untuk props ---
const PotensiKategori = ({ title, data, icon }: { title: string, data: Potensi[], icon: React.ReactNode }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-xl font-semibold mb-3 flex items-center">{icon} <span className="ml-2">{title}</span></h3>
    <div className="space-y-3">
      {data.map((p: Potensi) => (
        <div key={p.nama} className="bg-white p-3 rounded shadow">
          <Image src={p.gambar} alt={p.nama} width={300} height={150} className="w-full h-32 object-cover rounded mb-2" />
          <p className="font-bold">{p.nama}</p>
          <div className="flex gap-3 mt-1">
            <a href={p.peta} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline"><MapPin size={14} className="inline"/> Peta</a>
            {p.sosmed && <a href={p.sosmed} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-500 hover:underline"><LinkIcon size={14} className="inline"/> Sosmed</a>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FasilitasKategori = ({ title, data, icon }: { title: string, data: Fasilitas[], icon: React.ReactNode }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-xl font-semibold mb-3 flex items-center">{icon} <span className="ml-2">{title}</span></h3>
    <ul className="space-y-2">
      {data.map((f: Fasilitas) => (
        <li key={f.nama} className="bg-white p-3 rounded shadow">
          <p className="font-bold">{f.nama}</p>
          <p className="text-sm text-gray-600">{f.alamat}</p>
          <a href={f.peta} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline"><MapPin size={14} className="inline"/> Lihat Peta</a>
        </li>
      ))}
    </ul>
  </div>
);
