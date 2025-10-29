import React from 'react';

// --- Komponen Logo Ishana (Placeholder yang disesuaikan) ---
const IshanaLogo = ({ ACCENT_COLOR }) => (
    <svg 
        className={`w-8 h-8 mx-auto ${ACCENT_COLOR}`} 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 18c-2.8-.46-5-2.91-5-5.93 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.02-2.2 5.47-5 5.93V17l-1 1v2z"/>
        <circle cx="12" cy="7" r="1.5" />
    </svg>
);


// --- Komponen Utama Footer Final ---
// Menggunakan nama komponen 'FooterSection' seperti di kode Anda.
const FooterSection = ({ BG_COLOR, PRIMARY_COLOR, ACCENT_COLOR, groom, bride, location, date }) => {
    
    // Warna strip bawah yang solid
    const BOTTOM_STRIP_BG = 'bg-black'; 

    return (
        <section id="final-footer" className={`w-full md:max-w-md mx-auto relative overflow-hidden h-[90vh] text-white`}>
            
            {/* --- Bagian Atas: Gambar Latar Belakang & Teks --- */}
            <div className="relative w-full h-[70%]"> {/* Mengambil 70% tinggi section */}
                <img 
                    src="/undangankanan.jpg" // GANTI DENGAN GAMBAR PRE-WEDDING UTAMA ANDA
                    alt="Restu & Novi Closing" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay Gelap dengan Gradien di bawah (sesuai desain) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> 
                
                {/* Konten Teks di Atas Gambar */}
                <div className="absolute bottom-0 left-0 w-full text-center pb-8 z-10">
                    <h1 className={`text-6xl font-bold font-serif tracking-widest leading-none uppercase ${PRIMARY_COLOR}`}>{groom} & {bride}</h1>
                    
                    {/* PERBAIKAN: Menggunakan teks biasa dengan fallback */}
                    <p className={`text-sm tracking-widest opacity-90 font-sans mt-2 uppercase`}>
                        {location || "LOKASI"} | {date || "TANGGAL"}
                    </p>
                </div>
            </div>

            {/* --- Bagian Bawah: Strip Hitam dengan Logo & Kredit --- */}
            <div className={`relative w-full h-[30%] ${BOTTOM_STRIP_BG} ${PRIMARY_COLOR} text-center py-6 flex flex-col justify-center items-center`}>
                
                {/* Logo Ishana */}
                <IshanaLogo ACCENT_COLOR={ACCENT_COLOR} />
                
                {/* Teks Ishana Make Up Artiste (Nama Brand) */}
                <h3 className={`text-2xl font-serif mt-2 tracking-widest leading-tight ${ACCENT_COLOR}`}>
                    ishana
                </h3>
                <p className={`text-[9px] -mt-1 mb-4 tracking-widest ${PRIMARY_COLOR} opacity-70 uppercase`}>
                    make up artiste
                </p>

                {/* Kredit Vendor */}
                <p className="text-xs tracking-wider mb-1 opacity-90">
                    Make Up & Wardrobe by
                </p>
                <p className="text-xs font-semibold opacity-90">
                    Ishana MUA
                </p>
                
                {/* Icon Musik */}
                <div className="absolute bottom-4 right-4">
                    <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-xs">🎶</span>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;
