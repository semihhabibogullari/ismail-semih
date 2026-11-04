import React from 'react';
import { Palette, Type, Check, RefreshCw, Layout, Eye } from 'lucide-react';
import { useSite } from '../../../context/SiteContext.tsx';

export default function DesignTokensTab() {
  const { data, updateData } = useSite();
  const tokens = data.designTokens;

  const handleTokenChange = (key: keyof typeof tokens, val: string) => {
    updateData((prev: any) => ({
      ...prev,
      designTokens: {
        ...prev.designTokens,
        [key]: val
      }
    }));
  };

  const presetAccentColors = [
    { name: 'Elektrik Turuncusu (Varsayılan)', color: '#ff5a1f' },
    { name: 'Elektrik Mavisi', color: '#3b82f6' },
    { name: 'Siyan Neon', color: '#06b6d4' },
    { name: 'Zümrüt Yeşil', color: '#10b981' },
    { name: 'Kraliyet Altını', color: '#eab308' },
    { name: 'Neon Mor', color: '#a855f7' },
    { name: 'Yakut Kırmızı', color: '#f43f5e' }
  ];

  const presetBgColors = [
    { name: 'Gece Karası (Varsayılan)', color: '#0b0b0f' },
    { name: 'Derin Lacivert Siyah', color: '#070913' },
    { name: 'Koyu Kömür', color: '#121212' },
    { name: 'Katran Siyahı', color: '#050507' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Vurgu Rengi Seçici */}
      <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#232332]">
          <Palette className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              Vurgu Rengi (Accent Color)
            </h3>
            <p className="text-xs text-stone-400">
              Butonlar, rozetler, aktif menü göstergeleri ve afiş detaylarının ana rengi.
            </p>
          </div>
        </div>

        {/* Hazır Renk Paletleri */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {presetAccentColors.map((c) => (
            <button
              key={c.color}
              onClick={() => handleTokenChange('accentColor', c.color)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 cursor-pointer ${
                tokens.accentColor.toLowerCase() === c.color.toLowerCase()
                  ? 'border-white ring-2 ring-[var(--accent,#ff5a1f)] bg-[#1c1c28]'
                  : 'border-[#28283a] bg-[#171722] hover:border-stone-500'
              }`}
            >
              <div
                className="w-7 h-7 rounded-full shadow-lg flex items-center justify-center"
                style={{ backgroundColor: c.color }}
              >
                {tokens.accentColor.toLowerCase() === c.color.toLowerCase() && (
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                )}
              </div>
              <span className="text-[11px] font-medium text-stone-200 line-clamp-1">
                {c.name}
              </span>
            </button>
          ))}
        </div>

        {/* Özel Renk Kodu Girişi */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-3">
          <label className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
            Özel HEX Renk Kodu:
          </label>
          <div className="flex items-center gap-2 bg-[#1b1b26] p-1.5 rounded-xl border border-[#28283a]">
            <input
              type="color"
              value={tokens.accentColor}
              onChange={(e) => handleTokenChange('accentColor', e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={tokens.accentColor}
              onChange={(e) => handleTokenChange('accentColor', e.target.value)}
              className="w-24 bg-transparent text-xs font-mono text-white focus:outline-none uppercase"
            />
          </div>
        </div>
      </div>

      {/* Arka Plan & Kart Renkleri */}
      <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#232332]">
          <Layout className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              Arka Plan & Kart Renkleri
            </h3>
            <p className="text-xs text-stone-400">
              Koyu temanın zemin ve içerik kartı tonları.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {presetBgColors.map((bg) => (
            <button
              key={bg.color}
              onClick={() => {
                handleTokenChange('bgColor', bg.color);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                tokens.bgColor === bg.color
                  ? 'border-[var(--accent,#ff5a1f)] bg-[#1c1c28]'
                  : 'border-[#28283a] bg-[#171722] hover:border-stone-500'
              }`}
            >
              <div
                className="w-full h-10 rounded-xl mb-3 border border-[#333346]"
                style={{ backgroundColor: bg.color }}
              />
              <span className="text-xs font-semibold text-white block">{bg.name}</span>
              <span className="text-[10px] text-stone-500 font-mono">{bg.color}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tipografi ve Font Ayarları */}
      <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#232332]">
          <Type className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              Yazı Tipi Ailesi (Google Fonts)
            </h3>
            <p className="text-xs text-stone-400">
              Başlıklar ve gövde metinleri için tipografi seçimi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-semibold">
              Başlık Fontu
            </label>
            <select
              value={tokens.headingFont}
              onChange={(e) => handleTokenChange('headingFont', e.target.value)}
              className="w-full px-4 py-3 bg-[#181824] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
            >
              <option value="Space Grotesk">Space Grotesk (Önerilen)</option>
              <option value="Sora">Sora</option>
              <option value="Inter">Inter</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-semibold">
              Gövde Fontu
            </label>
            <select
              value={tokens.bodyFont}
              onChange={(e) => handleTokenChange('bodyFont', e.target.value)}
              className="w-full px-4 py-3 bg-[#181824] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
            >
              <option value="Inter">Inter (Önerilen)</option>
              <option value="Space Grotesk">Space Grotesk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Köşe Yuvarlaklığı & Gölgeler */}
      <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#232332]">
          <Layout className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              Köşe Yuvarlaklığı & Görsel Derinlik
            </h3>
            <p className="text-xs text-stone-400">
              Kart ve butonların estetik ovalliği.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Hafif Oval (16px)', val: 'rounded-xl' },
            { label: 'Modern Yumuşak (24px)', val: 'rounded-2xl' },
            { label: 'Görkemli Yuvarlak (32px)', val: 'rounded-3xl' }
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => handleTokenChange('borderRadius', item.val)}
              className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                tokens.borderRadius === item.val
                  ? 'border-[var(--accent,#ff5a1f)] bg-[#1c1c28] text-white font-bold'
                  : 'border-[#28283a] bg-[#171722] text-stone-400 hover:text-white'
              }`}
            >
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
