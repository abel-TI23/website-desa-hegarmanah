// src/components/ErrorMessage.tsx
import { AlertTriangle } from 'lucide-react';

type ErrorMessageProps = {
  message?: string;
};

export default function ErrorMessage({ message = "Gagal memuat data. Silakan coba lagi nanti." }: ErrorMessageProps) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center" role="alert">
      <AlertTriangle className="w-6 h-6 mr-3" />
      <div>
        <p className="font-bold">Terjadi Masalah</p>
        <p>{message}</p>
      </div>
    </div>
  );
}
