import React, { useEffect, useState } from 'react';
import { Newspaper, ArrowUpRight, Calendar, Download, Quote, CheckCircle2 } from 'lucide-react';
import { SITE_DATA } from '../data.ts';

export default function PressPage() {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    document.title = "Basında Çıkanlar & Medya | İsmail Semih";
  }, []);

  const handleDownloadPressKit = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık ve Basın Kiti İndir */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-stone-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c9a45c] font-semibold mb-2 block">
              Medya Yansımaları
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Basında İsmail Semih
            </h1>
            <p className="text-stone-400 text-sm sm:text-base font-light mt-2 max-w-2xl">
              Ulusal basında, kültür-sanat dergilerinde ve eleştiri platformlarında yer alan değerlendirmeler, manşetler ve röportajlar.
            </p>
          </div>

          {/* Basın Kiti İndir Butonu */}
          <button
            onClick={handleDownloadPressKit}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-[#c9a45c] hover:text-black border border-stone-700 hover:border-[#c9a45c] text-stone-200 text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all cursor-pointer shadow-lg shrink-0"
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Basın Kiti İndirildi (PDF)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#c9a45c]" />
                <span>Basın Kitini İndir (PDF)</span>
              </>
            )}
          </button>
        </div>

        {/* Manşet Alıntı */}
        <div className="bg-[#141414] border-l-4 border-[#c9a45c] rounded-2xl p-6 sm:p-10 mb-16 shadow-xl">
          <Quote className="w-8 h-8 text-[#c9a45c] mb-3 opacity-60" />
          <p className="font-serif text-xl sm:text-2xl text-stone-200 italic font-normal leading-relaxed mb-4">
            "İsmail Semih, hem sahne önündeki sarsıcı varlığıyla hem de reji masasında inşa ettiği katmanlı atmosferle günümüz Türk tiyatrosunun en ayrıcalıklı yaratıcılarından biri."
          </p>
          <span className="text-xs uppercase tracking-widest text-[#c9a45c] font-semibold">
            — Milliyet Sanat Dergisi, Ekim 2026 Sayısı
          </span>
        </div>

        {/* Tüm Haber Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_DATA.pressArticles.map((article) => (
            <div
              key={article.id}
              className="bg-[#141414] border border-stone-800 rounded-2xl overflow-hidden shadow-xl hover:border-[#c9a45c]/50 transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/9] w-full bg-stone-900 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold bg-black/80 backdrop-blur-md text-[#c9a45c] border border-stone-700 px-2.5 py-1 rounded-md">
                  {article.outlet}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#c9a45c] transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-400">Kaynakta İncele</span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-stone-900 border border-stone-700 text-stone-300 group-hover:text-black group-hover:bg-[#c9a45c] group-hover:border-[#c9a45c] transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
