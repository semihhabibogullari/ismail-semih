import React, { useState } from 'react';
import {
  Mic,
  Brain,
  Calendar,
  GraduationCap,
  Sparkles,
  Sliders,
  Newspaper,
  Plus,
  Trash2,
  Edit2,
  Search,
  Check,
  X,
  ExternalLink,
  Eye
} from 'lucide-react';
import { useSite } from '../../../context/SiteContext.tsx';
import LinkPreviewFetcher from '../../../components/LinkPreviewFetcher.tsx';
import {
  PodcastEpisode,
  AIArticle,
  SiteEvent,
  Course,
  FeaturedItem,
  HeroSlide,
  PressItem
} from '../../../data.ts';

type ContentType = 'podcasts' | 'aiArticles' | 'events' | 'courses' | 'featuredItems' | 'heroSlides' | 'pressArticles';

export default function ContentManagerTab() {
  const { data, updateData } = useSite();
  const [activeTab, setActiveTab] = useState<ContentType>('podcasts');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);

  const tabs: { id: ContentType; label: string; icon: any; count: number }[] = [
    { id: 'podcasts', label: 'Podcast\'ler', icon: Mic, count: data.podcasts?.length || 0 },
    { id: 'aiArticles', label: 'Yapay Zekâ', icon: Brain, count: data.aiArticles?.length || 0 },
    { id: 'events', label: 'Etkinlikler', icon: Calendar, count: data.events?.length || 0 },
    { id: 'courses', label: 'Eğitimler', icon: GraduationCap, count: data.courses?.length || 0 },
    { id: 'featuredItems', label: 'Öne Çıkanlar', icon: Sparkles, count: data.featuredItems?.length || 0 },
    { id: 'heroSlides', label: 'Hero Slaytları', icon: Sliders, count: data.heroSlides?.length || 0 },
    { id: 'pressArticles', label: 'Basın', icon: Newspaper, count: data.pressArticles?.length || 0 },
  ];

  // Silme İşlemi
  const handleDelete = (id: string) => {
    if (!window.confirm('Bu içeriği silmek istediğinizden emin misiniz?')) return;

    updateData((prev: any) => ({
      ...prev,
      [activeTab]: (prev[activeTab] as any[]).filter((item: any) => item.id !== id)
    }));
  };

  // Yeni İçerik Şablonu Oluşturma
  const handleAddNew = () => {
    setIsNew(true);
    const newId = `${activeTab.slice(0, 3)}-${Date.now()}`;

    switch (activeTab) {
      case 'podcasts':
        setEditingItem({
          id: newId,
          episodeNumber: (data.podcasts?.length || 0) + 1,
          title: '',
          subtitle: '',
          duration: '45 dk',
          dateFormatted: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
          dateIso: new Date().toISOString(),
          cover: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
          description: '',
          guest: '',
          spotifyUrl: '',
          appleUrl: '',
          youtubeUrl: '',
          shownotes: ['00:00 Giriş']
        });
        break;
      case 'aiArticles':
        setEditingItem({
          id: newId,
          title: '',
          summary: '',
          readTime: '6 dk okuma',
          dateFormatted: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
          dateIso: new Date().toISOString(),
          category: 'Yapay Zekâ & Strateji',
          tags: ['AI', 'Gelecek', 'Teknoloji'],
          cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
          content: ['İçerik paragrafı buraya yazılacak.'],
          keyTakeaways: ['Önemli çıkarım 1']
        });
        break;
      case 'events':
        setEditingItem({
          id: newId,
          title: '',
          date: new Date().toISOString().split('T')[0],
          dayOfWeek: 'Cumartesi',
          time: '20:30',
          dateFormatted: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
          venue: 'Kadıköy Sahne / Canlı Yayın',
          category: 'Söyleşi',
          price: 'Ücretsiz',
          status: 'available',
          ticketUrl: '',
          description: ''
        });
        break;
      case 'courses':
        setEditingItem({
          id: newId,
          title: '',
          subtitle: '',
          duration: '4 Hafta / 16 Saat',
          level: 'Orta',
          startDate: '15 Kasım 2026',
          price: '3.500 ₺',
          quota: '12 / 20 Kişi',
          cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
          description: '',
          syllabus: ['1. Hafta: Temel Giriş', '2. Hafta: İleri Uygulamalar'],
          features: ['Canlı Atölyeler', 'Sertifika', 'Birebir Mentorluk']
        });
        break;
      case 'featuredItems':
        setEditingItem({
          id: newId,
          title: '',
          category: 'Podcast',
          dateFormatted: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
          dateIso: new Date().toISOString(),
          actionLabel: 'Dinle',
          link: '/podcast',
          highlightText: 'YENİ BÖLÜM'
        });
        break;
      case 'heroSlides':
        const nextNum = String((data.heroSlides?.length || 0) + 1).padStart(2, '0');
        setEditingItem({
          id: newId,
          slideNumber: `${nextNum} / 05`,
          category: 'Yapay Zekâ & Kültür',
          badge: 'Öne Çıkan',
          title: '',
          description: '',
          buttonText: 'Hemen Keşfet',
          link: '/podcast',
          image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1280&auto=format&fit=crop'
        });
        break;
      case 'pressArticles':
        setEditingItem({
          id: newId,
          title: '',
          outlet: 'Basın Kuruluşu',
          date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
          excerpt: '',
          url: 'https://'
        });
        break;
    }
  };

  // Düzenleme Kaydetme
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    updateData((prev: any) => {
      const list = (prev[activeTab] as any[]) || [];
      if (isNew) {
        return {
          ...prev,
          [activeTab]: [editingItem, ...list]
        };
      } else {
        return {
          ...prev,
          [activeTab]: list.map((item: any) => (item.id === editingItem.id ? editingItem : item))
        };
      }
    });

    setEditingItem(null);
    setIsNew(false);
  };

  // Link Önizleme Doldurma Yardımcısı
  const handlePreviewFetched = (preview: { title: string; description: string; image: string; video: string; url: string }) => {
    if (!editingItem) return;
    setEditingItem((prev: any) => {
      const updated = { ...prev };
      if (preview.title) updated.title = preview.title;
      if (preview.description) {
        if ('summary' in updated) updated.summary = preview.description;
        else if ('description' in updated) updated.description = preview.description;
        else if ('excerpt' in updated) updated.excerpt = preview.description;
      }
      if (preview.image) {
        if ('cover' in updated) updated.cover = preview.image;
        else if ('image' in updated) updated.image = preview.image;
      }
      if (preview.url) {
        if ('spotifyUrl' in updated && preview.url.includes('spotify')) updated.spotifyUrl = preview.url;
        else if ('youtubeUrl' in updated && preview.url.includes('youtu')) updated.youtubeUrl = preview.url;
        else if ('ticketUrl' in updated) updated.ticketUrl = preview.url;
        else if ('url' in updated) updated.url = preview.url;
        else if ('link' in updated) updated.link = preview.url;
      }
      return updated;
    });
  };

  const currentItems = ((data[activeTab] as any[]) || []).filter((item: any) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Üst Bilgilendirme ve Yeni İçerik Ekle Butonu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-white tracking-tight">
            İçerik Yönetimi
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Podcast bölümleri, yazılar, etkinlikler ve eğitimleri düzenleyin veya link girerek otomatik doldurun.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[var(--accent,#ff5a1f)]/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni İçerik Ekle</span>
        </button>
      </div>

      {/* Kategori Seçim Sekmeleri */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#1c1c28]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent,#ff5a1f)] text-white shadow-md'
                  : 'bg-[#12121a] hover:bg-[#1a1a24] text-stone-300 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                isActive ? 'bg-black/30 text-white' : 'bg-[#1f1f2e] text-stone-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Arama Barı */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="İçeriklerde ara (başlık, açıklama, kategori)..."
          className="w-full pl-11 pr-4 py-2.5 bg-[#121218] border border-[#232332] rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
        />
      </div>

      {/* İçerik Kartları Tablosu / Listesi */}
      <div className="space-y-3">
        {currentItems.length === 0 ? (
          <div className="p-12 text-center bg-[#0e0e14] border border-[#1c1c28] rounded-2xl text-stone-500 text-xs">
            Arama kriterine uygun içerik bulunamadı veya henüz içerik eklenmemiş.
          </div>
        ) : (
          currentItems.map((item: any) => (
            <div
              key={item.id}
              className="p-4 bg-[#12121a] border border-[#1f1f2e] hover:border-[#2f2f44] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all group"
            >
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                {(item.cover || item.image) && (
                  <img
                    src={item.cover || item.image}
                    alt={item.title || ''}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#262638]"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {item.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1b1b26] text-[var(--accent,#ff5a1f)] font-semibold uppercase tracking-wider">
                        {item.category}
                      </span>
                    )}
                    {item.dateFormatted && (
                      <span className="text-[10px] text-stone-500 font-mono">
                        {item.dateFormatted}
                      </span>
                    )}
                    {item.duration && (
                      <span className="text-[10px] text-stone-400 font-mono">
                        ⏱ {item.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-heading font-semibold text-white truncate group-hover:text-[var(--accent,#ff5a1f)] transition-colors">
                    {item.title || 'Başlıksız İçerik'}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                    {item.subtitle || item.summary || item.description || item.excerpt || ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => {
                    setEditingItem({ ...item });
                    setIsNew(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#1a1a24] hover:bg-[#252534] text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[var(--accent,#ff5a1f)]" />
                  <span>Düzenle</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  title="Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Düzenleme / Ekleme Modalı */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#101017] border border-[#262638] rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#1c1c28] mb-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-white">
                  {isNew ? 'Yeni İçerik Ekle' : 'İçeriği Düzenle'}
                </h3>
                <p className="text-xs text-stone-400">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-[#1a1a24] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Link Önizleme Çekici (Otomatik Doldurma) */}
            <div className="mb-6">
              <LinkPreviewFetcher onFetched={handlePreviewFetched} />
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              {/* Başlık */}
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Başlık
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                />
              </div>

              {/* Alt Başlık / Özet */}
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Kısa Açıklama / Özet
                </label>
                <textarea
                  rows={3}
                  value={
                    editingItem.summary ||
                    editingItem.subtitle ||
                    editingItem.description ||
                    editingItem.excerpt ||
                    ''
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingItem((prev: any) => {
                      const u = { ...prev };
                      if ('summary' in u) u.summary = val;
                      else if ('description' in u) u.description = val;
                      else if ('subtitle' in u) u.subtitle = val;
                      else if ('excerpt' in u) u.excerpt = val;
                      else u.description = val;
                      return u;
                    });
                  }}
                  className="w-full px-4 py-2.5 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                />
              </div>

              {/* Görsel / Kapak URL */}
              {(editingItem.cover !== undefined || editingItem.image !== undefined) && (
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    Kapak Görseli URL
                  </label>
                  <input
                    type="url"
                    value={editingItem.cover || editingItem.image || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingItem((prev: any) => ({
                        ...prev,
                        cover: prev.cover !== undefined ? val : undefined,
                        image: prev.image !== undefined ? val : undefined
                      }));
                    }}
                    className="w-full px-4 py-2.5 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                  />
                </div>
              )}

              {/* İki Sütunlu Detaylar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {editingItem.category !== undefined && (
                  <div>
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                      Kategori
                    </label>
                    <input
                      type="text"
                      value={editingItem.category || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                    />
                  </div>
                )}

                {editingItem.dateFormatted !== undefined && (
                  <div>
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                      Tarih (Türkçe Format)
                    </label>
                    <input
                      type="text"
                      value={editingItem.dateFormatted || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, dateFormatted: e.target.value })}
                      className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                    />
                  </div>
                )}

                {editingItem.duration !== undefined && (
                  <div>
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                      Süre
                    </label>
                    <input
                      type="text"
                      value={editingItem.duration || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                      className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                    />
                  </div>
                )}

                {editingItem.price !== undefined && (
                  <div>
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                      Fiyat
                    </label>
                    <input
                      type="text"
                      value={editingItem.price || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                      className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                    />
                  </div>
                )}

                {editingItem.venue !== undefined && (
                  <div>
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                      Mekan / Konum
                    </label>
                    <input
                      type="text"
                      value={editingItem.venue || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, venue: e.target.value })}
                      className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                    />
                  </div>
                )}

                {editingItem.status !== undefined && (
                  <div>
                    <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                      Durum
                    </label>
                    <select
                      value={editingItem.status || 'available'}
                      onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                      className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                    >
                      <option value="available">Biletler Satışta (available)</option>
                      <option value="few_left">Son Kontenjan (few_left)</option>
                      <option value="sold_out">Tükendi (sold_out)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Dış Bağlantılar */}
              {editingItem.spotifyUrl !== undefined && (
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    Spotify Bağlantısı
                  </label>
                  <input
                    type="url"
                    value={editingItem.spotifyUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, spotifyUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                  />
                </div>
              )}

              {editingItem.youtubeUrl !== undefined && (
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    YouTube Bağlantısı
                  </label>
                  <input
                    type="url"
                    value={editingItem.youtubeUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, youtubeUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                  />
                </div>
              )}

              {editingItem.ticketUrl !== undefined && (
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    Kayıt / Bilet Linki
                  </label>
                  <input
                    type="url"
                    value={editingItem.ticketUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, ticketUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                  />
                </div>
              )}

              {editingItem.link !== undefined && (
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    Yönlendirme Linki (İç veya Dış URL)
                  </label>
                  <input
                    type="text"
                    value={editingItem.link || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                    className="w-full px-4 py-2 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1c1c28]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-[#1c1c28] hover:bg-[#252536] text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
