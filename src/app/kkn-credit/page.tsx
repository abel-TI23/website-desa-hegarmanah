// src/app/kkn-credit/page.tsx
import Image from 'next/image';

// --- GANTI DATA DI BAWAH INI DENGAN DATA KELOMPOK ANDA ---
const kknInfo = {
  groupName: "Kelompok KKN 39 Desa Hegarmanah",
  universityName: "Universitas Nusa Putra",
  universityLogo: "/logo/logo.png", // Pastikan path logo benar
  groupPhoto: "https://placehold.co/800x400/cccccc/ffffff?text=Foto+Kelompok+KKN",
  description: "Website ini merupakan program kerja utama dari Kelompok KKN 39 sebagai bentuk pengabdian kepada masyarakat Desa Hegarmanah. Kami berharap website ini dapat menjadi pusat informasi yang bermanfaat, transparan, dan membantu memajukan potensi desa.",
  members: [
    "Nama Anggota 1 - Ketua Kelompok",
    "Nama Anggota 2 - Anggota",
    "Nama Anggota 3 - Anggota",
    "Nama Anggota 4 - Anggota",
    "Nama Anggota 5 - Anggota",
    // Tambahkan semua anggota kelompok Anda
  ]
};

export default function HalamanKreditKKN() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <Image 
              src={kknInfo.universityLogo}
              alt="Logo Universitas"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold text-gray-800">{kknInfo.groupName}</h1>
            <p className="text-xl text-gray-600">{kknInfo.universityName}</p>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-lg p-8 mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">{kknInfo.description}</p>
          </div>
          
          <div className="mb-10">
            <Image
                src={kknInfo.groupPhoto}
                alt="Foto Kelompok KKN"
                width={800}
                height={400}
                className="rounded-lg shadow-md w-full"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-center mb-6">Anggota Kelompok</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              {kknInfo.members.map((member, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <p className="font-medium text-gray-800">{member}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
