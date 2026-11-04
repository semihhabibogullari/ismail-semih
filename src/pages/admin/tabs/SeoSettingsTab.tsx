import React from 'react';
import { Globe, Share2, Search, Check, Sparkles, ExternalLink } from 'lucide-react';
import { useSite } from '../../../context/SiteContext.tsx';

export default function SeoSettingsTab() {
  const { data, updateData } = useSite();
  const general = data.general || {
    title: 'İsmail Semih',
    subtitle: 'Yapay Zekâ, Kültür & Teknoloji Üzerine Düşünceler',
    bioShort: '',
    bioLong: [],
    contactEmail: '',
    bookingEmail: '',
    location: 'İstanbul, Türkiye',
    socials: {
      spotify: '',
      youtube: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  };

  const handleUpdate = (field: string, value: any) => {
    updateData((prev: any) => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value
      }
    }));
  };

  const handleSocialUpdate = (platform: string, url: string) => {
    updateData((prev: any) => ({
      ...prev,
      general: {
        ...prev.general,
        socials: {
          ...prev.general.socials,
          [platform]: url
        }
      }
    }));
  };

  const ogImage =
    data.heroSlides?.[0]?.image ||
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1280&auto=format&fit=crop';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
          <Globe className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
          <span>SEO & Arama Motoru Ayarları</span>
        </h2>
        <p className="text-xs text-stone-400 mt-0.5">
          Arama motoru snippet'ları (SERP), OpenGraph sosyal medya kartları ve sosyal hesap bağlantılarını yapılandırın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ayarlar Formu */}
        <div className="space-y-4 bg-[#12121a] border border-[#222232] rounded-3xl p-6 sm:p-8">
          <div>
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-1">
              Site Başlığı (Meta Title)
            </label>
            <input
              type="text"
              value={general.title}
              onChange={(e) => handleUpdate('title', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#161622] border border-[#28283a] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
            />
            <span className="text-[10px] text-stone-500 font-mono mt-1 block">
              Önerilen: 50-60 karakter. Şu an: {general.title.length} karakter.
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-1">
              Meta Açıklaması (Description)
            </label>
            <textarea
              rows={3}
              value={general.subtitle}
              onChange={(e) => handleUpdate('subtitle', e.target.value)}
              className="w-full px-4 py-2.5 bg-[#161622] border border-[#28283a] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
            />
            <span className="text-[10px] text-stone-500 font-mono mt-1 block">
              Önerilen: 120-160 karakter. Şu an: {general.subtitle.length} karakter.
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-1">
              Konum Bilgisi
            </label>
            <input
              type="text"
              value={general.location}
              onChange={(e) => handleUpdate('location', e.target.value)}
              className="w-full px-4 py-2 bg-[#161622] border border-[#28283a] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
            />
          </div>

          <div className="pt-3 border-t border-[#1c1c28] space-y-3">
            <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider">
              Sosyal Medya Bağlantıları
            </h4>

            {['spotify', 'youtube', 'instagram', 'twitter', 'linkedin'].map((platform) => (
              <div key={platform}>
                <label className="text-[11px] font-medium text-stone-400 capitalize block mb-1">
                  {platform === 'twitter' ? 'X (Twitter)' : platform}
                </label>
                <input
                  type="url"
                  value={(general.socials as any)?.[platform] || ''}
                  onChange={(e) => handleSocialUpdate(platform, e.target.value)}
                  placeholder={`https://${platform}.com/...`}
                  className="w-full px-3.5 py-2 bg-[#161622] border border-[#28283a] rounded-xl text-stone-200 text-xs font-mono focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Canlı Önizlemeler */}
        <div className="space-y-6">
          {/* Google Arama Motoru Önizlemesi */}
          <div className="bg-[#12121a] border border-[#222232] rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Google Arama Önizlemesi (SERP Snippet)
              </h3>
            </div>

            <div className="p-4 bg-[#1e1e28]/70 border border-[#2d2d3e] rounded-2xl space-y-1 font-sans">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[var(--accent,#ff5a1f)] text-white text-[8px] flex items-center justify-center font-bold">
                  İS
                </div>
                <span className="text-[11px] text-stone-400 font-mono">
                  https://ismailsemih.com
                </span>
              </div>
              <h4 className="text-sm font-medium text-blue-400 hover:underline cursor-pointer">
                {general.title} | Resmi Web Sitesi
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                {general.subtitle}
              </p>
            </div>
          </div>

          {/* Sosyal Medya Paylaşım Kartı (OpenGraph) */}
          <div className="bg-[#12121a] border border-[#222232] rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-4 h-4 text-[var(--accent,#ff5a1f)]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Sosyal Medya Kart Önizlemesi (OpenGraph / X)
              </h3>
            </div>

            <div className="rounded-2xl border border-[#28283a] overflow-hidden bg-[#161622]">
              <img
                src={ogImage}
                alt="OG Önizleme"
                className="w-full h-44 object-cover"
              />
              <div className="p-4 space-y-1">
                <span className="text-[10px] text-stone-500 font-mono uppercase">
                  ISMAILSEMIH.COM
                </span>
                <h4 className="text-xs font-bold text-white truncate">
                  {general.title}
                </h4>
                <p className="text-[11px] text-stone-400 line-clamp-2">
                  {general.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
