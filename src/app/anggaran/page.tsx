// src/app/anggaran/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// 1. Definisikan struktur data anggaran yang lengkap
interface AnggaranData {
  id: string;
  tahun: number;
  totalPendapatan: number;
  totalBelanja: number;
  surplusDefisit: number;
  linkDokumen: string;
  pendapatan: {
    asliDesa: number;
    transfer: number;
  };
  belanja: {
    pemerintahan: number;
    pembangunan: number;
    pembinaan: number;
    pemberdayaan: number;
    bencana: number;
  };
}

// Komponen untuk menampilkan kartu info utama
const InfoCard = ({ title, value, color }: { title: string, value: string, color: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4" style={{ borderColor: color }}>
        <p className="text-lg text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
);

// Fungsi untuk memformat angka menjadi format Rupiah
const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
};

export default function HalamanAnggaran() {
    const [anggaran, setAnggaran] = useState<AnggaranData | null>(null);
    const [loading, setLoading] = useState(true);

    // 2. Mengambil data anggaran terbaru dari Firebase
    useEffect(() => {
        const fetchAnggaran = async () => {
            try {
                // Query untuk mengambil 1 dokumen terbaru berdasarkan tahun
                const q = query(collection(db, "anggaranDesa"), orderBy("tahun", "desc"), limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    setAnggaran({ id: querySnapshot.docs[0].id, ...docData } as AnggaranData);
                }
            } catch (error) {
                console.error("Error fetching anggaran data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnggaran();
    }, []);

    if (loading) {
        return <div className="text-center p-10">Memuat data anggaran...</div>;
    }

    if (!anggaran) {
        return <div className="text-center p-10">Data anggaran belum tersedia.</div>;
    }

    // 3. Tampilan halaman yang dinamis
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">Transparansi Anggaran Desa Hegarmanah</h1>
                    <p className="text-xl text-gray-500 mt-2">Anggaran Pendapatan dan Belanja Desa (APBDes) Tahun {anggaran.tahun}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <InfoCard title="Total Pendapatan" value={formatRupiah(anggaran.totalPendapatan)} color="#3498db" />
                    <InfoCard title="Total Belanja" value={formatRupiah(anggaran.totalBelanja)} color="#e74c3c" />
                    <InfoCard title="Surplus / Defisit" value={formatRupiah(anggaran.surplusDefisit)} color="#2ecc71" />
                </div>

                {/* Rincian Pendapatan dan Belanja */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Rincian Pendapatan</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between"><span>Pendapatan Asli Desa (PADes)</span> <strong>{formatRupiah(anggaran.pendapatan.asliDesa)}</strong></li>
                            <li className="flex justify-between"><span>Pendapatan Transfer</span> <strong>{formatRupiah(anggaran.pendapatan.transfer)}</strong></li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Alokasi Belanja per Bidang</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between"><span>Penyelenggaraan Pemerintahan</span> <strong>{formatRupiah(anggaran.belanja.pemerintahan)}</strong></li>
                            <li className="flex justify-between"><span>Pelaksanaan Pembangunan</span> <strong>{formatRupiah(anggaran.belanja.pembangunan)}</strong></li>
                            <li className="flex justify-between"><span>Pembinaan Kemasyarakatan</span> <strong>{formatRupiah(anggaran.belanja.pembinaan)}</strong></li>
                            <li className="flex justify-between"><span>Pemberdayaan Masyarakat</span> <strong>{formatRupiah(anggaran.belanja.pemberdayaan)}</strong></li>
                            <li className="flex justify-between"><span>Penanggulangan Bencana</span> <strong>{formatRupiah(anggaran.belanja.bencana)}</strong></li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Dokumen Lengkap APBDes</h2>
                    <p className="text-gray-600 mb-6">
                        Untuk rincian lengkap, silakan unduh dokumen resmi Peraturan Desa Hegarmanah.
                    </p>
                    <a 
                        href={anggaran.linkDokumen} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 inline-block"
                    >
                        Unduh Dokumen (PDF)
                    </a>
                </div>
            </div>
        </div>
    );
}
