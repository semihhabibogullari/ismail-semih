import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Calendar, Sparkles, ChevronDown, Play } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';
import FeaturedPreviewPanel from './FeaturedPreviewPanel.tsx';
import { FeaturedItem } from '../data.ts';

export default function FeaturedList() {
  const { data } = useSite();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('Tümü');

  const tabs = ['Tümü', 'Podcast', 'Etkinlik', 'Eğitim', 'Yapay Zekâ'];
  const items: FeaturedItem[] = data.featuredItems || [];

  // Afiş paneli ayarları (admin panelinden yönetilebilir)
  const panelSettings = data.featuredPanelSettings || data.hoverPopupSettings || {
    enabled: true,
    widthRatio: 38, // Masaüstünde %38
    listShiftAmount: 18, // 18px sağa kayma
    autoplayVideo: true,
    defaultItemId: 'first'
  };

  const isPanelEnabled = panelSettings.enabled !== false;
  const widthRatio = Math.min(Math.max(panelSettings.widthRatio || 38, 30), 50);
  const shiftAmount = panelSettings.listShiftAmount || 18;

  // Filtrelenmiş liste
  const filteredItems = items.filter(
    (item: FeaturedItem) => activeTab === 'Tümü' || item.category === activeTab
  );

  // Varsayılan gösterilecek paylaşımı belirle
  const getDefaultItem = (): FeaturedItem | null => {
    if (filteredItems.length === 0) return null;
    if (panelSettings.defaultItemId && panelSettings.defaultItemId !== 'first') {
      const found = filteredItems.find((i) => i.id === panelSettings.defaultItemId);
      if (found) return found;
    }
    return filteredItems[0];
  };

  // Aktif gösterilen paylaşım (panelde)
  const [activeItem, setActiveItem] = useState<FeaturedItem | null>(null);
  // Kullanıcı herhangi bir satırın veya panelin üzerinde mi?
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  // Mobilde akordeon gibi genişleyen kart ID'si
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);

  // Sekme veya liste değiştiğinde aktif öğeyi varsayılana getir
  useEffect(() => {
    setActiveItem(getDefaultItem());
    setHoveredRowId(null);
  }, [activeTab, items]);

  // Satır üzerine gelindiğinde veya klavye odağı (Tab) alındığında
  const handleItemFocusOrHover = (item: FeaturedItem) => {
    setIsHoveringList(true);
    setHoveredRowId(item.id);
    setActiveItem(item);
  };

  // Tüm listeden çıkıldığında
  const handleListMouseLeave = () => {
    setIsHoveringList(false);
    setHoveredRowId(null);
    setActiveItem(getDefaultItem());
  };

  // Panelin üzerine gelindiğinde açık kalmasını sağla
  const handlePanelMouseEnter = () => {
    setIsHoveringList(true);
  };

  const handlePanelMouseLeave = () => {
    if (!hoveredRowId) {
      setIsHoveringList(false);
      setActiveItem(getDefaultItem());
    }
  };

  // Mobil dokunma davranışı: İlk dokunuşta kart genişlesin, ikinci dokunuşta linke gitsin
  const handleMobileRowClick = (item: FeaturedItem, e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      if (mobileExpandedId !== item.id) {
        // İlk dokunuş: Kartı genişlet
        e.preventDefault();
        setMobileExpandedId(item.id);
      } else {
        // İkinci dokunuş: Linke git
        navigate(item.link);
      }
    } else {
      // Masaüstünde doğrudan linke git
      navigate(item.link);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--bg-dark,#0b0b0f)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Başlık & "Tümünü Gör" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1f1f28]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--accent,#ff5a1f)] font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Gündem & Program
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Öne Çıkanlar
            </h2>
          </div>

          <Link
            to="/etkinlikler"
            className="text-xs uppercase tracking-widest text-stone-400 hover:text-[var(--accent,#ff5a1f)] flex items-center gap-1 font-medium mt-4 md:mt-0 transition-colors cursor-pointer"
          >
            <span>Tüm Takvimi Gör</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Sekmeli (Tab) Filtreleme */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[var(--accent,#ff5a1f)] text-white shadow-md'
                  : 'bg-[#14141a] text-stone-400 hover:text-white border border-[#232330] hover:border-stone-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Ana İçerik Alanı: İki Sütunlu Düzen (Solda Sabit Afiş Paneli, Sağda Liste) */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* SOL SÜTUN: Sabit Afiş Paneli (Yalnızca Masaüstü >= 768px) */}
          {isPanelEnabled && (
            <div
              className="hidden md:block shrink-0 transition-all duration-300"
              style={{ width: `${widthRatio}%` }}
            >
              <FeaturedPreviewPanel
                item={activeItem}
                autoplayVideo={panelSettings.autoplayVideo !== false}
                isHovered={isHoveringList}
                onMouseEnter={handlePanelMouseEnter}
                onMouseLeave={handlePanelMouseLeave}
              />
            </div>
          )}

          {/* SAĞ SÜTUN: DasDas Tarzı Liste Satırları */}
          <div
            className={`w-full ${isPanelEnabled ? 'md:flex-1' : 'w-full'}`}
            onMouseLeave={handleListMouseLeave}
          >
            <div className="divide-y divide-[#1c1c26] border-y border-[#1c1c26]">
              {filteredItems.map((item: FeaturedItem) => {
                const isHovered = hoveredRowId === item.id;
                const isDimmed = isHoveringList && !isHovered;
                const isMobileExpanded = mobileExpandedId === item.id;

                // Sağa kayma stili (translateX)
                const shiftStyle = isHovered
                  ? { transform: `translateX(${shiftAmount}px)` }
                  : isHoveringList
                  ? { transform: `translateX(${Math.round(shiftAmount * 0.35)}px)` }
                  : { transform: 'translateX(0px)' };

                return (
                  <div key={item.id} className="transition-all duration-300">
                    {/* Liste Satırı (Tıklanabilir ve Odaklanabilir) */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => handleMobileRowClick(item, e)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          navigate(item.link);
                        }
                      }}
                      onMouseEnter={() => handleItemFocusOrHover(item)}
                      onFocus={() => handleItemFocusOrHover(item)}
                      className={`py-5 px-3 sm:px-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 rounded-2xl cursor-pointer group select-none ${
                        isHovered
                          ? 'bg-[#151520] border-l-2 border-[var(--accent,#ff5a1f)]'
                          : 'hover:bg-[#12121a]'
                      } ${isDimmed ? 'opacity-60' : 'opacity-100'}`}
                      aria-label={`${item.title} - ${item.actionLabel}`}
                    >
                      {/* Sol: Kategori Etiketi + Sağa Kayan Başlık */}
                      <div
                        style={shiftStyle}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-1 min-w-0 transition-transform duration-300 ease-out"
                      >
                        <span
                          className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border shrink-0 w-fit transition-colors ${
                            isHovered
                              ? 'bg-[var(--accent,#ff5a1f)] text-white border-[var(--accent,#ff5a1f)] shadow-md shadow-[var(--accent,#ff5a1f)]/20'
                              : 'bg-[#1b1b24] text-[var(--accent,#ff5a1f)] border-[#2a2a38]'
                          }`}
                        >
                          {item.category}
                        </span>

                        <div className="min-w-0 flex items-center gap-3">
                          <h3
                            className={`font-heading text-base sm:text-lg lg:text-xl font-bold transition-colors truncate ${
                              isHovered
                                ? 'text-[var(--accent,#ff5a1f)]'
                                : 'text-white group-hover:text-stone-200'
                            }`}
                          >
                            {item.title}
                          </h3>

                          {item.highlightText && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[var(--accent,#ff5a1f)]/15 text-[var(--accent,#ff5a1f)] border border-[var(--accent,#ff5a1f)]/30 shrink-0 hidden sm:inline-block">
                              {item.highlightText}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sağ: Tarih + Aksiyon Butonu */}
                      <div className="flex items-center justify-between md:justify-end gap-5 shrink-0">
                        <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-stone-500" />
                          <span>{item.dateFormatted}</span>
                        </div>

                        <Link
                          to={item.link}
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-full border transition-all cursor-pointer shadow-sm shrink-0 ${
                            isHovered
                              ? 'bg-[var(--accent,#ff5a1f)] text-white border-[var(--accent,#ff5a1f)] shadow-[var(--accent,#ff5a1f)]/20'
                              : 'bg-[#1b1b24] text-stone-300 border-[#2a2a38] hover:border-stone-500 hover:text-white'
                          }`}
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* MOBİL İÇİN GENİŞLEYEN ÖNİZLEME KARTI (< 768px Dokunmatik Deneyimi) */}
                    {isMobileExpanded && (
                      <div className="md:hidden p-4 my-2 rounded-2xl bg-[#14141e] border border-[var(--accent,#ff5a1f)]/40 shadow-xl animate-fadeIn space-y-3">
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#1a1a24]">
                          {item.previewVideo ? (
                            <video
                              src={item.previewVideo}
                              autoPlay={panelSettings.autoplayVideo !== false}
                              muted
                              loop
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          ) : item.previewImage ? (
                            <img
                              src={item.previewImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">
                              Önizleme görseli mevcut
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-stone-300 font-light leading-relaxed">
                          {item.shortDescription || 'Bu içerik hakkında detaylı bilgiler, sesli kayıt ve başvuru formu.'}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[11px] text-stone-400 font-mono">
                            {item.dateFormatted}
                          </span>
                          <Link
                            to={item.link}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent,#ff5a1f)] text-white text-xs font-bold uppercase tracking-wider"
                          >
                            <span>{item.actionLabel}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
