import React, { useState, useEffect } from 'react';
import CoverSection from './CoverSection';
import MainContent from './MainContent';

// Data statis untuk undangan
const weddingData = {
  groom: "Restu",
  bride: "Novi",
  date: "28 Juni 2024",
  location: "Pecatu",
  to: "alumni sd4"
};

const WeddingApp = () => {
  const [isOpened, setIsOpened] = useState(false);

  // Efek untuk mengontrol scroll pada body HTML
  // Mencegah scroll pada body saat cover aktif, dan mengembalikannya saat cover hilang.
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      // Izinkan body scroll, tapi di desktop scroll dilakukan di div kanan.
      document.body.style.overflow = 'auto'; 
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpened]);

  // Fungsi yang dipanggil saat tombol "Buka Undangan" diklik
  const handleOpen = () => {
    // Memberi sedikit delay agar transisi CSS selesai
    setTimeout(() => {
        setIsOpened(true);
    }, 100); 
  };

  return (
    <div className="relative min-h-screen font-sans">
      
      {/* 1. Cover/Overlay (Selalu di atas) */}
      <CoverSection 
        data={weddingData} 
        isOpened={isOpened} 
        onOpen={handleOpen} 
      />

      {/* 2. TATA LETAK UTAMA SPLIT SCREEN (Desktop) / FULL SCROLL (Mobile) */}
      {/* md:flex-row: Desktop split screen | flex-col: Mobile tumpuk */}
      <div className="flex flex-col md:flex-row min-h-screen">
          
          {/* Kolom Kiri: Gambar Tetap (Hanya Muncul di Desktop) */}
          <div 
            className="hidden md:block md:w-5/12 lg:w-4/12 h-screen sticky top-0" 
            style={{
              // Gambar Utama yang Fixed
              backgroundImage: "url('https://satu-moment.com/wp-content/uploads/2023/12/DSC07137-scaled-e1703649642938.jpg')", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-8 text-white">
                 <h2 className="text-4xl font-serif">The Wedding of {weddingData.groom} & {weddingData.bride}</h2> 
              </div>
          </div>
          
          {/* Kolom Kanan: Konten Utama (Scrollable) */}
          {/* md:h-screen & md:overflow-y-auto -> Hanya scroll di kanan saat Desktop */}
          {/* w-full -> Ambil lebar penuh di Mobile */}
          <div className="w-full md:w-7/12 lg:w-8/12 md:h-screen md:overflow-y-auto bg-gray-50">
              <MainContent data={weddingData} />
          </div>

      </div>
    </div>
  );
};

export default WeddingApp;
