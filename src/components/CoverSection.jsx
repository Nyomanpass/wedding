import { HiOutlineMailOpen } from 'react-icons/hi';

const CoverSection = ({ data, isOpened, onOpen }) => {
  const coverClasses = `
    fixed top-0 left-0 w-full h-full z-50 transition-transform duration-1000 ease-in-out
    ${isOpened ? 'transform -translate-y-full' : 'transform translate-y-0'}
  `;

  const leftBgStyle = {
    backgroundImage: `
      linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0) 70%),
      url('/headerfoto.png')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };


  // removed unused style to avoid lint warning

  const handleOpen = () => {
    onOpen && onOpen();
    // dispatch event agar FooterSection dapat memulai musik
    window.dispatchEvent(new Event('invitation:open'));
  };

  return (
  <div className={coverClasses}>
  <div className="flex flex-col md:flex-row h-screen">

    {/* KIRI: Cover Foto (hidden on mobile) */}
    <div
      className="relative w-full h-full bg-cover bg-center hidden md:block"
      style={leftBgStyle}
    >
      {/* Konten Nama Mempelai */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
        <p className="text-white text-sm md:text-lg tracking-widest uppercase">
          The Wedding of
        </p>

        <div className="mt-2">
          <h1 className="text-white text-5xl md:text-7xl font-serif tracking-wide leading-none">
            {data.groom}
          </h1>
          <h1 className="text-white text-5xl md:text-7xl font-serif tracking-wide leading-none">
            and {data.bride}
          </h1>
        </div>

        <p className="text-white mt-4 text-xs md:text-lg tracking-wide uppercase">
          {data.location} | {data.date}
        </p>
      </div>
    </div>


      <div className="relative w-full md:max-w-md h-screen mx-auto overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/undangankanan.jpg')`,
        }}
      >
       
        <div 
          className="absolute inset-0 bg-linear-to-b from-black/5 to-black/50" 
        />
      </div>

 
      <div 
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 pb-20 pt-8 text-white z-10"
      >

        <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-widest mb-1 uppercase">
          {data.groom.toUpperCase()} & {data.bride.toUpperCase()}
        </h1>
        

        <p className="text-sm italic opacity-100 mb-1 font-semibold">
          Kpd. Bpk/Ibu/Saudara/i
        </p>


        <p className="text-xl md:text-2xl font-bold uppercase text-white mb-4 tracking-wide">
          {data.to.toUpperCase()}
        </p>


        <p className="text-sm md:text-xs opacity-95 leading-relaxed max-w-[90%] mb-8">
          Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir pada acara pernikahan kami.
        </p>


       <button
          onClick={handleOpen}
          className="
            px-4 py-3
            text-[.8rem]
            tracking-wider
            bg-[#14236A]
            text-white
            rounded-lg           
            font-semibold
            shadow-xl shadow-black/40
            transition-all duration-300
            flex items-center justify-center space-x-2 /* Flexbox untuk Ikon */
            hover:bg-[#D4AF37]
            hover:text-[#14236A]
            hover:shadow-2xl hover:shadow-black/60 
            whitespace-nowrap
          "
        >
          <HiOutlineMailOpen className="text-lg" /> 
          
          <span>Buka Undangan</span>
        </button>

      </div>
    </div>

      </div>
    </div>


  );
};

export default CoverSection
