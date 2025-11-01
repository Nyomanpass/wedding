// GuestBookSection.jsx

import React, { useState } from 'react';

// --- Data Komentar Mockup (untuk ditampilkan di awal) ---
const mockComments = [
    { 
        id: 1, 
        name: "Neta Aulia", 
        time: "1 year ago", 
        message: "Wajib datang ya mbak adeknya nikah wkwk", 
        shares: 0 
    },
    { 
        id: 2, 
        name: "Penyon dan adi", 
        time: "1 year ago", 
        message: "Jeg pokokne cod paless kwkwkwk", 
        shares: 0 
    },
    // Tambahkan lebih banyak data jika perlu
];

// --- Icon Profil Default ---
const DefaultProfileIcon = () => (
    <svg 
        // Mengubah warna ikon (text) menjadi putih solid
        // Mengubah warna latar belakang (bg) menjadi abu-abu tua/gelap
        className="w-10 h-10 text-white bg-gray-700 rounded-full p-2 mr-3 shrink-0" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);

// Accent color utility for headings (Tailwind class)
const ACCENT_COLOR = 'text-white';

// --- Komponen Utama Guest Book ---
const GuestBookSection = () => {
    
    // State untuk mengelola input formulir
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState(mockComments);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && message.trim()) {
            const newComment = {
                id: Date.now(),
                name: name,
                time: "Just now",
                message: message,
                shares: 0 
            };
            // Tambahkan komentar baru di paling atas
            setComments([newComment, ...comments]); 
            setName('');
            setMessage('');
        }
    };

    return (
        <section id="guestbook" className={`w-full md:max-w-md mx-auto bg-[#3d4984] text-white py-12`}>
            
            {/* --- Header: KATAKAN Sesuatu --- */}
            <div className="text-center mb-6 pt-4 px-6">
                <h2 className="text-4xl font-serif tracking-widest uppercase opacity-90">
                    KATAKAN
                </h2>
                {/* Font script disimulasikan dengan italic dan ACCENT_COLOR */}
                <p
                    style={{ fontFamily: "'Dancing Script', 'Brush Script MT', 'Pacifico', cursive" }}
                    className={`text-5xl font-light italic ${ACCENT_COLOR} -mt-3`}
                >
                    Sesuatu
                </p>
            </div>

            {/* --- Formulir Input Pesan --- */}
            <div className="px-6">
                <form onSubmit={handleSubmit} className="bg-white/5 p-4 rounded-lg shadow-inner">
                    
                    {/* Input Pesan (Textarea seperti di desain) */}
                    <textarea
                        className="w-full bg-white text-gray-800 p-3 mb-2 h-24 resize-none focus:outline-none rounded-t-lg"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    
               

                    {/* Input Nama */}
                    <div className="relative mt-2">
                        <input
                            type="text"
                            className="w-full bg-white text-gray-800 p-3 pl-10 focus:outline-none rounded-b-lg"
                            placeholder="Name*"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">👤</span>
                    </div>

                    {/* Tombol Send (Warna gelap sesuai desain) */}
                    <div className="text-right mt-3">
                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded shadow"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>

            {/* --- Area Komentar --- */}
            <div className="px-6 mt-10">
                
                {/* Header Komentar */}
                <div className="border-b border-gray-700 pb-2 mb-4">
                    <h3 className="text-sm font-bold tracking-wider">{comments.length} COMMENTS</h3>
                    <div className="flex text-sm mt-1">
                        <span className="mr-4">Oldest</span>
                        <span>▼</span>
                    </div>
                </div>

                {/* Daftar Komentar */}
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex border-b border-gray-700/50 pb-4">
                            <DefaultProfileIcon />
                            <div className="grow">
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="font-semibold text-white">{comment.name}</span>
                                    <div className="flex space-x-2 text-gray-400">
                                        <span className="text-xs">
                                            {/* Icon Share Placeholder */}
                                            <svg className="w-3 h-3 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                                        </span>
                                        <span className="text-xs">🕒 {comment.time}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-200 leading-relaxed mb-2">
                                    {comment.message}
                                </p>
                                <button className="text-xs text-gray-400 hover:text-white transition">
                                    Reply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            
            </div>
        </section>
    );
};

export default GuestBookSection;