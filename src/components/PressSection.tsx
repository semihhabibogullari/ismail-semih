import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowUpRight, Calendar, Quote } from 'lucide-react';
import { SITE_DATA } from '../data.ts';

export default function PressSection() {
  const articles = SITE_DATA.pressArticles.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-[#0e0e13] border-t border-[#1f1f28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1f1f28]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5" /> Medyada Yansımalar
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Basında İsmail Semih
            </h2>
          </div>

          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-[#ff5a1f] hover:text-[#ff7442] flex items-center gap-1.5 font-medium mt-4 md:mt-0 transition-colors"
          >
            <span>Tüm Haber & Röportajlar</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Kartlık Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((item) => (
            <article
              key={item.id}
              className="bg-[#14141c] border border-[#232330] rounded-2xl overflow-hidden p-6 flex flex-col justify-between hover:border-[#ff5a1f]/60 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-4 pb-3 border-b border-[#1f1f28]">
                  <span className="font-semibold text-[#ff5a1f] uppercase tracking-wider">
                    {item.outlet}
                  </span>
                  <span className="text-stone-500 flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#ff5a1f] transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <div className="relative mb-6">
                  <Quote className="w-4 h-4 text-stone-700 absolute -top-1 -left-1 opacity-40" />
                  <p className="text-stone-300 text-xs sm:text-sm pl-4 font-light italic leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1f1f28] flex items-center justify-between">
                <span className="text-[11px] text-stone-400">Haberi Oku</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#1b1b26] border border-[#262638] text-stone-300 group-hover:text-white group-hover:bg-[#ff5a1f] group-hover:border-[#ff5a1f] transition-all cursor-pointer"
                  aria-label={`${item.title} haberini oku`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
