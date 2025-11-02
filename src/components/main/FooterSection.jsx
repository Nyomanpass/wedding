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
<section
  id="final-footer"
  className="w-full md:max-w-md mx-auto relative overflow-hidden h-[90vh] text-white"
  data-aos="fade-up"
  data-aos-duration="1200"
>
  {/* --- Bagian Atas: Gambar Latar Belakang & Teks --- */}
  <div
    className="relative w-full h-[70%]"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    <img
      src="/undangankanan.jpg"
      alt="Restu & Novi Closing"
      className="absolute inset-0 w-full h-full object-cover"
      data-aos="zoom-in"
      data-aos-delay="200"
    />
    <div
      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
      data-aos="fade-in"
      data-aos-delay="300"
    />

    <div
      className="absolute bottom-0 left-0 w-full text-center pb-10 z-10"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <h1
        className="text-6xl font-bold font-serif tracking-widest leading-none uppercase text-white"
        data-aos="zoom-in"
        data-aos-delay="500"
      >
        {groom} & {bride}
      </h1>
      <p
        className="text-sm tracking-widest opacity-90 font-sans mt-3 uppercase text-gray-200"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        {location || "LOKASI"} | {date || "TANGGAL"}
      </p>
    </div>
  </div>

  {/* --- Bagian Bawah: Penutup --- */}
  <div
    className="relative w-full h-[30%] bg-black flex flex-col justify-center items-center text-center px-6"
    data-aos="fade-up"
    data-aos-delay="700"
  >
    <p
      className="text-sm italic tracking-widest opacity-80"
      data-aos="fade-up"
      data-aos-delay="800"
    >
      “Terima kasih telah menjadi bagian dari hari bahagia kami.”
    </p>
    <p
      className="mt-3 text-xs tracking-wide text-gray-400"
      data-aos="fade-up"
      data-aos-delay="900"
    >
      Dengan penuh cinta,
    </p>
    <p
      className="text-xl font-serif mt-2 tracking-widest text-white"
      data-aos="zoom-in"
      data-aos-delay="1000"
    >
      {groom} & {bride}
    </p>

    {/* Musik */}
    <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" autoPlay />

    {/* Kontrol Musik */}
    <div
      className="absolute bottom-4 right-4 flex items-center gap-3 bg-white/10 rounded-full px-3 py-2"
      data-aos="fade-left"
      data-aos-delay="1100"
    >
      <button
        onClick={togglePlay}
        className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
      >
        {isPlaying ? "▌▌" : "►"}
      </button>

      <button
        onClick={toggleMute}
        className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  </div>
</section>

    );
};

export default FooterSection;
