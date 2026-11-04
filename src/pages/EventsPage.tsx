import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  List,
  Clock,
  MapPin,
  Ticket,
  Search,
  ArrowUpRight,
  Archive,
  Sparkles
} from 'lucide-react';
import { SITE_DATA, SiteEvent } from '../data.ts';
import EventCalendar from '../components/EventCalendar.tsx';

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'archive'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = "Canlı Etkinlikler & Sahne Takvimi | İsmail Semih";
  }, []);

  const pastEvents: SiteEvent[] = [
    {
      id: "past-1",
      title: "Teknoloji Felsefesi ve Bilişsel Egemenlik Paneli",
      date: "2026-09-18",
      dayOfWeek: "Cuma",
      time: "20:00",
      dateFormatted: "18 Eylül 2026",
      venue: "Zorlu PSM Drama Sahnesi",
      category: "Konferans",
      price: "Katılım Tamamlandı",
      status: "sold_out",
      ticketUrl: "#",
      description: "650 kişilik salonun tamamen dolduğu gecede yapay zekâ çağında insan zihninin geleceğini tartıştık."
    },
    {
      id: "past-2",
      title: "Podcast #40 Özel Canlı Kaydı & Dinleyici Buluşması",
      date: "2026-08-12",
      dayOfWeek: "Çarşamba",
      time: "19:30",
      dateFormatted: "12 Ağustos 2026",
      venue: "Moda Sahnesi Stüdyo",
      category: "Canlı Yayın",
      price: "Katılım Tamamlandı",
      status: "sold_out",
      ticketUrl: "#",
      description: "Dinleyicilerimizle yüz yüze gerçekleştirilen samimi sezon finali kaydı."
    }
  ];

  const displayedEvents = activeTab === 'upcoming' ? SITE_DATA.events : pastEvents;

  const filteredEvents = displayedEvents.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Başlık */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block">
            Canlı Sahne & Buluşmalar
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Etkinlik Programı
          </h1>
          <p className="text-stone-400 text-sm sm:text-base font-light">
            Sahne konuşmaları, canlı podcast kayıtları, interaktif masterclass oturumları ve topluluk buluşmaları.
          </p>

          {/* Görünüm ve Arşiv Sekmeleri */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {/* Yaklaşan / Geçmiş Sekmeleri */}
            <div className="flex items-center bg-[#15151e] p-1 rounded-2xl border border-[#232332]">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'upcoming'
                    ? 'bg-[#ff5a1f] text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Yaklaşan Etkinlikler
              </button>
              <button
                onClick={() => setActiveTab('archive')}
                className={`text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'archive'
                    ? 'bg-[#ff5a1f] text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Archive className="w-3.5 h-3.5" />
                <span>Geçmiş Arşiv</span>
              </button>
            </div>

            {/* Liste / Takvim Görünümü Değiştirici */}
            {activeTab === 'upcoming' && (
              <div className="flex items-center bg-[#15151e] p-1 rounded-2xl border border-[#232332]">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-[#232332] text-white' : 'text-stone-400 hover:text-white'
                  }`}
                  aria-label="Liste Görünümü"
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">Liste</span>
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'calendar' ? 'bg-[#232332] text-white' : 'text-stone-400 hover:text-white'
                  }`}
                  aria-label="Takvim Görünümü"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Takvim</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Takvim Görünümü Seçildiyse */}
        {activeTab === 'upcoming' && viewMode === 'calendar' ? (
          <div className="space-y-8">
            <EventCalendar />
          </div>
        ) : (
          /* Liste Görünümü */
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Arama Alanı */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Etkinlik veya mekan ara..."
                className="w-full pl-11 pr-4 py-3 bg-[#121218] border border-[#232330] rounded-2xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#ff5a1f]"
              />
            </div>

            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#14141c] border border-[#232330] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#ff5a1f]/60 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  {/* Tarih Kutusu */}
                  <div className="w-24 bg-black/60 border border-[#2a2a3a] rounded-2xl p-3 text-center shrink-0">
                    <span className="text-[11px] uppercase tracking-wider text-[#ff5a1f] font-semibold block">
                      {event.dayOfWeek}
                    </span>
                    <span className="font-heading text-lg font-bold text-white block">
                      {event.date.split('-')[2]} {event.date.split('-')[1] === '11' ? 'Kasım' : 'Aralık'}
                    </span>
                    <span className="text-xs text-stone-400 font-mono block mt-0.5">
                      {event.time}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1e1e2c] text-[#ff5a1f] border border-[#2d2d3e] inline-block mb-1.5">
                      {event.category}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#ff5a1f] transition-colors mb-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-500" />
                      <span>{event.venue}</span>
                    </div>
                    <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-[#1f1f28] shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-500 uppercase block">Giriş / Bilet</span>
                    <span className="font-heading font-bold text-lg text-white">
                      {event.price}
                    </span>
                  </div>

                  {activeTab === 'archive' ? (
                    <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider px-4 py-2 rounded-xl bg-[#1c1c28]">
                      Tamamlandı
                    </span>
                  ) : event.status === 'sold_out' ? (
                    <button
                      disabled
                      className="px-5 py-2.5 rounded-xl bg-stone-800/60 text-stone-500 text-xs uppercase tracking-wider font-semibold cursor-not-allowed"
                    >
                      Tükendi
                    </button>
                  ) : (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#ff5a1f] hover:bg-[#ff7442] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-[#ff5a1f]/25"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Kayıt Ol</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
