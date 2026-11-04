import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, GraduationCap, Clock, Calendar, ArrowUpRight, BarChart2 } from 'lucide-react';
import { SITE_DATA } from '../data.ts';

export default function CourseCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#0b0b0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık ve Oklar */}
        <div className="flex items-end justify-between mb-10 pb-6 border-b border-[#1f1f28]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Canlı Atölyeler & Masterclass
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Eğitimler & Kamplar
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Sola Kaydır"
              className="p-2.5 rounded-full bg-[#161620] border border-[#232330] text-stone-300 hover:text-white hover:bg-[#ff5a1f] hover:border-[#ff5a1f] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Sağa Kaydır"
              className="p-2.5 rounded-full bg-[#161620] border border-[#232330] text-stone-300 hover:text-white hover:bg-[#ff5a1f] hover:border-[#ff5a1f] transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Yatay Kaydırılabilir Kart Şeridi */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory"
        >
          {SITE_DATA.courses.map((course) => (
            <div
              key={course.id}
              className="min-w-[320px] sm:min-w-[360px] md:min-w-[400px] bg-[#121218] border border-[#1f1f28] rounded-2xl overflow-hidden shadow-xl hover:border-[#ff5a1f]/60 transition-all flex flex-col justify-between snap-start group"
            >
              {/* Kapak Görseli */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1c1c28]">
                <img
                  src={course.cover}
                  alt={course.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent" />
                
                {/* Seviye & Süre Rozeti */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#ff5a1f] border border-[#ff5a1f]/30 px-2.5 py-1 rounded-md">
                    {course.level}
                  </span>
                  <span className="text-[10px] font-medium bg-black/80 backdrop-blur-md text-stone-200 border border-stone-700/60 px-2.5 py-1 rounded-md">
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Bilgiler */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#ff5a1f]" />
                    <span>Başlangıç: {course.startDate}</span>
                    <span>•</span>
                    <span>{course.quota}</span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#ff5a1f] transition-colors leading-snug mb-2">
                    {course.title}
                  </h3>

                  <p className="text-stone-400 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed mb-4">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1f1f28] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase">Program Ücreti</span>
                    <span className="font-heading font-bold text-lg text-white">
                      {course.price}
                    </span>
                  </div>

                  <Link
                    to={`/egitimler/${course.id}`}
                    className="inline-flex items-center gap-1.5 bg-[#ff5a1f] hover:bg-[#ff7442] text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-[#ff5a1f]/25"
                  >
                    <span>Detay</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
