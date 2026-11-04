import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Clock, Tag, ArrowUpRight, BookOpen } from 'lucide-react';
import { SITE_DATA } from '../data.ts';

export default function AISection() {
  const articles = SITE_DATA.aiArticles.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-[#0b0b0f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1f1f28]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Teknoloji & Gelecek
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Yapay Zekâ Analizleri
            </h2>
          </div>

          <Link
            to="/yapay-zeka"
            className="text-xs uppercase tracking-widest text-[#ff5a1f] hover:text-[#ff7442] flex items-center gap-1.5 font-medium mt-4 md:mt-0 transition-colors"
          >
            <span>Tüm İçerikleri Gör</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Kart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <article
              key={item.id}
              className="bg-[#121218] border border-[#1f1f28] rounded-2xl overflow-hidden shadow-xl hover:border-[#ff5a1f]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              {/* Kapak Görseli */}
              <div className="relative aspect-[16/10] w-full bg-[#1c1c28] overflow-hidden">
                <img
                  src={item.cover}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold bg-black/80 backdrop-blur-md text-[#ff5a1f] border border-[#ff5a1f]/30 px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
              </div>

              {/* İçerik Bilgileri */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2.5">
                    <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                    <span>{item.readTime}</span>
                    <span>•</span>
                    <span>{item.dateFormatted}</span>
                  </div>

                  <Link to={`/yapay-zeka/${item.id}`}>
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#ff5a1f] transition-colors leading-snug mb-3">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* Etiketler */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-stone-400 bg-[#191924] px-2.5 py-0.5 rounded-md border border-[#232332]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1f1f28] flex items-center justify-between">
                  <span className="text-xs text-stone-400">Yazıyı Oku</span>
                  <Link
                    to={`/yapay-zeka/${item.id}`}
                    className="p-2 rounded-full bg-[#191924] border border-[#232332] text-stone-300 group-hover:text-white group-hover:bg-[#ff5a1f] group-hover:border-[#ff5a1f] transition-all"
                    aria-label={`${item.title} yazısını oku`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
