// src/components/DropdownMenu.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Definisikan tipe untuk setiap item di menu
type MenuItem = {
  label: string;
  href: string;
};

// Definisikan tipe untuk props komponen
type DropdownMenuProps = {
  title: string;
  items: MenuItem[];
};

export default function DropdownMenu({ title, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref untuk container dropdown

  const toggleDropdown = () => {
    setIsOpen(prev => !prev); // Toggle state saat ini
  };

  // Efek untuk menutup dropdown saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Membersihkan event listener saat komponen dibongkar
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Hanya berjalan sekali saat komponen dimuat

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown} // Menggunakan onClick untuk membuka/menutup
        className="text-gray-600 hover:text-blue-500 inline-flex items-center"
      >
        <span>{title}</span>
        <svg
          className={`fill-current h-4 w-4 ml-1 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          onClick={() => setIsOpen(false)} // Menutup dropdown saat item diklik
        >
          <div className="py-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
