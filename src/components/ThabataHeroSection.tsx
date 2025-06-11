import React, { useRef } from "react";
import { Brush, Heart, User, Scissors, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  { name: "Pacote Diamante Noiva", img: "/background-section1.png", script: "Make" },
  { name: "Pacote Ouro Noiva", img: "/background-section2.png", script: "Make" },
  { name: "Master VIP", img: "/background-section3.png", script: "Make" },
  { name: "Beauty Expert Class", img: "/background-section1.png", script: "Make" },
  { name: "VIP Individual", img: "/background-section2.png", script: "Make" },
  { name: "Maquiagem Profissional", img: "/thabata-photo.jpg", script: "Make" },
  { name: "Penteados", img: "/background-section3.png", script: "Cabelo" },
  { name: "Baby Liss", img: "/background-section1.png", script: "Cabelo" },
];

const gradientClass = "bg-gradient-to-r from-[#d4af37] via-[#b8941f] to-[#654f32] bg-clip-text text-transparent";
const iconGradient = {
  stroke: "url(#gold-gradient)",
};

const ThabataHeroSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="w-full py-0 px-0">
      {/* Gradiente SVG para ícones */}
      <svg width="0" height="0">
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stopColor="#d4af37" offset="0%" />
          <stop stopColor="#b8941f" offset="50%" />
          <stop stopColor="#654f32" offset="100%" />
        </linearGradient>
      </svg>
      {/* Menu Secundário de Serviços */}
      <div className="flex flex-wrap md:flex-nowrap justify-around items-center gap-4 md:gap-0 mb-10">
        <div className="flex items-center gap-2">
          <Brush className="w-8 h-8" strokeWidth={2} style={iconGradient} />
          <span className={`font-bold text-[16px] ${gradientClass}`}>Make para Eventos</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8" strokeWidth={2} style={iconGradient} />
          <span className={`font-bold text-[16px] ${gradientClass}`}>Make para Noivas</span>
        </div>
        <div className="flex items-center gap-2">
          <Scissors className="w-8 h-8" strokeWidth={2} style={iconGradient} />
          <span className={`font-bold text-[16px] ${gradientClass}`}>Penteados</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-8 h-8" strokeWidth={2} style={iconGradient} />
          <span className={`font-bold text-[16px] ${gradientClass}`}>Curso de Automaquiagem</span>
        </div>
      </div>
      {/* Carrossel de Serviços */}
      <div className="relative">
        <button
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2 transition-all"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-7 h-7 text-[#E37B7D]" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {services.map((service, idx) => (
            <div
              key={service.name}
              className="relative min-w-[220px] max-w-[260px] h-[320px] md:h-[360px] rounded-3xl overflow-hidden shadow-lg group snap-start bg-white"
              style={{ flex: "0 0 220px" }}
            >
              <img
                src={service.img}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="block font-script text-[32px] md:text-[36px] text-white mb-1" style={{fontFamily: 'cursive'}}>{service.script}</span>
                <span className="block font-bold text-[18px] md:text-[22px] text-white uppercase tracking-wide leading-tight">{service.name}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2 transition-all"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-7 h-7 text-[#E37B7D]" />
        </button>
      </div>
    </section>
  );
};

export default ThabataHeroSection; 