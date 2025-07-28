// src/components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link'; // Impor komponen Link

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const kknGroupName = "Kelompok KKN 39 Desa Hegarmanah Universitas Nusa Putra"; 
  const kknLogoPath = "/logo/logo.png";

  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-6 py-8 text-center text-gray-600">
        
        {/* Bagian Credit KKN dengan modifikasi */}
        <div className="mb-6">
          <p className="text-base mb-3">Website ini dikembangkan oleh:</p>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Image 
              src={kknLogoPath}
              alt="Logo KKN"
              width={55}
              height={55}
            />
            {/* Hanya teks nama kelompok yang menjadi link */}
            <Link href="/kkn-credit" className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              {kknGroupName}
            </Link>
          </div>
        </div>

        <hr className="border-gray-200 w-1/2 mx-auto mb-6" />

        <p className="text-sm">&copy; {currentYear} Pemerintah Desa Hegarmanah. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
