import React, { useRef, useState, useEffect } from 'react';

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
const FooterSection = ({ PRIMARY_COLOR, ACCENT_COLOR, groom, bride, location, date }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // muted by default to allow autoplay on many browsers
    const AUDIO_SRC = "./public/weding.mp3"; // ganti dengan path audio Anda

    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;

        // pastikan mute state tersinkron
        el.muted = isMuted;

        // coba play otomatis (bisa diblokir oleh browser jika tidak muted)
        const tryPlay = async () => {
            try {
                await el.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }
        };
        tryPlay();

        return () => {
            el.pause();
        };
    }, [isMuted]); // hanya saat mount dan saat isMuted berubah

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.muted = isMuted;
    }, [isMuted]);

    // Play/unmute apabila undangan dibuka (dikirim oleh CoverSection saat klik)
    useEffect(() => {
        const onInvitationOpen = async () => {
            const el = audioRef.current;
            if (!el) return;
            try {
                // event dipicu saat user klik -> biasanya diizinkan
                el.muted = false;
                await el.play();
                setIsPlaying(true);
                setIsMuted(false);
            } catch {
                // jika browser masih blokir, biarkan kontrol manual tersedia
            }
        };
        window.addEventListener('invitation:open', onInvitationOpen);
        return () => window.removeEventListener('invitation:open', onInvitationOpen);
    }, []);

    const togglePlay = async (e) => {
        e.stopPropagation();
        const el = audioRef.current;
        if (!el) return;
        if (isPlaying) {
            el.pause();
            setIsPlaying(false);
        } else {
            try {
                await el.play();
                setIsPlaying(true);
                // saat user tekan play, jika sebelumnya muted, unmute agar ada suara
                if (isMuted) setIsMuted(false);
            } catch {
                setIsPlaying(false);
            }
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted((m) => !m);
    };

    // Warna strip bawah yang solid
    const BOTTOM_STRIP_BG = 'bg-black'; 

    return (
        <section id="final-footer" className={`w-full md:max-w-md mx-auto relative overflow-hidden h-[90vh] text-white`}>
            
            {/* --- Bagian Atas: Gambar Latar Belakang & Teks --- */}
            <div className="relative w-full h-[70%]">
                <img 
                    src="/undangankanan.jpg"
                    alt="Restu & Novi Closing" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" /> 
                
                <div className="absolute bottom-0 left-0 w-full text-center pb-8 z-10">
                    <h1 className={`text-6xl font-bold font-serif tracking-widest leading-none uppercase ${PRIMARY_COLOR}`}>{groom} & {bride}</h1>
                    <p className={`text-sm tracking-widest opacity-90 font-sans mt-2 uppercase`}>
                        {location || "LOKASI"} | {date || "TANGGAL"}
                    </p>
                </div>
            </div>

            {/* --- Bagian Bawah: Strip Hitam dengan Logo & Kredit --- */}
            <div className={`relative w-full h-[30%] ${BOTTOM_STRIP_BG} ${PRIMARY_COLOR} text-center py-6 flex flex-col justify-center items-center`}>
                
                <IshanaLogo ACCENT_COLOR={ACCENT_COLOR} />
                
                <h3 className={`text-2xl font-serif mt-2 tracking-widest leading-tight ${ACCENT_COLOR}`}>
                    ishana
                </h3>
                <p className={`text-[9px] -mt-1 mb-4 tracking-widest ${PRIMARY_COLOR} opacity-70 uppercase`}>
                    make up artiste
                </p>

                <p className="text-xs tracking-wider mb-1 opacity-90">
                    Make Up & Wardrobe by
                </p>
                <p className="text-xs font-semibold opacity-90">
                    Ishana MUA
                </p>
                
                {/* Audio element (hidden native controls) */}
                <audio
                    ref={audioRef}
                    src={AUDIO_SRC}
                    loop
                    preload="auto"
                    // autoPlay diset tetapi browser mungkin blokir jika tidak muted
                    autoPlay
                />

                {/* Kontrol Musik Kustom */}
                <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-white/5 rounded-full px-3 py-2">

                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-sm hover:bg-white/20 focus:outline-none"
                        aria-pressed={isPlaying}
                        aria-label={isPlaying ? "Pause musik" : "Putar musik"}
                    >
                        {isPlaying ? "▌▌" : "►"}
                    </button>

                    <button
                        onClick={toggleMute}
                        className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-sm hover:bg-white/20 focus:outline-none"
                        aria-pressed={!isMuted}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? "🔇" : "🔊"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;
