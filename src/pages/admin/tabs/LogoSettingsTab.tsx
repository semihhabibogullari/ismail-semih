import React from 'react';
import { Sparkles, Image, Sliders, Check, Eye } from 'lucide-react';
import { useSite } from '../../../context/SiteContext.tsx';
import Signature from '../../../components/Signature.tsx';

export default function LogoSettingsTab() {
  const { data, updateData } = useSite();
  const logo = data.logoSettings || {
    mode: 'signature',
    signatureText: 'İsmail Semih',
    signatureFont: 'Great Vibes',
    signatureTilt: -3,
    signatureColor: '#ffffff',
    imageUrl: '',
    imageWidth: 160,
    faviconUrl: ''
  };

  const handleUpdate = (field: keyof typeof logo, val: any) => {
    updateData((prev: any) => ({
      ...prev,
      logoSettings: {
        ...prev.logoSettings,
        [field]: val
      }
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Canlı Logo Önizleme Kartı */}
      <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-6 sm:p-8">
        <h3 className="font-heading text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Eye className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
          Canlı Logo Önizlemesi
        </h3>
        <p className="text-xs text-stone-400 mb-6">
          Sitenin header ve footer bölümlerinde görünecek imza logotype canlı simülasyonu.
        </p>

        <div className="p-8 sm:p-12 rounded-2xl bg-[#0b0b0f] border border-[#232330] flex flex-col items-center justify-center min-h-[160px]">
          <Signature size="header" />
        </div>
      </div>

      {/* Logo Modu Seçimi: El Yazısı İmza vs Özel Görsel (PNG/SVG) */}
      <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="font-heading text-lg font-bold text-white pb-3 border-b border-[#232332]">
          Logo Tipi
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleUpdate('mode', 'signature')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
              logo.mode === 'signature'
                ? 'border-[var(--accent,#ff5a1f)] bg-[#1c1c28] ring-1 ring-[var(--accent,#ff5a1f)]'
                : 'border-[#28283a] bg-[#161622] hover:border-stone-500'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-[var(--accent,#ff5a1f)]/20 text-[var(--accent,#ff5a1f)] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block text-sm font-semibold mb-1">
                El Yazısı İmza Logotype
              </strong>
              <p className="text-xs text-stone-400 font-light">
                Great Vibes / Alex Brush fontlarıyla yazılmış, animasyonlu dinamik imza.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleUpdate('mode', 'image')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
              logo.mode === 'image'
                ? 'border-[var(--accent,#ff5a1f)] bg-[#1c1c28] ring-1 ring-[var(--accent,#ff5a1f)]'
                : 'border-[#28283a] bg-[#161622] hover:border-stone-500'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-[var(--accent,#ff5a1f)]/20 text-[var(--accent,#ff5a1f)] shrink-0">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block text-sm font-semibold mb-1">
                Özel Görsel Logo (PNG / SVG)
              </strong>
              <p className="text-xs text-stone-400 font-light">
                Doğrudan yüklenen veya harici linki verilen kurumsal logo görseli.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* El Yazısı İmza Parametreleri */}
      {logo.mode === 'signature' && (
        <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-heading text-lg font-bold text-white pb-3 border-b border-[#232332]">
            İmza Parametreleri
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-semibold">
                İmza Metni
              </label>
              <input
                type="text"
                value={logo.signatureText}
                onChange={(e) => handleUpdate('signatureText', e.target.value)}
                placeholder="İsmail Semih"
                className="w-full px-4 py-3 bg-[#181824] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
              />
              <span className="text-[11px] text-stone-500 mt-1 block">
                Not: Tümü büyük harf olmamalıdır ("İsmail Semih").
              </span>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-semibold">
                İmza Kaligrafi Fontu
              </label>
              <select
                value={logo.signatureFont}
                onChange={(e) => handleUpdate('signatureFont', e.target.value)}
                className="w-full px-4 py-3 bg-[#181824] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
              >
                <option value="Great Vibes">Great Vibes (Varsayılan - latin-ext)</option>
                <option value="Alex Brush">Alex Brush</option>
                <option value="Allura">Allura</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-semibold">
                Eğim Açısı ({logo.signatureTilt}°)
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={logo.signatureTilt}
                onChange={(e) => handleUpdate('signatureTilt', parseInt(e.target.value, 10))}
                className="w-full accent-[var(--accent,#ff5a1f)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>-10°</span>
                <span className="text-[var(--accent,#ff5a1f)] font-bold">Önerilen: -3°</span>
                <span>+10°</span>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-semibold">
                İmza Metin Rengi
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={logo.signatureColor}
                  onChange={(e) => handleUpdate('signatureColor', e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border border-[#28283a]"
                />
                <input
                  type="text"
                  value={logo.signatureColor}
                  onChange={(e) => handleUpdate('signatureColor', e.target.value)}
                  className="w-28 px-3 py-2 bg-[#181824] border border-[#28283a] rounded-xl text-xs font-mono text-white uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Görsel Logo Linki ve Ayarları */}
      {logo.mode === 'image' && (
        <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-heading text-lg font-bold text-white pb-3 border-b border-[#232332]">
            Görsel Logo Ayarları
          </h3>

          <div>
            <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-semibold">
              Görsel Logo URL (PNG veya SVG)
            </label>
            <input
              type="url"
              value={logo.imageUrl}
              onChange={(e) => handleUpdate('imageUrl', e.target.value)}
              placeholder="https://example.com/logo.png veya https://example.com/logo.svg"
              className="w-full px-4 py-3 bg-[#181824] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-stone-400 block mb-2 font-semibold">
              Genişlik (Genişlik: {logo.imageWidth}px)
            </label>
            <input
              type="range"
              min="80"
              max="300"
              step="5"
              value={logo.imageWidth}
              onChange={(e) => handleUpdate('imageWidth', parseInt(e.target.value, 10))}
              className="w-full accent-[var(--accent,#ff5a1f)] cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Favicon URL */}
      <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="font-heading text-lg font-bold text-white pb-2 border-b border-[#232332]">
          Özel Favicon
        </h3>
        <p className="text-xs text-stone-400">
          Varsayılan olarak "İS" kaligrafi harfleri kullanılır. İsterseniz özel bir .ico veya .png ikonu belirtebilirsiniz.
        </p>
        <input
          type="url"
          value={logo.faviconUrl || ''}
          onChange={(e) => handleUpdate('faviconUrl', e.target.value)}
          placeholder="Boş bırakılırsa varsayılan dinamik 'İS' SVG favicoun kullanılır"
          className="w-full px-4 py-3 bg-[#181824] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
        />
      </div>
    </div>
  );
}
