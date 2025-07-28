// src/components/Header.tsx
import Link from 'next/link';
import DropdownMenu from './DropdownMenu'; // Impor komponen dropdown

export default function Header() {
  // Definisikan item untuk setiap dropdown
  const profilItems = [
    { label: 'Visi, Misi, Sejarah & Wilayah', href: '/profil-desa' },
    { label: 'Perangkat Desa', href: '/struktur-organisasi' },
    { label: 'Data & Statistik', href: '/data-desa' },
    { label: 'Potensi Desa', href: '/potensi-desa' }, // Link baru
    { label: 'Peta Desa', href: '/peta' },
    { label: 'Informasi Dusun', href: '/dusun' }
  ];

  const layananItems = [
    { label: 'Transparansi Anggaran', href: '/anggaran' },
    { label: 'Kalender Kegiatan', href: '/kalender' },
    { label: 'Aspirasi Warga', href: '/aspirasi' },
    { label: 'Galeri', href: '/galeri' },

  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Desa Hegarmanah
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li><Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link></li>
            <li><DropdownMenu title="Profil" items={profilItems} /></li>
            <li><DropdownMenu title="Layanan" items={layananItems} /></li>
            <li><Link href="/berita" className="text-gray-600 hover:text-blue-500">Berita</Link></li>
            <li><Link href="/usaha" className="text-gray-600 hover:text-blue-500">Usaha Warga</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
