import React, { useState, useEffect } from 'react';
import CoverSection from './components/CoverSection';
import MainContent from './components/MainContent';


const weddingData = {
  groom: "Restu",
  bride: "Novi",
  date: "28 Juni 2024",
  location: "Pecatu",
  to: "alumni sd4"
};


const App = () => {
  const [isOpened, setIsOpened] = useState(false);

  // Efek untuk mengontrol scroll pada body HTML
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpened]);

  const handleOpen = () => {
    setTimeout(() => {
        setIsOpened(true);
    }, 100); 
  };

  return (
    <div className="relative min-h-screen font-sans bg-gray-900 md:bg-gray-50">
      
      {/* 1. Cover/Overlay (Z-50) */}
      <CoverSection 
        data={weddingData} 
        isOpened={isOpened} 
        onOpen={handleOpen} 
      />

      {/* 2. TATA LETAK UTAMA (Split Screen di Desktop) */}
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
          <div className="w-full md:w-7/12 lg:w-8/12 md:h-screen md:overflow-y-auto bg-gray-50">
              <MainContent data={weddingData} />
          </div>

      </div>
    </div>
  );
};

export default App;
