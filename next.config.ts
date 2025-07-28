/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan konfigurasi gambar di sini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Anda bisa menambahkan domain lain di sini di masa depan
      // contohnya untuk Imgur atau Firebase Storage
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
