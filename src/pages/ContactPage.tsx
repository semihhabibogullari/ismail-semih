import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Sparkles,
  Instagram,
  Youtube,
  Twitter,
  Linkedin
} from 'lucide-react';
import { SITE_DATA } from '../data.ts';
import Signature from '../components/Signature.tsx';

function SpotifyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "İletişim & İş Birlikleri | İsmail Semih";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block flex items-center justify-center gap-1.5">
            <Mail className="w-4 h-4" /> Birlikte Üretelim
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            İletişim
          </h1>
          <p className="text-stone-400 text-sm sm:text-base font-light">
            Konuşma davetleri, sponsorluk iş birlikleri, podcast konukluğu veya soru ve önerileriniz için dilediğiniz zaman mesaj atabilirsiniz.
          </p>
        </div>

        {/* Form & Bilgiler */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Sol: İletişim Formu (7 Sütun) */}
          <div className="lg:col-span-7 bg-[#121218] border border-[#1f1f28] rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h2 className="font-heading text-2xl font-bold text-white mb-2">
              Mesaj Bırakın
            </h2>
            <p className="text-xs text-stone-400 mb-6">
              Gelen tüm mesajları şahsen okuyor ve genellikle 24-48 saat içinde yanıtlıyorum.
            </p>

            {isSubmitted ? (
              <div className="py-12 text-center bg-[#181824] border border-[#ff5a1f]/40 rounded-2xl p-6 space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-[#ff5a1f] mx-auto" />
                <h3 className="font-heading text-2xl font-bold text-white">Mesajınız İletildi!</h3>
                <p className="text-stone-300 text-sm max-w-md mx-auto">
                  İlginiz için teşekkürler. En kısa sürede belirttiğiniz e-posta üzerinden sizinle iletişime geçeceğim.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs uppercase tracking-wider text-[#ff5a1f] hover:underline cursor-pointer font-semibold"
                >
                  Yeni bir mesaj gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-stone-400 block mb-1.5">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Adınız Soyadınız"
                      className="w-full px-4 py-3 bg-[#181822] border border-[#262635] rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-[#ff5a1f]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1.5">
                      E-posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ornek@posta.com"
                      className="w-full px-4 py-3 bg-[#181822] border border-[#262635] rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-[#ff5a1f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-stone-400 block mb-1.5">
                    Konu Başlığı
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Konuşma daveti, podcast, eğitim veya iş birliği"
                    className="w-full px-4 py-3 bg-[#181822] border border-[#262635] rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-[#ff5a1f]"
                  />
                </div>

                <div>
                  <label className="text-xs text-stone-400 block mb-1.5">
                    Mesajınız *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Fikrinizi, projenizi veya sorunuzu detaylandırın..."
                    className="w-full px-4 py-3 bg-[#181822] border border-[#262635] rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-[#ff5a1f]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ff5a1f] hover:bg-[#ff7442] text-white font-heading font-bold text-sm uppercase tracking-wider py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#ff5a1f]/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Mesajı Gönder</span>
                </button>
              </form>
            )}
          </div>

          {/* Sağ: İletişim Detayları & Sosyal Ağlar (5 Sütun) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121218] border border-[#1f1f28] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold block mb-1">
                  Doğrudan İletişim
                </span>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  E-Posta
                </h3>
                <a
                  href={`mailto:${SITE_DATA.general.email}`}
                  className="text-stone-300 hover:text-[#ff5a1f] text-sm transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#ff5a1f]" />
                  <span>{SITE_DATA.general.email}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#1f1f28]">
                <h4 className="font-heading text-base font-bold text-white mb-2">
                  Konuşma & Etkinlik Davetleri
                </h4>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Şirket içi yapay zekâ seminerleri, üniversite panelleri ve teknoloji zirveleri için en az 3-4 hafta öncesinden iletişime geçmenizi öneririm.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f1f28]">
                <h4 className="font-heading text-base font-bold text-white mb-3">
                  Sosyal Ağlar & Yayın Kanalları
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={SITE_DATA.general.socialLinks.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#181822] border border-[#262635] text-stone-300 hover:text-white hover:bg-[#ff5a1f] hover:border-[#ff5a1f] transition-colors"
                    aria-label="Spotify"
                  >
                    <SpotifyIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={SITE_DATA.general.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#181822] border border-[#262635] text-stone-300 hover:text-white hover:bg-[#ff5a1f] hover:border-[#ff5a1f] transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href={SITE_DATA.general.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#181822] border border-[#262635] text-stone-300 hover:text-white hover:bg-[#ff5a1f] hover:border-[#ff5a1f] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={SITE_DATA.general.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#181822] border border-[#262635] text-stone-300 hover:text-white hover:bg-[#ff5a1f] hover:border-[#ff5a1f] transition-colors"
                    aria-label="X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={SITE_DATA.general.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#181822] border border-[#262635] text-stone-300 hover:text-white hover:bg-[#ff5a1f] hover:border-[#ff5a1f] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* İsteğe bağlı Harita / Lokasyon Placeholder */}
            <div className="bg-[#121218] border border-[#1f1f28] rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#ff5a1f]" />
                <span className="font-heading text-sm font-bold text-white">
                  Lokasyon & Canlı Yayın Stüdyosu
                </span>
              </div>
              <p className="text-xs text-stone-400 mb-4">
                Ataşehir & Kadıköy / İstanbul • Çevrim içi & Yüz Yüze Etkinlikler
              </p>
              <div className="aspect-[21/9] w-full rounded-2xl bg-[#161622] border border-[#262638] flex items-center justify-center text-center p-4">
                <span className="text-xs text-stone-500 font-mono">
                  [ İstanbul, Türkiye — Harita Görünümü Aktif ]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
