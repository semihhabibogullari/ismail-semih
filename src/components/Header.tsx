import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Radio,
  ArrowRight
} from 'lucide-react';
import Signature from './Signature.tsx';
import SearchModal from './SearchModal.tsx';
import { SITE_DATA } from '../data.ts';
import { useSite } from '../context/SiteContext.tsx';

// Spotify SVG ikonu (Lucide-react varsayılanında olmayabilir)
function SpotifyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sayfa değişiminde mobil menüyü kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const { data } = useSite();
  const rawMenuItems = data.menuItems?.filter((m: any) => m.visible) || [];
  const navItems = rawMenuItems.length > 0
    ? rawMenuItems
    : [
        { label: 'Ana Sayfa', path: '/' },
        { label: 'Podcast', path: '/podcast' },
        { label: 'Yapay Zekâ', path: '/yapay-zeka' },
        { label: 'Etkinlikler', path: '/etkinlikler' },
        { label: 'Eğitimler', path: '/egitimler' },
        { label: 'Hakkımda', path: '/hakkimda' },
        { label: 'İletişim', path: '/iletisim' }
      ];

  const socialLinks = data.general?.socials || SITE_DATA.general.socialLinks;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0b0b0f]/90 backdrop-blur-md border-b border-[#1f1f28]/90 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#0b0b0f]/95 via-[#0b0b0f]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Sol: El Yazısı İmza Logo ("İsmail Semih") */}
          <Link
            to="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] rounded-lg"
            aria-label="İsmail Semih - Ana Sayfa"
          >
            <Signature size="header" showUnderline={false} />
          </Link>

          {/* Orta: Masaüstü Menü (Tam sırayla) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item: any) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium tracking-normal transition-colors hover:text-[#ff5a1f] ${
                    isActive ? 'text-[#ff5a1f] font-semibold' : 'text-stone-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5a1f] rounded-full animate-fadeIn" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Sağ: Sosyal Medya İkonları + Arama */}
          <div className="hidden lg:flex items-center space-x-3.5">
            <div className="flex items-center space-x-3 text-stone-400 border-r border-[#1f1f28] pr-4">
              <a
                href={(socialLinks as any).spotify}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify Podcast"
                className="hover:text-[var(--accent,#ff5a1f)] hover:scale-110 transition-all p-1"
              >
                <SpotifyIcon className="w-4 h-4" />
              </a>
              <a
                href={(socialLinks as any).youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-[var(--accent,#ff5a1f)] hover:scale-110 transition-all p-1"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={(socialLinks as any).instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[var(--accent,#ff5a1f)] hover:scale-110 transition-all p-1"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={(socialLinks as any).twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-[var(--accent,#ff5a1f)] hover:scale-110 transition-all p-1"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={(socialLinks as any).linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[var(--accent,#ff5a1f)] hover:scale-110 transition-all p-1"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Arama Butonu */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Site İçi Arama"
              className="p-2 text-stone-300 hover:text-[#ff5a1f] hover:bg-[#16161f] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Mobilde Arama + Hamburger Butonları */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Arama"
              className="p-2 text-stone-300 hover:text-[#ff5a1f]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menü"
              className="p-2 text-stone-200 hover:text-[#ff5a1f] focus:outline-none cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Tam Ekran Mobil Panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0b0b0f] pt-24 pb-8 px-6 overflow-y-auto flex flex-col justify-between lg:hidden animate-fadeIn">
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#1f1f28]">
              <Signature size="header" showUnderline={false} />
              <span className="text-xs uppercase tracking-widest text-[#ff5a1f] font-mono">
                Menü
              </span>
            </div>

            <nav className="flex flex-col space-y-4">
              {navItems.map((item: any) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-xl font-heading transition-colors flex items-center justify-between py-1.5 ${
                      isActive ? 'text-[#ff5a1f] font-bold' : 'text-white hover:text-[#ff5a1f]'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-stone-600" />
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Mobil Alt Kısım: Sosyal Medya */}
          <div className="pt-8 border-t border-[#1f1f28] mt-6">
            <p className="text-xs text-stone-400 mb-3 text-center">Bizi Takip Edin & Dinleyin</p>
            <div className="flex justify-center space-x-6 text-stone-300">
              <a
                href={(socialLinks as any).spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent,#ff5a1f)] transition-colors"
                aria-label="Spotify"
              >
                <SpotifyIcon className="w-5 h-5" />
              </a>
              <a
                href={(socialLinks as any).youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent,#ff5a1f)] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={(socialLinks as any).instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent,#ff5a1f)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={(socialLinks as any).twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent,#ff5a1f)] transition-colors"
                aria-label="X"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={(socialLinks as any).linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent,#ff5a1f)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Arama Modalı */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
