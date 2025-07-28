// src/components/AnggaranChart.tsx

// Tipe data untuk props komponen
type AnggaranChartProps = {
  data: {
    pemerintahan: number;
    pembangunan: number;
    pembinaan: number;
    pemberdayaan: number;
    bencana: number;
  };
};

// Komponen untuk menampilkan satu baris diagram batang
const ChartBar = ({ label, value, percentage, color }: { label: string, value: string, percentage: number, color: string }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div 
        className="h-4 rounded-full" 
        style={{ width: `${percentage}%`, backgroundColor: color }}
      ></div>
    </div>
  </div>
);

export default function AnggaranChart({ data }: AnggaranChartProps) {
  const totalBelanja = Object.values(data).reduce((sum, value) => sum + value, 0);

  if (totalBelanja === 0) return null;

  const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

  const chartData = [
    { label: "Pemerintahan", value: data.pemerintahan, color: "#3498db" },
    { label: "Pembangunan", value: data.pembangunan, color: "#2ecc71" },
    { label: "Pembinaan", value: data.pembinaan, color: "#e74c3c" },
    { label: "Pemberdayaan", value: data.pemberdayaan, color: "#9b59b6" },
    { label: "Bencana", value: data.bencana, color: "#f1c40f" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Visualisasi Alokasi Belanja</h3>
      {chartData.map(item => (
        <ChartBar
          key={item.label}
          label={item.label}
          value={formatRupiah(item.value)}
          percentage={(item.value / totalBelanja) * 100}
          color={item.color}
        />
      ))}
    </div>
  );
}
