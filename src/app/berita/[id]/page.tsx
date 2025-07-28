// src/app/berita/[id]/page.tsx

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Berita {
  id: string;
  judul: string;
  isi: string | string[];
  urlGambar?: string;
  tanggal: { seconds: number; nanoseconds?: number };
}

type DetailBeritaPageProps = {
  params: Promise<{ id: string }>;
};

async function getBeritaById(id: string): Promise<Berita | null> {
  const docRef = doc(db, 'berita', id);
  const snap = await getDoc(docRef);
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Berita) : null;
}

function formatTanggal(timestamp: { seconds: number }) {
  return new Date(timestamp.seconds * 1000).toLocaleDateString('id‑ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function DetailBeritaPage(props: DetailBeritaPageProps) {
  const { id } = await props.params;  // ✨ await params untuk mengakses id
  const berita = await getBeritaById(id);

  if (!berita) notFound();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {berita.urlGambar && (
          <img
            src={berita.urlGambar}
            alt={berita.judul}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        <div className="p-6 md:p-10">
          <div className="mb-6">
            <Link href="/berita" className="text-blue-500 hover:underline">
              &larr; Kembali ke Daftar Berita
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            {berita.judul}
          </h1>
          <p className="text-gray-500 mt-2 mb-6">
            Dipublikasikan pada {formatTanggal(berita.tanggal)}
          </p>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            {Array.isArray(berita.isi)
              ? berita.isi.map((par, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: par }} />
                ))
              : <p dangerouslySetInnerHTML={{ __html: berita.isi }} />}
          </div>
        </div>
      </article>
    </div>
  );
}
