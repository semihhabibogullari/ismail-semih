import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Sparkles, Play } from 'lucide-react';
import { FeaturedItem } from '../data.ts';

interface FeaturedPreviewPanelProps {
  item: FeaturedItem | null;
  autoplayVideo?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function FeaturedPreviewPanel({
  item,
  autoplayVideo = true,
  isHovered = false,
  onMouseEnter,
  onMouseLeave
}: FeaturedPreviewPanelProps) {
  if (!item) {
    return (
      <div className="w-full h-[500px] rounded-3xl bg-[#121218] border border-[#20202d] flex items-center justify-center p-8 text-center text-stone-500 text-xs">
        Öne çıkan içerik seçilmedi.
      </div>
    );
  }

  const mediaUrl = item.previewImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
  const hasVideo = !!item.previewVideo;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="sticky top-28 w-full group/panel select-none"
    >
      <Link
        to={item.link}
        className={`block relative w-full h-[500px] lg:h-[540px] rounded-3xl overflow-hidden border transition-all duration-300 shadow-2xl cursor-pointer ${
          isHovered
            ? 'border-[var(--accent,#ff5a1f)]/80 shadow-[var(--accent,#ff5a1f)]/20 scale-[1.01]'
            : 'border-[#222232] hover:border-[var(--accent,#ff5a1f)]/50'
        }`}
        aria-label={`${item.title} - ${item.actionLabel}`}
      >
        {/* Arka Plan Medyası (Video veya Görsel) */}
        <div className="absolute inset-0 bg-[#121218] overflow-hidden">
          {hasVideo ? (
            <video
              key={item.previewVideo}
              src={item.previewVideo}
              autoPlay={autoplayVideo}
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover/panel:scale-105"
            />
          ) : (
            <img
              key={mediaUrl}
              src={mediaUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover/panel:scale-105 animate-fadeIn"
            />
          )}

          {/* Sinematik Çift Katmanlı Gradyan */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-[#09090d]/60 to-transparent opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Üst Rozetler (Kategori & Canlı İndikatör) */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[var(--accent,#ff5a1f)] border border-[var(--accent,#ff5a1f)]/40 shadow-lg">
            <Sparkles className="w-3 h-3" />
            <span>{item.category}</span>
          </span>

          {item.highlightText && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--accent,#ff5a1f)] text-white shadow-lg shadow-[var(--accent,#ff5a1f)]/30 animate-pulse">
              {item.highlightText}
            </span>
          )}
        </div>

        {/* Alt İçerik Bilgileri ve Buton */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 flex flex-col justify-end z-10">
          {/* Tarih */}
          <div className="flex items-center gap-2 text-stone-300 text-xs font-mono mb-2.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--accent,#ff5a1f)]" />
            <span>{item.dateFormatted}</span>
          </div>

          {/* Başlık (Space Grotesk) */}
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2.5 leading-snug group-hover/panel:text-[var(--accent,#ff5a1f)] transition-colors line-clamp-2">
            {item.title}
          </h3>

          {/* Kısa Açıklama */}
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-5 opacity-90">
            {item.shortDescription || 'Bu paylaşım hakkında derinlemesine incelemeler, podcast kayıtları ve katılım detayları.'}
          </p>

          {/* Belirgin Eylem Butonu (Dinle / Kayıt Ol / İncele) */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold group-hover/panel:text-white transition-colors">
              Hemen Keşfet
            </span>

            <div className="inline-flex items-center gap-2 bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-[var(--accent,#ff5a1f)]/30 transition-all group-hover/panel:translate-x-1">
              <span>{item.actionLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
