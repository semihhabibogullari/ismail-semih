import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Calendar, ArrowUpRight, Mic } from 'lucide-react';
import { SITE_DATA } from '../data.ts';

export default function PodcastGrid() {
  const podcasts = SITE_DATA.podcasts.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-[#0e0e13] border-t border-[#1f1f28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1f1f28]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" /> Haftalık Yayınlar
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Son Podcast Bölümleri
            </h2>
          </div>

          <Link
            to="/podcast"
            className="text-xs uppercase tracking-widest text-[#ff5a1f] hover:text-[#ff7442] flex items-center gap-1.5 font-medium mt-4 md:mt-0 transition-colors"
          >
            <span>Tüm Bölümleri Gör</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Kartlık Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {podcasts.map((ep) => (
            <Link
              key={ep.id}
              to={`/podcast/${ep.id}`}
              className="bg-[#14141b] border border-[#232330] rounded-2xl overflow-hidden shadow-xl hover:border-[#ff5a1f]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Kapak Görseli & Oynat Butonu */}
              <div className="relative aspect-square w-full bg-[#1c1c28] overflow-hidden">
                <img
                  src={ep.cover}
                  alt={`Bölüm #${ep.episodeNumber}: ${ep.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14141b] via-transparent to-black/30" />

                {/* Bölüm Numarası Rozeti */}
                <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#ff5a1f] border border-[#ff5a1f]/30 px-3 py-1 rounded-full">
                  Bölüm #{ep.episodeNumber}
                </span>

                {/* Hover Play Butonu */}
                <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-[#ff5a1f] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Bilgiler */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-stone-400 mb-2.5 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                      {ep.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {ep.dateFormatted}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#ff5a1f] transition-colors leading-snug mb-2">
                    {ep.title}
                  </h3>

                  <p className="text-stone-400 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                    {ep.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1f1f28] flex items-center justify-between text-xs text-stone-400 group-hover:text-stone-200">
                  <span>Hemen Dinle</span>
                  <ArrowUpRight className="w-4 h-4 text-[#ff5a1f]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
