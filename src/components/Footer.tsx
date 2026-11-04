import React from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight
} from 'lucide-react';
import Signature from './Signature.tsx';
import { SITE_DATA } from '../data.ts';

function SpotifyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export default function Footer() {
  const menuLinks = [
    { label: 'Ana Sayfa', path: '/' },
    { label: 'Podcast Yayınları', path: '/podcast' },
    { label: 'Yapay Zekâ Analizleri', path: '/yapay-zeka' },
    { label: 'Etkinlik Takvimi', path: '/etkinlikler' },
    { label: 'Eğitimler & Masterclass', path: '/egitimler' },
    { label: 'Hakkımda & Hikayem', path: '/hakkimda' },
    { label: 'İletişim & Ulaşım', path: '/iletisim' }
  ];

  return (
    <footer className="bg-[#08080c] border-t border-[#171720] text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 Sütunlu Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#1f1f28]">
          {/* 1. Sütun: İmza Logo (~56px ve %80 opaklıkta) + Kısa Tanıtım (5 Sütun) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block" aria-label="Ana Sayfa">
              <Signature size="footer" opacity="0.80" />
            </Link>

            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm pt-2">
              {SITE_DATA.general.bio}
            </p>

            <div className="pt-2 text-xs text-stone-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#ff5a1f]" />
              <a
                href={`mailto:${SITE_DATA.general.email}`}
                className="hover:text-white transition-colors"
              >
                {SITE_DATA.general.email}
              </a>
            </div>
          </div>

          {/* 2. Sütun: Menü Bağlantıları (4 Sütun) */}
          <div className="md:col-span-4">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5a1f]" />
              Menü Bağlantıları
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
              {menuLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-[#ff5a1f] transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <span className="text-stone-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Sütun: Sosyal Medya İkonları (3 Sütun) */}
          <div className="md:col-span-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5a1f]" />
              Bizi Takip Edin
            </h4>
            <p className="text-xs text-stone-400 font-light mb-4 leading-relaxed">
              Podcast yayınları, video içerikler ve günlük teknoloji notları için kanallarıma abone olabilirsiniz.
            </p>

            <div className="flex items-center space-x-2.5 text-stone-300">
              <a
                href={SITE_DATA.general.socialLinks.spotify}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                className="p-2.5 rounded-xl bg-[#14141d] hover:bg-[#ff5a1f] hover:text-white border border-[#232332] transition-colors"
              >
                <SpotifyIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_DATA.general.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2.5 rounded-xl bg-[#14141d] hover:bg-[#ff5a1f] hover:text-white border border-[#232332] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={SITE_DATA.general.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-[#14141d] hover:bg-[#ff5a1f] hover:text-white border border-[#232332] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_DATA.general.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="p-2.5 rounded-xl bg-[#14141d] hover:bg-[#ff5a1f] hover:text-white border border-[#232332] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={SITE_DATA.general.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-[#14141d] hover:bg-[#ff5a1f] hover:text-white border border-[#232332] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* En Altta Normal Fontla Telif Satırı (İmza fontu KULLANILMIYOR) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p className="font-normal font-sans">
            © 2026 İsmail Semih. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 text-stone-500">
            <Link to="/hakkimda" className="hover:text-stone-300 transition-colors">
              Hakkımda
            </Link>
            <span>•</span>
            <Link to="/iletisim" className="hover:text-stone-300 transition-colors">
              İletişim & İş Birlikleri
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
