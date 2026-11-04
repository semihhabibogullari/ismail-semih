import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Cpu,
  Clock,
  Calendar,
  Tag,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { SITE_DATA, AIArticle } from '../data.ts';
import Signature from '../components/Signature.tsx';

export default function AIPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedTag, setSelectedTag] = useState<string>('Tümü');

  const activeArticle = id
    ? SITE_DATA.aiArticles.find((a) => a.id === id) || SITE_DATA.aiArticles[0]
    : null;

  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} | İsmail Semih Yapay Zekâ`;
    } else {
      document.title = "Yapay Zekâ Analizleri & Rehberler | İsmail Semih";
    }
  }, [activeArticle]);

  const allTags = ['Tümü', 'LLM', 'Prompt Engineering', 'AI Agents', 'Bilişsel Tasarım', 'Felsefe'];

  const filteredArticles = SITE_DATA.aiArticles.filter((art) => {
    if (selectedTag === 'Tümü') return true;
    return art.tags.includes(selectedTag);
  });

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeArticle ? (
          /* Makale Detay Görünümü */
          <div className="max-w-3xl mx-auto">
            <Link
              to="/yapay-zeka"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-400 hover:text-[#ff5a1f] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Tüm Yapay Zekâ Yazılarına Dön
            </Link>

            <article className="space-y-8">
              {/* Başlık & Üst Bilgiler */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider bg-[#ff5a1f]/10 text-[#ff5a1f] border border-[#ff5a1f]/30 px-3 py-1 rounded-full">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" /> {activeArticle.readTime}
                  </span>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {activeArticle.dateFormatted}
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                  {activeArticle.title}
                </h1>

                <p className="text-stone-300 text-lg sm:text-xl font-light leading-relaxed">
                  {activeArticle.summary}
                </p>
              </div>

              {/* Büyük Kapak Görseli */}
              <div className="rounded-3xl overflow-hidden border border-[#1f1f28] shadow-2xl aspect-[16/9] w-full bg-[#161622]">
                <img
                  src={activeArticle.cover}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Önemli Çıkarımlar Kutusu (Key Takeaways) */}
              <div className="bg-[#121218] border-l-4 border-[#ff5a1f] rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl">
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff5a1f]" />
                  Öne Çıkan Ana Fikirler (Takeaways)
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
                  {activeArticle.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#ff5a1f] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tam Metin Paragrafları */}
              <div className="space-y-6 text-stone-300 text-base sm:text-lg font-light leading-relaxed border-b border-[#1f1f28] pb-10">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Yazar Notu & İmza */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#121218] border border-[#1f1f28] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-heading text-base font-bold text-white mb-1">
                    İsmail Semih
                  </h4>
                  <p className="text-xs text-stone-400">
                    İçerik Üreticisi, Teknoloji Düşünürü & Eğitmen
                  </p>
                </div>
                <Signature size="header" />
              </div>
            </article>
          </div>
        ) : (
          /* Liste Görünümü */
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block flex items-center justify-center gap-1.5">
                <Cpu className="w-4 h-4" /> Bilişsel Devrim
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
                Yapay Zekâ Kütüphanesi
              </h1>
              <p className="text-stone-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
                Prompt mühendisliği, büyük dil modelleri ve geleceğin meslekleri üzerine kapsamlı araştırma dosyaları ve rehberler.
              </p>

              {/* Etiket Filtreleri */}
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-[#ff5a1f] text-white shadow-md shadow-[#ff5a1f]/20'
                        : 'bg-[#14141a] border border-[#232330] text-stone-400 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Kart Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((item) => (
                <article
                  key={item.id}
                  className="bg-[#121218] border border-[#1f1f28] rounded-2xl overflow-hidden shadow-xl hover:border-[#ff5a1f]/60 transition-all flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[16/10] w-full bg-[#1c1c28] overflow-hidden">
                    <img
                      src={item.cover}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold bg-black/80 backdrop-blur-md text-[#ff5a1f] border border-[#ff5a1f]/30 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mb-2.5">
                        <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                        <span>{item.readTime}</span>
                        <span>•</span>
                        <span>{item.dateFormatted}</span>
                      </div>

                      <Link to={`/yapay-zeka/${item.id}`}>
                        <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#ff5a1f] transition-colors leading-snug mb-3">
                          {item.title}
                        </h3>
                      </Link>

                      <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed mb-4">
                        {item.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] text-stone-400 bg-[#181824] px-2.5 py-0.5 rounded-md border border-[#262635]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1f1f28] flex items-center justify-between">
                      <span className="text-xs text-stone-400">Yazıyı Oku</span>
                      <Link
                        to={`/yapay-zeka/${item.id}`}
                        className="text-xs font-semibold text-[#ff5a1f] hover:underline"
                      >
                        İncele →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
