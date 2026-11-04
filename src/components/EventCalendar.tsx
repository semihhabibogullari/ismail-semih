import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Ticket,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';
import { SITE_DATA, SiteEvent } from '../data.ts';

export default function EventCalendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(10); // Kasım = 10 (0-indeksli)
  const [year] = useState(2026);
  const [selectedDate, setSelectedDate] = useState('2026-11-06');
  const [weekOffset, setWeekOffset] = useState(0);

  const monthsTr = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  // 1. Hafta (2 - 8 Kasım 2026)
  const week1Days = [
    { name: 'Pzt', full: 'Pazartesi', dayNum: 2, dateStr: '2026-11-02' },
    { name: 'Sal', full: 'Salı', dayNum: 3, dateStr: '2026-11-03' },
    { name: 'Çar', full: 'Çarşamba', dayNum: 4, dateStr: '2026-11-04' },
    { name: 'Per', full: 'Perşembe', dayNum: 5, dateStr: '2026-11-05' },
    { name: 'Cum', full: 'Cuma', dayNum: 6, dateStr: '2026-11-06' },
    { name: 'Cmt', full: 'Cumartesi', dayNum: 7, dateStr: '2026-11-07' },
    { name: 'Paz', full: 'Pazar', dayNum: 8, dateStr: '2026-11-08' },
  ];

  // 2. Hafta (9 - 15 Kasım 2026)
  const week2Days = [
    { name: 'Pzt', full: 'Pazartesi', dayNum: 9, dateStr: '2026-11-09' },
    { name: 'Sal', full: 'Salı', dayNum: 10, dateStr: '2026-11-10' },
    { name: 'Çar', full: 'Çarşamba', dayNum: 11, dateStr: '2026-11-11' },
    { name: 'Per', full: 'Perşembe', dayNum: 12, dateStr: '2026-11-12' },
    { name: 'Cum', full: 'Cuma', dayNum: 13, dateStr: '2026-11-13' },
    { name: 'Cmt', full: 'Cumartesi', dayNum: 14, dateStr: '2026-11-14' },
    { name: 'Paz', full: 'Pazar', dayNum: 15, dateStr: '2026-11-15' },
  ];

  const activeDays = weekOffset === 0 ? week1Days : week2Days;

  const dayEvents = SITE_DATA.events.filter((e) => e.date === selectedDate);
  const getEventsForDate = (dateStr: string) =>
    SITE_DATA.events.filter((e) => e.date === dateStr);

  const prevMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <section id="etkinlik-takvimi" className="py-16 md:py-24 bg-[#0e0e13] border-t border-[#1f1f28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bölüm Başlığı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1f1f28]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5" /> Canlı Sahne & Yayınlar
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Etkinlik Takvimi
            </h2>
          </div>

          {/* Ay ve Hafta Değiştirici */}
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="flex items-center bg-[#15151c] border border-[#232330] rounded-xl p-1 shadow-inner">
              <button
                onClick={prevMonth}
                aria-label="Önceki Ay"
                className="p-2 text-stone-400 hover:text-white hover:bg-[#1f1f2a] rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-4 py-1 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#ff5a1f]" />
                <span className="font-heading font-semibold text-white tracking-wide text-sm sm:text-base">
                  {monthsTr[currentMonthIndex]} {year}
                </span>
              </div>
              <button
                onClick={nextMonth}
                aria-label="Sonraki Ay"
                className="p-2 text-stone-400 hover:text-white hover:bg-[#1f1f2a] rounded-lg transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Hafta Geçiş Butonları */}
            <div className="hidden sm:flex items-center gap-1 bg-[#15151c] border border-[#232330] rounded-xl p-1 text-xs">
              <button
                onClick={() => {
                  setWeekOffset(0);
                  setSelectedDate('2026-11-06');
                }}
                className={`px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  weekOffset === 0
                    ? 'bg-[#ff5a1f] text-white'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                1. Hafta
              </button>
              <button
                onClick={() => {
                  setWeekOffset(1);
                  setSelectedDate('2026-11-14');
                }}
                className={`px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  weekOffset === 1
                    ? 'bg-[#ff5a1f] text-white'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                2. Hafta
              </button>
            </div>
          </div>
        </div>

        {/* Haftalık Takvim Şeridi (ModaSahnesi / DasDas Havası) */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-8">
          {activeDays.map((day) => {
            const eventsOnDay = getEventsForDate(day.dateStr);
            const hasEvents = eventsOnDay.length > 0;
            const isSelected = selectedDate === day.dateStr;

            return (
              <button
                key={day.dateStr}
                onClick={() => setSelectedDate(day.dateStr)}
                className={`flex flex-col items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer text-center group ${
                  isSelected
                    ? 'bg-[#181822] border-[#ff5a1f] shadow-lg shadow-[#ff5a1f]/20 ring-1 ring-[#ff5a1f]'
                    : hasEvents
                    ? 'bg-[#14141a] border-[#252535] hover:border-stone-500 hover:bg-[#181822]'
                    : 'bg-[#111116]/60 border-[#1c1c24] text-stone-600 hover:bg-[#14141a] hover:text-stone-400'
                }`}
              >
                <span
                  className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold ${
                    isSelected ? 'text-[#ff5a1f]' : 'text-stone-400'
                  }`}
                >
                  {day.name}
                </span>

                <span
                  className={`text-xl sm:text-2xl font-heading font-bold my-1 ${
                    isSelected
                      ? 'text-white'
                      : hasEvents
                      ? 'text-stone-100 group-hover:text-[#ff5a1f]'
                      : 'text-stone-600'
                  }`}
                >
                  {day.dayNum}
                </span>

                <div className="h-4 flex items-center justify-center">
                  {hasEvents ? (
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#ff5a1f] text-white'
                          : 'bg-[#ff5a1f]/20 text-[#ff5a1f]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span className="hidden sm:inline">{eventsOnDay.length} Etkinlik</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-600">-</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Seçili Günün Etkinlikleri */}
        <div className="bg-[#121218] border border-[#1f1f28] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1f1f28]">
            <div>
              <span className="text-xs text-[#ff5a1f] uppercase tracking-wider font-semibold">
                Seçilen Günün Programı
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-0.5">
                {activeDays.find((d) => d.dateStr === selectedDate)?.dayNum} {monthsTr[currentMonthIndex]} 2026,{' '}
                {activeDays.find((d) => d.dateStr === selectedDate)?.full}
              </h3>
            </div>
            <Link
              to="/etkinlikler"
              className="text-xs uppercase tracking-widest text-stone-400 hover:text-[#ff5a1f] flex items-center gap-1 transition-colors"
            >
              <span>Tüm Sezon Takvimi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Etkinlik Listesi */}
          {dayEvents.length > 0 ? (
            <div className="space-y-4">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 rounded-xl bg-[#161620] border border-[#232330] hover:border-[#ff5a1f]/60 transition-all gap-4 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Saat Kutusu */}
                    <div className="flex sm:flex-col items-center justify-center bg-black/60 border border-[#2a2a38] rounded-xl px-4 py-2 text-center shrink-0">
                      <Clock className="w-4 h-4 text-[#ff5a1f] mb-0.5 mr-1.5 sm:mr-0" />
                      <span className="font-heading text-lg font-bold text-white tracking-wide">
                        {event.time}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#20202c] text-[#ff5a1f]">
                          {event.category}
                        </span>
                        {event.status === 'few_left' && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/60 text-amber-300">
                            Son Kontenjan
                          </span>
                        )}
                        {event.status === 'sold_out' && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/70 border border-red-800/60 text-red-300">
                            Tükendi
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#ff5a1f] transition-colors">
                        {event.title}
                      </h4>

                      <div className="flex items-center gap-1.5 text-stone-400 text-xs sm:text-sm mt-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-500" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fiyat & Buton */}
                  <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#1f1f28]">
                    <div className="text-right">
                      <span className="text-[11px] text-stone-400 block uppercase">Giriş / Bilet</span>
                      <span className="font-heading text-lg font-bold text-white">
                        {event.price}
                      </span>
                    </div>

                    {event.status === 'sold_out' ? (
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
                        className="inline-flex items-center gap-1.5 bg-[#ff5a1f] hover:bg-[#ff7442] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-[#ff5a1f]/25 cursor-pointer"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Kayıt Ol / Bilet</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center flex flex-col items-center">
              <AlertCircle className="w-10 h-10 text-stone-600 mb-3" />
              <p className="text-stone-300 font-medium text-base">
                Bu tarihte planlanmış bir etkinlik bulunmamaktadır.
              </p>
              <p className="text-stone-500 text-xs max-w-md mt-1">
                Lütfen haftanın diğer günlerine göz atın veya aşağıdaki eğitim ve yayın programlarını inceleyin.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
