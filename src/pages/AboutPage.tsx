import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Camera,
  Maximize2,
  CheckCircle,
  Award,
  Radio,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { SITE_DATA } from '../data.ts';
import Signature from '../components/Signature.tsx';
import Lightbox from '../components/Lightbox.tsx';

export default function AboutPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    document.title = "Hakkımda & Hikayem | İsmail Semih";
  }, []);

  const galleryImages = SITE_DATA.gallery.map((g) => g.image);
  const galleryCaptions = SITE_DATA.gallery.map((g) => g.caption);

  const openLightboxAt = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block">
            Hikaye & Felsefe
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Hakkımda
          </h1>
          <p className="text-stone-400 text-base sm:text-lg font-light italic">
            "Teknoloji ne kadar karmaşıklaşırsa, onu anlatan dilin o kadar berrak olması gerekir."
          </p>
        </div>

        {/* Portre & Biyografi Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16 bg-[#121218] border border-[#1f1f28] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="md:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden border border-[#232332] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80"
              alt="İsmail Semih Portresi"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold">
              İçerik Üreticisi • Eğitmen • Düşünce Mimarı
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              İsmail Semih
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              {SITE_DATA.general.bio}
            </p>

            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Podcast yayınlarımla her hafta on binlerce dinleyiciye ulaşıyor; DasDas, Zorlu PSM ve dijital platformlarda gerçekleştirdiğim canlı atölyelerle bireylerin yapay zekâ çağında zihinsel egemenliklerini korumalarına ve üretkenliklerini katlamalarına rehberlik ediyorum.
            </p>

            <div className="pt-4 border-t border-[#1f1f28] flex flex-wrap gap-4 text-xs text-stone-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#ff5a1f]" /> 1.5M+ Podcast Dinlenmesi
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#ff5a1f]" /> 100+ Yapay Zekâ Dosyası
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#ff5a1f]" /> 4.000+ Mezun
              </span>
            </div>
          </div>
        </div>

        {/* Zaman Çizelgesi (Timeline) */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold block mb-1">
              Yolculuk
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Dönüm Noktaları & Zaman Tüneli
            </h3>
          </div>

          <div className="space-y-5">
            {SITE_DATA.timeline.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-4 p-5 sm:p-6 rounded-2xl bg-[#121218] border border-[#1f1f28] hover:border-[#ff5a1f]/60 transition-colors group"
              >
                <div className="sm:w-28 shrink-0">
                  <span className="font-heading text-2xl font-bold text-[#ff5a1f]">
                    {item.year}
                  </span>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-white group-hover:text-[#ff5a1f] transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fotoğraf Galerisi (Lightbox ile Büyütme) */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#1f1f28]">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold block mb-1 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Kareler
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                Sahne & Stüdyo Galerisi
              </h3>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">
              Büyütmek için tıklayın
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SITE_DATA.gallery.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openLightboxAt(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#161622] border border-[#232332] hover:border-[#ff5a1f] transition-all cursor-pointer shadow-lg"
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <div className="p-2 rounded-full bg-black/80 text-[#ff5a1f] mb-2">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-[11px] text-stone-300 truncate font-light">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sayfa Sonunda BÜYÜK BOY İMZA (~80-96px) */}
        <div className="pt-16 pb-8 border-t border-[#1f1f28] flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase tracking-widest text-stone-500 mb-6 font-mono">
            Sevgi ve muhabbetle,
          </span>

          {/* Sayfa sonunda dev imza (~80-96px) */}
          <div className="my-2 transform hover:scale-105 transition-transform duration-300">
            <Signature size="huge" />
          </div>

          <p className="text-xs text-stone-500 mt-6 max-w-sm">
            İstanbul, 2026 • Geleceğin fikirlerini birlikte inşa ediyoruz.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={galleryImages}
        captions={galleryCaptions}
        currentIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setCurrentPhotoIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
        onNext={() => setCurrentPhotoIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
      />
    </div>
  );
}
