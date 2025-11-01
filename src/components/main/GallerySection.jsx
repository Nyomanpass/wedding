// GallerySection.jsx

import React, { useState, useEffect } from 'react';

// --- Komponen Pembantu untuk Galeri (Diperbarui untuk Tampilan Paling Smooth) ---
const GalleryItem = ({ src, alt, onOpen }) => (
    // PENYESUAIAN: MENGHILANGKAN SEMUA BORDER
    // Menggunakan group dan shadow halus pada hover untuk kesan smooth
    <button
        type="button"
        onClick={onOpen}
        className="w-full overflow-hidden group focus:outline-none"
        aria-label={`Buka detail: ${alt}`}
    >
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
    </button>
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
const GallerySection = ({ ACCENT_COLOR }) => {
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setOpenIndex(null);
            if (e.key === 'ArrowRight' && openIndex !== null) {
                setOpenIndex((i) => (i + 1) % galleryData.length);
            }
            if (e.key === 'ArrowLeft' && openIndex !== null) {
                setOpenIndex((i) => (i - 1 + galleryData.length) % galleryData.length);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [openIndex]);

    const openAt = (idx) => setOpenIndex(idx);
    const close = () => setOpenIndex(null);
    const next = (e) => { e.stopPropagation(); setOpenIndex((i) => (i + 1) % galleryData.length); };
    const prev = (e) => { e.stopPropagation(); setOpenIndex((i) => (i - 1 + galleryData.length) % galleryData.length); };

    return (
        <section id="galeri" className={`w-full md:max-w-md mx-auto bg-gray-900 text-white py-16`}>
            
            {/* --- Header Galeri: MOMENT Bahagia --- */}
            <div className="text-center mb-10 pt-4 pb-8">
                <h2 className="text-4xl font-serif tracking-widest uppercase opacity-90">
                    MOMENT
                </h2>
                <p
                    style={{ fontFamily: "'Dancing Script', 'Brush Script MT', 'Pacifico', cursive" }}
                    className={`text-5xl font-light italic ${ACCENT_COLOR} -mt-3`}
                >
                    Bahagia
                </p>
            </div>

            {/* --- Grid Foto 2 Kolom --- */}
            <div className="grid grid-cols-2 gap-3 px-6">
                {galleryData.map((photo, idx) => (
                    <GalleryItem 
                        key={photo.id}
                        src={photo.src}
                        alt={photo.alt}
                        onOpen={() => openAt(idx)}
                    />
                ))}
            </div>

            {/* --- Lightbox Modal --- */}
            {openIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Detail gambar ${galleryData[openIndex].alt}`}
                >
                    <div
                        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={close}
                            className="absolute top-3 right-3 text-white bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-60 focus:outline-none"
                            aria-label="Tutup"
                        >
                            ✕
                        </button>

                        <img
                            src={galleryData[openIndex].src}
                            alt={galleryData[openIndex].alt}
                            className="mx-auto object-contain max-h-[80vh] rounded"
                        />

                        <div className="mt-4 text-center">
                            <p className={`text-lg ${ACCENT_COLOR} font-medium`}>
                                {galleryData[openIndex].alt}
                            </p>

                            <div className="mt-3 flex items-center justify-center gap-4">
                                <button
                                    onClick={prev}
                                    className="px-3 py-2 bg-opacity-10 rounded hover:bg-opacity-20 focus:outline-none"
                                    aria-label="Sebelumnya"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={next}
                                    className="px-3 py-2 bg-opacity-10 rounded hover:bg-opacity-20 focus:outline-none"
                                    aria-label="Berikutnya"
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default GallerySection;