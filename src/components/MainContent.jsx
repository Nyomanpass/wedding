import React, { useState, useEffect } from 'react';
import GallerySection from './main/GallerySection';
import GuestBookSection from './main/GuestBookSection';
import ClosingSection from './main/FooterSection';

// === DATA MOCKUP Tambahan ===
const backgroundImages = [
  '/undangankanan.jpg',
  '/portosatu.jpg',
  '/gambarheader.png',
];
// ==========================


const HeartHandIcon = () => (
    <svg className="w-16 h-16 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* Lingkaran Luar */}
        <circle cx="12" cy="12" r="11" />
        {/* Tangan */}
        <path d="M12 22s-4-2-4-7c0-3 3-5 3-5s-1-4 2-5 6-1 6-1 0 5 0 7c0 3-4 5-4 5z" />
        {/* Jantung */}
        <path d="M16 11c-1.5 0-3 .5-4 1.5-1-.5-2.5-1.5-4-1.5C6.5 11 5 12.5 5 14c0 3 4 5 7 7 3-2 7-4 7-7 0-1.5-1.5-3-3-3z" />
    </svg>
);

// --- Icon Sparkle untuk Bride Section ---
const SparkleIcon = () => (
    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 .5l3 7h7l-6 5 3 7-7-5-6 5 3-7-6-5h7z"/>
    </svg>
);
// ------------------------------------------

const TARGET_DATE = new Date('November 16, 2025 14:00:00').getTime();

const calculateTimeLeft = () => {
    const difference = TARGET_DATE - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            HARI: Math.floor(difference / (1000 * 60 * 60 * 24)),
            JAM: Math.floor((difference / (1000 * 60 * 60)) % 24),
            MENIT: Math.floor((difference / 1000 / 60) % 60),
            DETIK: Math.floor((difference / 1000) % 60)
        };
    } else {
        timeLeft = { HARI: 0, JAM: 0, MENIT: 0, DETIK: 0 };
    }

    const formatTime = (value) => (value.toString().length === 1 && value !== 0 ? `0${value}` : value.toString());

    return {
        HARI: formatTime(timeLeft.HARI),
        JAM: formatTime(timeLeft.JAM),
        MENIT: formatTime(timeLeft.MENIT),
        DETIK: formatTime(timeLeft.DETIK)
    };
};

const MainContent = ({ data }) => {
  // Data Undangan
  const defaultData = {
    groom: "Restu",
    bride: "Novi",
    location: "PECATU",
    date: "16 NOVEMBER 2025",
    ...data
  };

  const VEDA_BG = 'bg-[#3d4984]'; // Darker Brown untuk Section Veda
  const PRIMARY_COLOR = 'text-gray-200'; 
  const ACCENT_COLOR = 'text-amber-500'; 
  const BG_COLOR = 'bg-gray-900'; 

  const EVENT_BG_COLOR = 'bg-[#D2C5B4]'; // Warna Beige/Cokelat Muda
  const EVENT_STRIP_BG = 'bg-[#B4A790]'; // Warna strip vertikal (sedikit lebih gelap)
  const EVENT_TEXT_COLOR = 'text-[#36322A]'; // Teks cokelat tua/hitam


  // === LOGIC SLIDESHOW HEADER (6 Detik) ===
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Logic Slideshow
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % backgroundImages.length;
        return newIndex;
      });
    }, 6000); // Interval 6 detik untuk ganti gambar

    return () => clearInterval(intervalId);
  }, []); 


  return (
    <div className="pt-0 min-h-screen bg-white font-sans">
      
      {/* ========================================================= */}
      {/* SECTION HEADER (ANIMASI CROSSFADE SAJA) */}
      {/* ========================================================= */}
      <div className="relative w-full h-screen mx-auto overflow-hidden">
        
        {/* Kontainer untuk semua slide */}
        {backgroundImages.map((imageUrl, index) => {
          const isActive = index === currentImageIndex;
          
          // Class yang mengontrol Crossfade (Hanya menggunakan Opacity)
          const fadeTransitionClasses = `
            absolute inset-0 
            bg-cover bg-center
            transition-opacity duration-[1500ms] ease-in-out /* Transisi 1.5 detik */
            ${isActive 
                ? 'opacity-100' // Slide aktif: Terlihat
                : 'opacity-0'   // Slide tidak aktif: Tersembunyi
            }
          `;

          return (
            <div
              key={index}
              className={fadeTransitionClasses}
              style={{ backgroundImage: `url('${imageUrl}')` }} // Langsung terapkan gambar di sini
            >
                {/* Gradient Overlay Diletakkan Langsung di atas Gambar */}
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20"  />
            </div>
          );
        })}

        {/* Konten Teks Header (Z-Index 20 agar selalu di atas gambar) */}
        <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-6 pb-20 pt-8 text-white z-20">
          <p className="text-sm tracking-wider opacity-90 mb-1 font-sans">
            The Wedding of
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-widest leading-none uppercase">
            {defaultData.groom.toUpperCase()}
          </h1>
          <div className="w-24 h-0.5 bg-white opacity-90 my-2" />
          <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-widest leading-none uppercase mb-4">
            {defaultData.bride.toUpperCase()}
          </h1>
          <p className="text-sm tracking-widest opacity-90 font-sans">
            {defaultData.location} | {defaultData.date}
          </p>
        </div>
      </div>
      
      <section className={`w-full md:max-w-md mx-auto py-16 px-8 ${VEDA_BG} text-center`}>
            
          {/* Icon */}
          <div className="mb-10">
              <div className={`w-28 h-28 mx-auto flex items-center justify-center rounded-full border border-white/50 text-white`}>
                  <HeartHandIcon />
              </div>
          </div>

          {/* Isi Kutipan */}
          <p className={`text-lg leading-relaxed italic mx-auto max-w-sm text-white font-light mb-10`}>
              Wahai pasangan suami-istri, semoga kalian tetap bersatu dan tidak pernah terpisahkan. Semoga kalian mencapai hidup penuh kebahagiaan, tinggal di rumah yang penuh kegembiraan bersama seluruh keturunanmu.
          </p>

          {/* Sumber Kutipan */}
          <p className={`text-md font-bold tracking-wider text-white font-serif`}>
              <span className="text-xl mr-2">
                  <span role="img" aria-label="Book">📜</span>
              </span>
              RG VEDA X.85.42.
          </p>

      </section>

      <section id="welcome" className={`min-h-screen ${BG_COLOR} ${PRIMARY_COLOR} flex flex-col items-center p-8 pt-12`}>
        
        {/* OM SWASTYASTU */}
        <h1 className={`text-3xl font-serif mb-6 text-center tracking-widest text-white`}>OM SWASTYASTU</h1>
        <p className="text-center italic max-w-lg text-sm mb-12 text-gray-400">
          Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa kami bermaksud mengundang Bapak/Ibu/Saudara/i pada Upacara Manusa Yadnya Pawiwahan (Pernikahan) kami.
        </p>
        
        {/* --- THE GROOM SECTION --- */}
        <div className="flex flex-col items-center mb-16 relative">
            <div className="absolute top-1/2 -left-16 transform -translate-y-1/2 rotate-90 origin-bottom-left">
                <p className="text-sm tracking-widest text-gray-500 font-sans">
                    THE GROOM
                </p>
            </div>
            
            {/* Foto Groom */}
            <div className="w-full h-full rounded-lg  bg-gray-700 overflow-hidden mb-8 shadow-xl border border-gray-700">
                <img 
                    src="/portosatu.jpg" // GANTI DENGAN URL GAMBAR GROOM ASLI
                    alt="The Groom Restu" 
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Nama & Detail */}
            <h3 className={`text-4xl font-serif tracking-widest text-white mb-1`}>RESTU</h3>
            <p className="font-light text-xl text-white text-center">
                I Made Dwi Restu Wijaya
            </p>
            <p className="text-sm text-center max-w-xs mt-3 text-gray-400">
                Putra dari pasangan <br/>I Ketut Sarjana, SE & <br/>Ni Wayan Reni
            </p>
            <div className="w-2/3 h-px bg-gray-600 mt-4 mb-4" />
            <p className="text-sm text-center max-w-xs text-gray-400 px-4">
                Br. Dinas Tambyak, Desa Pecatu Kec. Kuta Selatan, Kab. Badung - Bali
            </p>
        </div>

        {/* --- THE BRIDE SECTION --- */}
        <div className="flex flex-col items-center mb-20 relative pt-10">
            {/* Sparkle Icon */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <SparkleIcon />
                <SparkleIcon />
            </div>

            
            
            {/* Foto Bride */}
            <div className="w-full h-full rounded-lg  bg-gray-700 overflow-hidden mb-8 shadow-xl border border-gray-700">
                <img 
                    src="/portosatu.jpg" // GANTI DENGAN URL GAMBAR BRIDE ASLI
                    alt="The Bride Novi" 
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Nama & Detail */}
            <h3 className={`text-4xl font-serif tracking-widest text-white mb-1`}>NOVI</h3>
            <p className="font-light text-xl text-white text-center">
                Novi Napiatul Farida
            </p>
            <p className="text-sm text-center max-w-xs mt-3 text-gray-400">
                Putri dari pasangan <br/>Enan Sujana (Alm) & <br/>Neneng Farida
            </p>
            <div className="w-2/3 h-px bg-gray-600 mt-4 mb-4" />
            <p className="text-sm text-center max-w-xs text-gray-400 px-4">
                Kp Sodong Kaler, Tanjung Dari, Sukaluyu, Cianjur, Jawa Barat
            </p>
        </div>
        
      </section>

        <section id="acara" className="w-full md:max-w-md mx-auto relative overflow-hidden h-[80vh]">
        
            {/* --- 4a. Background Gambar Full Overlay (Seperti Gambar) --- */}
            <div className="absolute inset-0">
                <img 
                    src="/gambarheader.png" // GANTI DENGAN URL GAMBAR UTAMA BERDUA
                    alt="Pasangan Pengantin" 
                    className="w-full h-full object-cover"
                />
                {/* Overlay Transparan (menyesuaikan warna gelap) */}
                <div className={`absolute inset-0 bg-black opacity-30`} />
            </div>

            {/* --- 4b. Strip Vertikal Kiri: WAKTU & TEMPAT (PERBAIKAN KERATAAN) --- */}
            {/* Menggunakan padding (px-2) dan menghilangkan 'origin-bottom-left' */}
            <div className={`absolute left-0 top-0 h-full w-20 ${VEDA_BG} flex items-center justify-center shadow-lg z-10`}>
                <div className={`transform -rotate-90 whitespace-nowrap text-xl tracking-widest text-white px-2`}> 
                    WAKTU & TEMPAT
                </div>
            </div>
            
            {/* --- 4c. Konten Detail Resepsi (Di tengah) --- */}
            <div className={`relative z-20 flex flex-col pl-20 items-center text-center pt-16 px-6 h-full text-white`}>
                
                {/* Kalimat Pembuka */}
                <p className="text-base italic max-w-xs mb-8">
                    Merupakan suatu kehormatan dan kebahagiaan kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
                </p>
                
                {/* Header Acara */}
                <h2 className="text-4xl font-serif tracking-widest mb-10">RESEPSI</h2>
                
                {/* Kontainer Tanggal dan Hari */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                    {/* Tanggal Besar */}
                    <span className="text-8xl font-serif leading-none opacity-80">28</span>
                    {/* Hari, Bulan, Tahun */}
                    <div className="text-left text-xl font-light">
                        Jumat, <br/>
                        Juni <br/>
                        2024
                    </div>
                </div>

                {/* Waktu dan Lokasi */}
                <p className="text-base font-bold mb-2">
                    <span className="mr-1">🕒</span> 14:00 WITA - SELESAI
                </p>
                <p className="text-base text-center max-w-xs mb-10 font-light">
                  Jl. Raya Uluwatu Gg. Kunyit Pecatu, Kec. Kuta Selatan, Kab. Badung - Bali
                </p>

                {/* Garis Pemisah */}
                <div className="w-2/3 h-px bg-white opacity-40 my-4" /> 
                {/* Diubah ke bg-white karena tema gelap */}

                {/* Tombol Map */}
                <button className={`flex items-center px-6 py-3 mt-8 ${VEDA_BG} text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition`}>
                    <span className="mr-2 text-lg">📍</span> Map Lokasi Acara
                </button>

            </div>
        </section>
        <section id="countdown" className="w-full md:max-w-md mx-auto relative overflow-hidden text-white">
          
          {/* --- Kontainer Gambar & Teks (Mengambil Sebagian Besar Layar) --- */}
          <div className="relative w-full bg-gray-900 h-[50vh] px-8 pt-28"> 
    
            {/* --- Container Gambar dengan Padding --- */}
            {/* Kelas 'p-20' yang Anda tambahkan sebelumnya dipindahkan ke sini. 
              Ganti 'px-8 py-8' sesuai seberapa besar batas yang Anda inginkan. */}
            <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                
                {/* Gambar tidak lagi absolute inset-0. Ia akan mengisi container div ini. */}
                <img 
                    src="/portosatu.jpg" // GANTI DENGAN URL GAMBAR UTAMA BERDUA
                    alt="Restu & Novi" 
                    className="w-full h-full object-cover"
                />
                
                {/* Overlay Gelap. Ia akan mengisi hanya area gambar yang baru. */}
                <div className="absolute inset-0 bg-black opacity-10" /> 
                
                {/* Konten Nama Pengantin (Di tengah area gambar yang sekarang lebih kecil) */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-6 pt-16">
                    
                    {/* ... (Konten nama pengantin) ... */}
                    
                    {/* Logo Save The Date (Posisi Disesuaikan) */}
                    <div className="absolute bottom-[-100px] right-0 text-white/30 transform translate-x-1/2">
                        <p className="transform rotate-90 whitespace-nowrap text-xl font-serif tracking-widest">
                            SAVE THE DATE | SAVE THE DATE
                        </p>
                    </div>
                </div>
            </div>
        </div>


          {/* --- Strip Bawah (Warna Beige/Cokelat Muda - Teks Gelap) --- */}
          <div className={`relative w-full py-16 px-8 bg-gray-900 text-white text-center h-[25%]`}>
              
              {/* 🚨 Countdown Timer (Positioning ABSOLUTE) */}
              {/* Ditempatkan di tengah-tengah perbatasan dua div (Gambar dan Strip) */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-xs md:max-w-sm">
                  <div className="flex w-full justify-between">
                      {Object.entries(timeLeft).map(([label, value]) => (
                          <div 
                              key={label} 
                              // Menggunakan warna latar solid cokelat/emas sesuai referensi
                              className={`flex flex-col items-center ${VEDA_BG} p-3 w-1/4 mx-1 rounded-lg text-white shadow-xl`}
                          >
                              <span className="text-3xl font-serif font-bold">{value}</span>
                              <span className="text-xs mt-1 opacity-90">{label}</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Konten Teks di Strip */}
              <div className="pt-2"> {/* Tambah padding atas untuk mengimbangi timer */}
                  <p className="text-base text-gray-300 font-bold tracking-widest mb-4">
                      {defaultData.location.toUpperCase()} | 16 NOVEMBER 2025
                  </p>

                  <p className="text-sm text-gray-400 italic max-w-sm mx-auto leading-relaxed">
                      Pernikahan yang hebat bukanlah ketika 'pasangan sempurna' bersatu. Tapi disaat pasangan yang tidak sempurna belajar untuk menikmati perbedaan mereka.
                  </p>
              </div>
              
             
          </div>
      </section>
      <GallerySection/>
      <GuestBookSection/>
      <ClosingSection/>
    </div>
  );
};


export default MainContent;