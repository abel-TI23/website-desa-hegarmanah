// src/app/peta/page.tsx

export default function HalamanPeta() {
  // Ganti kode iframe di bawah ini dengan kode yang Anda salin dari Google Maps
  const googleMapsEmbedCode = `
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.693096620636!2d106.81721947410671!3d-6.927240267803319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e683732909979a9%3A0xb77e959b178d107e!2sKantor%20Desa%20Hegarmanah!5e0!3m2!1sid!2sid!4v1752234382098!5m2!1sid!2sid" 
      width="100%" 
      height="600" 
      style={{ border: 0 }} 
      allowFullScreen={true} 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade">
    </iframe>
  `;
  
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Peta Wilayah Desa Hegarmanah</h1>

      <div 
        className="w-full rounded-lg shadow-lg overflow-hidden"
        dangerouslySetInnerHTML={{ __html: googleMapsEmbedCode }}
      />
    </div>
  );
}

