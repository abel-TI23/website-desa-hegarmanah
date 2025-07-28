// src/components/CardSkeleton.tsx

// Komponen ini akan menampilkan placeholder kartu dengan animasi pulsing
const CardSkeleton = () => (
  <div className="border rounded-lg p-6 shadow-lg bg-white">
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="bg-gray-200 h-40 w-full rounded-md"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
      </div>
    </div>
  </div>
);

// Komponen untuk menampilkan beberapa skeleton sekaligus
export const SkeletonGrid = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);
