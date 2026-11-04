import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Mic, Cpu, Calendar, GraduationCap, ArrowRight } from 'lucide-react';
import { SITE_DATA } from '../data.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingPodcasts = q
    ? SITE_DATA.podcasts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    : [];

  const matchingArticles = q
    ? SITE_DATA.aiArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const matchingEvents = q
    ? SITE_DATA.events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      )
    : [];

  const matchingCourses = q
    ? SITE_DATA.courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchingPodcasts.length +
    matchingArticles.length +
    matchingEvents.length +
    matchingCourses.length;

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site İçi Arama"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 px-4 pb-8"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#121217] border border-[#1f1f28] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Arama Alanı */}
        <div className="flex items-center px-5 py-4 border-b border-[#1f1f28] bg-[#16161d]">
          <Search className="w-5 h-5 text-[#ff5a1f] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Podcast, yapay zekâ yazısı, etkinlik veya eğitim ara..."
            className="w-full bg-transparent text-white placeholder-stone-500 text-base md:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-3 text-xs uppercase tracking-wider bg-stone-800 hover:bg-stone-700 text-stone-300 px-2.5 py-1.5 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Sonuçlar */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          {q === '' ? (
            <div className="py-8 text-center text-stone-500 text-sm">
              <p>Popüler aramalar:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Yapay Zekâ', 'Prompt Mühendisliği', 'Podcast #48', 'DasDas Sahne', 'İkinci Beyin', 'Deep Work'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs bg-[#191922] border border-[#232330] hover:border-[#ff5a1f] hover:text-[#ff5a1f] text-stone-300 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <p className="text-base font-medium">"{query}" ile eşleşen içerik bulunamadı.</p>
              <p className="text-xs text-stone-500 mt-1">Lütfen farklı bir anahtar kelime deneyin.</p>
            </div>
          ) : (
            <>
              {/* Podcast Sonuçları */}
              {matchingPodcasts.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold mb-2 flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5" /> Podcast Bölümleri ({matchingPodcasts.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingPodcasts.map((pod) => (
                      <div
                        key={pod.id}
                        onClick={() => handleSelect(`/podcast/${pod.id}`)}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-[#16161d] hover:bg-[#1d1d28] border border-[#232330] hover:border-[#ff5a1f]/60 cursor-pointer transition-colors group"
                      >
                        <img
                          src={pod.cover}
                          alt={pod.title}
                          className="w-11 h-11 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white group-hover:text-[#ff5a1f] transition-colors truncate">
                            #{pod.episodeNumber} - {pod.title}
                          </p>
                          <p className="text-xs text-stone-400 truncate">{pod.duration} • {pod.dateFormatted}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-[#ff5a1f] transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Yapay Zekâ Sonuçları */}
              {matchingArticles.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Yapay Zekâ İçerikleri ({matchingArticles.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleSelect(`/yapay-zeka/${art.id}`)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#16161d] hover:bg-[#1d1d28] border border-[#232330] hover:border-[#ff5a1f]/60 cursor-pointer transition-colors group"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="text-sm font-medium text-white group-hover:text-[#ff5a1f] transition-colors truncate">
                            {art.title}
                          </p>
                          <p className="text-xs text-stone-400">{art.category} • {art.readTime}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-[#ff5a1f] transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Etkinlik Sonuçları */}
              {matchingEvents.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Etkinlikler ({matchingEvents.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingEvents.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => handleSelect('/etkinlikler')}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#16161d] hover:bg-[#1d1d28] border border-[#232330] hover:border-[#ff5a1f]/60 cursor-pointer transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-white group-hover:text-[#ff5a1f] transition-colors">
                            {ev.title}
                          </p>
                          <p className="text-xs text-stone-400">{ev.dateFormatted} • {ev.venue}</p>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded bg-[#232330] text-[#ff5a1f] font-medium shrink-0">
                          {ev.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Eğitim Sonuçları */}
              {matchingCourses.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Eğitimler ({matchingCourses.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingCourses.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelect(`/egitimler/${c.id}`)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#16161d] hover:bg-[#1d1d28] border border-[#232330] hover:border-[#ff5a1f]/60 cursor-pointer transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-white group-hover:text-[#ff5a1f] transition-colors">
                            {c.title}
                          </p>
                          <p className="text-xs text-stone-400">{c.duration} • Başlangıç: {c.startDate}</p>
                        </div>
                        <span className="text-xs text-[#ff5a1f] font-semibold shrink-0">
                          {c.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
