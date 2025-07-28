// src/app/potensi-desa/page.tsx
import { Briefcase, Leaf, Users, Building2 } from 'lucide-react';

// Data diambil dari dokumen profil desa
const potensiData = {
  sumberDayaAlam: [
    { nama: 'Tanah Sawah', nilai: '132 ha' },
    { nama: 'Tanah Perkebunan', nilai: '60 ha' },
    { nama: 'Lahan Pekarangan', nilai: '40 ha' },
    { nama: 'Hutan Bambu', nilai: '4 lokasi' },
    { nama: 'Sumber Mata Air', nilai: '7 lokasi' },
    { nama: 'Batu Alam/Pasir', nilai: '6 lokasi' },
  ],
  saranaUsaha: [
    { nama: 'Warung', nilai: '75 unit' },
    { nama: 'Pengrajin Opak', nilai: '45 orang' },
    { nama: 'Pertukangan', nilai: '38 orang' },
    { nama: 'Penggilingan Padi', nilai: '4 unit' },
    { nama: 'Konveksi', nilai: '5 unit' },
    { nama: 'Bengkel', nilai: '4 unit' },
  ],
  kelembagaan: [
    { nama: 'PKK dan Kader', nilai: '53 orang' },
    { nama: 'Linmas', nilai: '35 orang' },
    { nama: 'Kelompok Tani', nilai: '6 Poktan' },
    { nama: 'Posyandu', nilai: '11 buah' },
    { nama: 'DKM', nilai: '19 unit' },
    { nama: 'Karang Taruna', nilai: 'Aktif' },
  ],
};

// Komponen untuk kartu potensi
const PotensiCard = ({ title, icon, data }: { title: string, icon: React.ReactNode, data: {nama: string, nilai: string}[] }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-2xl font-semibold ml-3 text-gray-800">{title}</h3>
    </div>
    <ul className="space-y-2">
      {data.map((item, index) => (
        <li key={index} className="flex justify-between border-b pb-2">
          <span className="text-gray-600">{item.nama}</span>
          <strong className="text-gray-900">{item.nilai}</strong>
        </li>
      ))}
    </ul>
  </div>
);

export default function HalamanPotensiDesa() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Potensi Desa Hegarmanah</h1>
          <p className="text-xl text-gray-500 mt-2">Menggali dan Mengembangkan Kekayaan Lokal</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PotensiCard title="Sumber Daya Alam" icon={<Leaf className="w-8 h-8 text-green-500" />} data={potensiData.sumberDayaAlam} />
          <PotensiCard title="Sarana Ekonomi & Usaha" icon={<Briefcase className="w-8 h-8 text-blue-500" />} data={potensiData.saranaUsaha} />
          <PotensiCard title="Kelembagaan Masyarakat" icon={<Users className="w-8 h-8 text-orange-500" />} data={potensiData.kelembagaan} />
        </div>
      </div>
    </div>
  );
}
