import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { SITE_DATA, HeroSlide } from '../data.ts';

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const slides: HeroSlide[] = SITE_DATA.heroSlides;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => resetTimeout();
  }, [currentIndex, isPaused, slides.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      aria-label="Öne Çıkan Başlıklar Sliderı"
      className="relative w-full overflow-hidden bg-[#0b0b0f] pt-20 sm:pt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tam genişlikte 1280x400 / 16:9 oranlı modern slider konteyneri */}
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#1f1f28] shadow-2xl bg-[#121217] aspect-[16/9] sm:aspect-[21/9] lg:aspect-[1280/460] min-h-[400px] sm:min-h-[440px]">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Arka Plan Görseli */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-7000 ease-out"
                  />
                  {/* Katmanlı Karartma (Sol taraf metinler için daha koyu) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/70 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0f] via-[#0b0b0f]/85 to-transparent w-full md:w-3/4" />
                </div>

                {/* Slayt İçerik Alanı */}
                <div className="relative h-full flex flex-col justify-end p-6 sm:p-10 md:p-12 lg:p-16 z-20 max-w-3xl">
                  {/* Kategori & Rozet */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#ff5a1f] bg-[#ff5a1f]/10 border border-[#ff5a1f]/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      <Sparkles className="w-3 h-3" /> {slide.category}
                    </span>
                    <span className="text-xs text-stone-300 bg-stone-900/80 px-2.5 py-0.5 rounded-full border border-stone-800">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Büyük Başlık (Space Grotesk - Asla İmza Fontu Değil) */}
                  <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-3 drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Kısa Açıklama */}
                  <p className="text-stone-300 text-xs sm:text-sm md:text-base line-clamp-2 max-w-xl mb-6 font-light leading-relaxed">
                    {slide.description}
                  </p>

                  {/* "Keşfet" Butonu (DasDas tarzı cüretkar buton) */}
                  <div className="flex items-center gap-3">
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 bg-[#ff5a1f] hover:bg-[#ff7442] text-white font-semibold text-xs sm:text-sm tracking-wide uppercase px-6 sm:px-7 py-3 rounded-full transition-all duration-200 shadow-lg shadow-[#ff5a1f]/30 hover:scale-105 cursor-pointer"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* DasDas Tarzı Slayt Sayacı ("01 / 05") ve Kontroller */}
          <div className="absolute bottom-5 sm:bottom-8 right-5 sm:right-10 z-30 flex items-center gap-4 bg-black/60 px-4 py-2 rounded-full border border-stone-800/80 backdrop-blur-md">
            {/* "01 / 05" Sayacı */}
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#ff5a1f] font-bold">
              0{currentIndex + 1} <span className="text-stone-500 font-normal">/</span> 0{slides.length}
            </span>

            <div className="h-4 w-px bg-stone-800" />

            {/* Sol / Sağ Oklar */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={goToPrev}
                aria-label="Önceki Slayt"
                className="p-1 text-stone-300 hover:text-[#ff5a1f] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={goToNext}
                aria-label="Sonraki Slayt"
                className="p-1 text-stone-300 hover:text-[#ff5a1f] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
