// GallerySection.jsx

import React from 'react';

// --- Komponen Pembantu untuk Galeri (Diperbarui untuk Tampilan Paling Smooth) ---
const GalleryItem = ({ src, alt }) => (
    // PENYESUAIAN: MENGHILANGKAN SEMUA BORDER
    // Menggunakan group dan shadow halus pada hover untuk kesan smooth
    <div className="w-full overflow-hidden group"> 
        <img 
            src={src} 
            alt={alt} 
            // Efek transisi diperhalus dengan duration-700
            // Efek shadow hanya muncul saat hover (shadow-xl hover:shadow-2xl)
            className="w-full h-full object-cover 
                       transition-all duration-700 ease-in-out 
                       group-hover:scale-[1.03] 
                       group-hover:shadow-2xl rounded-lg" 
                       
            loading="lazy"
        />
    </div>
);

// --- Data Galeri Mockup (Tetap sama) ---
const galleryData = [
    { id: 1, src: "/galery1.jpg", alt: "Restu & Novi 1" },
    { id: 2, src: "/galery2.jpg", alt: "Restu & Novi 2" },
    { id: 3, src: "/galery3.jpg", alt: "Restu & Novi 3" },
    { id: 4, src: "/galery4.jpg", alt: "Restu & Novi 4" },
    { id: 5, src: "/galery5.png", alt: "Restu & Novi 5" },
    { id: 6, src: "/galery6.png", alt: "Restu & Novi 6" },
];

// --- Komponen Utama Galeri ---
const GallerySection = ({ BG_COLOR, PRIMARY_COLOR, ACCENT_COLOR }) => {
    return (
        <section id="galeri" className={`w-full md:max-w-md mx-auto bg-gray-900 text-white py-16`}>
            
            {/* --- Header Galeri: MOMENT Bahagia --- */}
            <div className="text-center mb-10 pt-4 pb-8">
                <h2 className="text-4xl font-serif tracking-widest uppercase opacity-90">
                    MOMENT
                </h2>
                <p className={`text-5xl font-light italic ${ACCENT_COLOR} -mt-3`}>
                    Bahagia
                </p>
            </div>

            {/* --- Grid Foto 2 Kolom --- */}
            {/* Menggunakan gap-3 untuk jarak yang lebih halus dan px-6 untuk padding samping yang cukup */}
            <div className="grid grid-cols-2 gap-3 px-6">
                {galleryData.map(photo => (
                    <GalleryItem 
                        key={photo.id}
                        src={photo.src}
                        alt={photo.alt}
                    />
                ))}
            </div>
            
            {/* Tombol Lihat Galeri Penuh (Opsional) */}
            

        </section>
    );
};

export default GallerySection;