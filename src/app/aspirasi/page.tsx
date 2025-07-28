// src/app/aspirasi/page.tsx
import { MessageSquarePlus } from 'lucide-react';

// --- GANTI DENGAN LINK GOOGLE FORM ASPIRASI ANDA ---
const GOOGLE_FORM_LINK = "https://forms.gle/a6X2P4RojbYt7h8NA";

export default function HalamanAspirasi() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          
          <MessageSquarePlus className="w-16 h-16 mx-auto text-blue-500 mb-4" />

          <h1 className="text-4xl font-bold text-gray-800">Saluran Aspirasi Warga</h1>
          <p className="text-xl text-gray-500 mt-4">
            Kami percaya bahwa partisipasi aktif warga adalah kunci kemajuan desa. Gunakan formulir ini untuk menyampaikan saran, masukan, atau laporan Anda secara langsung kepada Pemerintah Desa Hegarmanah.
          </p>

          <div className="mt-10">
            <a 
              href={GOOGLE_FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 inline-block text-lg"
            >
              Isi Formulir Aspirasi
            </a>
          </div>

          <div className="mt-12 text-left bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2">Bagaimana Aspirasi Anda Diproses?</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Setiap masukan yang Anda kirimkan akan diterima dan dicatat langsung oleh tim kami.</li>
              <li>Aspirasi Anda akan ditinjau dan dibahas dalam rapat internal perangkat desa.</li>
              <li>Terima kasih atas partisipasi Anda dalam membangun Desa Hegarmanah yang lebih baik.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
