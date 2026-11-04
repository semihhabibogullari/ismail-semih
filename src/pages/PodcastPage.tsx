import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Play,
  Pause,
  Clock,
  Calendar,
  Search,
  ArrowLeft,
  Volume2,
  RotateCcw,
  RotateCw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SITE_DATA, PodcastEpisode } from '../data.ts';

function SpotifyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export default function PodcastPage() {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);

  const activeEpisode = id
    ? SITE_DATA.podcasts.find((p) => p.id === id) || SITE_DATA.podcasts[0]
    : null;

  useEffect(() => {
    if (activeEpisode) {
      document.title = `Bölüm #${activeEpisode.episodeNumber}: ${activeEpisode.title} | İsmail Semih Podcast`;
    } else {
      document.title = "Podcast Yayınları | İsmail Semih";
    }
  }, [activeEpisode]);

  const filteredPodcasts = SITE_DATA.podcasts.filter(
    (ep) =>
      ep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bölüm Detay Görünümü */}
        {activeEpisode ? (
          <div className="max-w-4xl mx-auto">
            <Link
              to="/podcast"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-400 hover:text-[#ff5a1f] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Tüm Podcast Bölümlerine Dön
            </Link>

            {/* Oynatıcı Kartı */}
            <div className="bg-[#121218] border border-[#1f1f28] rounded-3xl p-6 sm:p-10 shadow-2xl mb-12">
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                <img
                  src={activeEpisode.cover}
                  alt={activeEpisode.title}
                  className="w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-2xl border border-[#262635] shadow-2xl shrink-0"
                />

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#ff5a1f] bg-[#ff5a1f]/10 border border-[#ff5a1f]/30 px-3 py-1 rounded-full inline-block mb-3">
                    Bölüm #{activeEpisode.episodeNumber}
                  </span>

                  <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                    {activeEpisode.title}
                  </h1>

                  <p className="text-stone-300 text-sm sm:text-base font-light mb-4">
                    {activeEpisode.subtitle}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                      {activeEpisode.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeEpisode.dateFormatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Simüle Edilmiş Ses Oynatıcısı */}
              <div className="bg-[#181822] rounded-2xl p-5 border border-[#262638]">
                {/* İlerleme Çubuğu */}
                <div className="mb-4">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newPercent = Math.min(Math.max((clickX / rect.width) * 100, 0), 100);
                      setProgress(newPercent);
                    }}
                    className="w-full h-2 bg-[#2a2a3c] rounded-full cursor-pointer relative overflow-hidden group"
                  >
                    <div
                      className="h-full bg-[#ff5a1f] rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1.5">
                    <span>12:40</span>
                    <span>{activeEpisode.duration}</span>
                  </div>
                </div>

                {/* Kontrol Butonları */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setProgress((p) => Math.max(0, p - 5))}
                      className="p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
                      title="15 saniye geri"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-[#ff5a1f] text-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-[#ff5a1f]/30"
                      aria-label={isPlaying ? 'Durdur' : 'Oynat'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => setProgress((p) => Math.min(100, p + 5))}
                      className="p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
                      title="15 saniye ileri"
                    >
                      <RotateCw className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Platform Butonları */}
                  <div className="flex items-center gap-2">
                    <a
                      href={activeEpisode.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#1f1f2c] hover:bg-[#ff5a1f] hover:text-white text-stone-300 text-xs px-3.5 py-2 rounded-xl transition-colors border border-[#2b2b3d]"
                    >
                      <SpotifyIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Spotify</span>
                    </a>
                    <a
                      href={activeEpisode.appleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#1f1f2c] hover:bg-[#ff5a1f] hover:text-white text-stone-300 text-xs px-3.5 py-2 rounded-xl transition-colors border border-[#2b2b3d]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Apple Podcasts</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bölüm Açıklaması & Notlar */}
              <div className="mt-8 pt-8 border-t border-[#1f1f28] space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">Bölüm Hakkında</h3>
                  <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                    {activeEpisode.description}
                  </p>
                </div>

                {activeEpisode.guest && (
                  <div className="p-4 rounded-xl bg-[#181822] border border-[#262638] text-sm">
                    <span className="text-xs uppercase tracking-wider text-[#ff5a1f] font-semibold block mb-1">
                      Özel Konuk
                    </span>
                    <strong className="text-white">{activeEpisode.guest}</strong>
                  </div>
                )}

                {/* Bölüm Zaman Damgaları (Shownotes) */}
                <div>
                  <h4 className="font-heading text-base font-bold text-white mb-3">
                    Bölüm Notları & Zaman Damgaları
                  </h4>
                  <div className="space-y-2">
                    {activeEpisode.shownotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#161620] border border-[#222230] text-xs sm:text-sm text-stone-300 font-mono"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Bölüm Listesi Görünümü */
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block">
                Sesli İçerikler
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
                İsmail Semih Podcast
              </h1>
              <p className="text-stone-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
                Yapay zekâ devrimi, zihinsel modeller, üretkenlik ve geleceğin felsefesi üzerine haftalık derinlemesine sohbetler.
              </p>

              {/* Arama Kutusu */}
              <div className="max-w-md mx-auto mt-8 relative">
                <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Bölüm ara..."
                  className="w-full pl-11 pr-4 py-3 bg-[#121218] border border-[#232330] rounded-2xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#ff5a1f]"
                />
              </div>
            </div>

            {/* Bölümler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPodcasts.map((ep) => (
                <Link
                  key={ep.id}
                  to={`/podcast/${ep.id}`}
                  className="bg-[#121218] border border-[#1f1f28] rounded-2xl overflow-hidden shadow-xl hover:border-[#ff5a1f]/60 transition-all flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div className="relative aspect-square w-full bg-[#1c1c28] overflow-hidden">
                    <img
                      src={ep.cover}
                      alt={ep.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#ff5a1f] border border-[#ff5a1f]/30 px-3 py-1 rounded-full">
                      Bölüm #{ep.episodeNumber}
                    </span>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-[#ff5a1f] text-white flex items-center justify-center shadow-xl">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mb-2 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                        <span>{ep.duration}</span>
                        <span>•</span>
                        <span>{ep.dateFormatted}</span>
                      </div>

                      <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#ff5a1f] transition-colors leading-snug mb-2">
                        {ep.title}
                      </h3>

                      <p className="text-stone-400 text-xs sm:text-sm line-clamp-2 font-light">
                        {ep.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#1f1f28] flex items-center justify-between text-xs text-stone-400">
                      <span>Bölümü İncele</span>
                      <span className="text-[#ff5a1f] font-semibold">Dinle →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
