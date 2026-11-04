import React, { useState } from 'react';
import {
  PanelLeft,
  Sliders,
  Video,
  MoveRight,
  Eye,
  Check,
  Sparkles,
  Info
} from 'lucide-react';
import { useSite } from '../../../context/SiteContext.tsx';
import { FeaturedItem } from '../../../data.ts';

export default function FeaturedPanelSettingsTab() {
  const { data, updateData } = useSite();

  const settings = data.featuredPanelSettings || data.hoverPopupSettings || {
    enabled: true,
    widthRatio: 38,
    listShiftAmount: 18,
    autoplayVideo: true,
    defaultItemId: 'first'
  };

  const featuredItems: FeaturedItem[] = data.featuredItems || [];

  // Canlı Önizleme Test State'i
  const [testHoverId, setTestHoverId] = useState<string | null>(null);

  const handleUpdate = (updates: Partial<typeof settings>) => {
    updateData((prev: any) => ({
      ...prev,
      featuredPanelSettings: {
        ...(prev.featuredPanelSettings || prev.hoverPopupSettings || {}),
        ...updates
      },
      // Geriye dönük uyumluluk için hoverPopupSettings'i de senkron tut
      hoverPopupSettings: {
        ...(prev.hoverPopupSettings || {}),
        ...updates
      }
    }));
  };

  const widthRatio = settings.widthRatio || 38;
  const listShiftAmount = settings.listShiftAmount || 18;

  // Önizlemede aktif item
  const previewItem =
    testHoverId
      ? featuredItems.find((i) => i.id === testHoverId) || featuredItems[0]
      : settings.defaultItemId && settings.defaultItemId !== 'first'
      ? featuredItems.find((i) => i.id === settings.defaultItemId) || featuredItems[0]
      : featuredItems[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
          <PanelLeft className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
          <span>Afiş Paneli Ayarları (Öne Çıkanlar)</span>
        </h2>
        <p className="text-xs text-stone-400 mt-0.5">
          "Öne Çıkanlar" bölümünde sol tarafta sabit duran afiş panelini, genişlik oranını (%30-%50), liste satırlarının kayma miktarını ve varsayılan içeriğini yönetin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ayarlar Formu */}
        <div className="space-y-6 bg-[#12121a] border border-[#222232] rounded-3xl p-6 sm:p-8">
          {/* 1. Panelin Açık / Kapalı Durumu */}
          <div className="flex items-center justify-between pb-5 border-b border-[#1c1c28]">
            <div>
              <h4 className="text-sm font-semibold text-white">Afiş Paneli Aktif</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Masaüstü görünümünde solda sabit afiş paneli ve iki sütunlu düzen gösterilsin.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled !== false}
                onChange={(e) => handleUpdate({ enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#252536] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent,#ff5a1f)]"></div>
            </label>
          </div>

          {/* 2. Genişlik Oranı (%30 - %50) */}
          <div className="space-y-3 pb-5 border-b border-[#1c1c28]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[var(--accent,#ff5a1f)]" />
                <span>Panel Genişlik Oranı: %{widthRatio}</span>
              </label>
              <span className="text-[11px] font-mono text-[var(--accent,#ff5a1f)]">
                {widthRatio}% / {100 - widthRatio}%
              </span>
            </div>

            <input
              type="range"
              min={30}
              max={50}
              step={1}
              value={widthRatio}
              onChange={(e) => handleUpdate({ widthRatio: Number(e.target.value) })}
              className="w-full h-2 bg-[#20202e] rounded-lg appearance-none cursor-pointer accent-[var(--accent,#ff5a1f)]"
            />

            <div className="flex justify-between text-[10px] text-stone-500 font-mono">
              <span>%30 (Dar)</span>
              <span>%38 (Önerilen)</span>
              <span>%50 (Yarı Yarıya)</span>
            </div>
          </div>

          {/* 3. Liste Sağa Kayma Miktarı */}
          <div className="space-y-3 pb-5 border-b border-[#1c1c28]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                <MoveRight className="w-4 h-4 text-[var(--accent,#ff5a1f)]" />
                <span>Hover'da Sağa Kayma Miktarı: {listShiftAmount}px</span>
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'Hafif (12px)', value: 12 },
                { label: 'Dengeli (18px)', value: 18 },
                { label: 'Belirgin (24px)', value: 24 }
              ].map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handleUpdate({ listShiftAmount: preset.value })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    listShiftAmount === preset.value
                      ? 'bg-[var(--accent,#ff5a1f)]/20 border-[var(--accent,#ff5a1f)] text-white'
                      : 'bg-[#151522] border-[#262638] text-stone-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Video Otomatik Oynatma */}
          <div className="flex items-center justify-between pb-5 border-b border-[#1c1c28]">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-[var(--accent,#ff5a1f)]" />
                <span>Sessiz Video Otomatik Oynatma</span>
              </h4>
              <p className="text-xs text-stone-400">
                Afiş panelinde video URL'si mevcutsa sessiz ve döngülü olarak otomatik oynatılsın.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoplayVideo !== false}
                onChange={(e) => handleUpdate({ autoplayVideo: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#252536] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent,#ff5a1f)]"></div>
            </label>
          </div>

          {/* 5. Varsayılan Gösterilecek Paylaşım */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
              Varsayılan Gösterilecek Paylaşım (Fare listede yokken)
            </label>
            <select
              value={settings.defaultItemId || 'first'}
              onChange={(e) => handleUpdate({ defaultItemId: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#161622] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)] cursor-pointer"
            >
              <option value="first">İlk Paylaşım (Önerilen - Otomatik)</option>
              {featuredItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.category}: {item.title}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-stone-500">
              Kullanıcı fareyi tüm listeden çektiğinde sol panel boş kalmaz, burada belirlenen paylaşım afişi görüntülenir.
            </p>
          </div>
        </div>

        {/* Canlı Mini Simülasyon Test Alanı */}
        <div className="space-y-4">
          <div className="p-6 bg-[#101018] border border-[#232334] rounded-3xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent,#ff5a1f)]" />
                <h3 className="text-sm font-heading font-bold text-white">
                  Canlı Düzen & Kayma Simülasyonu
                </h3>
              </div>
              <span className="text-[10px] text-stone-500 font-mono">
                Masaüstü Çift Sütun
              </span>
            </div>

            <p className="text-xs text-stone-400 mb-6">
              Aşağıdaki satırların üzerine gelin; seçilen genişlik oranına (%{widthRatio}) ve {listShiftAmount}px kayma miktarına göre sol afiş panelinin nasıl tepki verdiğini test edin.
            </p>

            {/* Simülasyon Çerçevesi */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#0b0b0f] border border-[#1e1e2d] min-h-[320px]">
              {/* Sol Panel Simülasyonu */}
              {settings.enabled !== false && (
                <div
                  style={{ width: `${widthRatio}%` }}
                  className="rounded-xl overflow-hidden relative border border-[var(--accent,#ff5a1f)]/60 bg-[#161622] flex flex-col justify-end p-3 transition-all duration-300"
                >
                  <img
                    src={previewItem?.previewImage || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'}
                    alt="Afiş Önizleme"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="relative z-10">
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-[var(--accent,#ff5a1f)] text-white font-bold inline-block mb-1">
                      {previewItem?.category}
                    </span>
                    <h5 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                      {previewItem?.title}
                    </h5>
                  </div>
                </div>
              )}

              {/* Sağ Liste Simülasyonu */}
              <div
                className="flex-1 space-y-2"
                onMouseLeave={() => setTestHoverId(null)}
              >
                {featuredItems.slice(0, 4).map((item) => {
                  const isHovered = testHoverId === item.id;
                  const isDimmed = testHoverId && !isHovered;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setTestHoverId(item.id)}
                      className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? 'bg-[#181826] border-[var(--accent,#ff5a1f)]'
                          : 'bg-[#12121a] border-[#222232]'
                      } ${isDimmed ? 'opacity-60' : 'opacity-100'}`}
                      style={{
                        transform: isHovered
                          ? `translateX(${listShiftAmount}px)`
                          : testHoverId
                          ? `translateX(${Math.round(listShiftAmount * 0.35)}px)`
                          : 'translateX(0px)'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold truncate ${
                            isHovered ? 'text-[var(--accent,#ff5a1f)]' : 'text-stone-200'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono shrink-0 ml-2">
                          {item.actionLabel} →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-[#14141e] border border-[#202030] text-xs text-stone-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <span>
                Mobilde (768px altı) ekran genişliği nedeniyle sol sütun gizlenir; satıra ilk dokunuşta satırın hemen altında genişleyen önizleme kartı açılır.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
