import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Award
} from 'lucide-react';
import { SITE_DATA, Course } from '../data.ts';

export default function CoursesPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', note: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeCourse = id
    ? SITE_DATA.courses.find((c) => c.id === id) || SITE_DATA.courses[0]
    : null;

  useEffect(() => {
    if (activeCourse) {
      document.title = `${activeCourse.title} | İsmail Semih Eğitimleri`;
    } else {
      document.title = "Eğitimler & Masterclass Programları | İsmail Semih";
    }
  }, [activeCourse]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedCourseForModal(null);
        setFormData({ name: '', email: '', phone: '', note: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeCourse ? (
          /* Eğitim Detay Sayfası */
          <div className="max-w-4xl mx-auto">
            <Link
              to="/egitimler"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-400 hover:text-[#ff5a1f] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Tüm Eğitimlere Dön
            </Link>

            <div className="bg-[#121218] border border-[#1f1f28] rounded-3xl overflow-hidden shadow-2xl mb-12">
              <div className="relative aspect-[21/9] min-h-[260px] w-full bg-[#1c1c28]">
                <img
                  src={activeCourse.cover}
                  alt={activeCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#ff5a1f] border border-[#ff5a1f]/30 px-3 py-1 rounded-full">
                  {activeCourse.level} Seviye
                </span>
              </div>

              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 mb-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#ff5a1f]" /> Başlangıç: {activeCourse.startDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {activeCourse.duration}
                  </span>
                  <span>•</span>
                  <span>{activeCourse.quota}</span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                  {activeCourse.title}
                </h1>

                <p className="text-stone-300 text-base sm:text-lg font-light mb-8">
                  {activeCourse.subtitle}
                </p>

                {/* Fiyat ve Ön Kayıt Şeridi */}
                <div className="p-6 rounded-2xl bg-[#181824] border border-[#262638] flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
                  <div>
                    <span className="text-xs text-stone-400 block uppercase">Eğitim Bedeli</span>
                    <span className="font-heading text-3xl font-bold text-white">
                      {activeCourse.price}
                    </span>
                    <span className="text-xs text-[#ff5a1f] block mt-0.5 font-medium">
                      * Canlı oturumlar, materyaller ve mentorluk dahil
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCourseForModal(activeCourse)}
                    className="w-full sm:w-auto bg-[#ff5a1f] hover:bg-[#ff7442] text-white font-heading font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all shadow-xl shadow-[#ff5a1f]/25 hover:scale-105 cursor-pointer"
                  >
                    Kayıt Ol & Yerinizi Ayırtın
                  </button>
                </div>

                {/* Açıklama */}
                <div className="space-y-6 text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-10">
                  <h3 className="font-heading text-xl font-bold text-white">Program Hakkında</h3>
                  <p>{activeCourse.description}</p>
                </div>

                {/* Müfredat */}
                <div className="mb-10">
                  <h3 className="font-heading text-xl font-bold text-white mb-4">
                    Eğitim Müfredatı
                  </h3>
                  <div className="space-y-3">
                    {activeCourse.syllabus.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#161620] border border-[#232330] flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#ff5a1f]/20 text-[#ff5a1f] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-stone-200 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ayrıcalıklar */}
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-4">
                    Program Kazanımları & Dahil Olanlar
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCourse.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#161620] border border-[#232330] text-xs sm:text-sm text-stone-300 flex items-center gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#ff5a1f] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Eğitimler Liste Görünümü */
          <div>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-[#ff5a1f] font-semibold mb-2 block flex items-center justify-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> Bilişsel Beceriler
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
                Eğitimler & Masterclass
              </h1>
              <p className="text-stone-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
                Yapay zekâ araçlarını iş akışlarınıza entegre etmek, içerik üreticiliğinde profesyonelleşmek ve dijital üretkenliğinizi katlamak için uygulamalı programlar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SITE_DATA.courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-[#121218] border border-[#1f1f28] rounded-2xl overflow-hidden shadow-xl hover:border-[#ff5a1f]/60 transition-all flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1c1c28]">
                    <img
                      src={course.cover}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#ff5a1f] border border-[#ff5a1f]/30 px-2.5 py-1 rounded-md">
                      {course.level}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] font-medium bg-black/80 backdrop-blur-md text-stone-200 border border-stone-700/60 px-2.5 py-1 rounded-md">
                      {course.duration}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mb-2 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#ff5a1f]" />
                        <span>Başlangıç: {course.startDate}</span>
                      </div>

                      <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#ff5a1f] transition-colors leading-snug mb-2">
                        {course.title}
                      </h3>

                      <p className="text-stone-400 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed mb-4">
                        {course.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1f1f28] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-500 block uppercase">Ücret</span>
                        <span className="font-heading font-bold text-lg text-white">
                          {course.price}
                        </span>
                      </div>

                      <Link
                        to={`/egitimler/${course.id}`}
                        className="inline-flex items-center gap-1.5 bg-[#ff5a1f] hover:bg-[#ff7442] text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-[#ff5a1f]/25"
                      >
                        <span>Detay</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kayıt Modalı */}
        {selectedCourseForModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setSelectedCourseForModal(null)}
          >
            <div
              className="w-full max-w-lg bg-[#14141c] border border-[#232330] rounded-3xl p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#ff5a1f] mx-auto animate-bounce" />
                  <h3 className="font-heading text-2xl font-bold text-white">Kaydınız Alındı!</h3>
                  <p className="text-stone-300 text-sm">
                    {selectedCourseForModal.title} programı için ön kaydınız oluşturuldu. Ödeme ve detay brifingi e-posta adresinize gönderilecektir.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">
                    Eğitim Ön Kayıt Formu
                  </h3>
                  <p className="text-xs text-[#ff5a1f] mb-6 font-medium">
                    {selectedCourseForModal.title} — {selectedCourseForModal.price}
                  </p>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="text-xs text-stone-400 block mb-1">Adınız Soyadınız *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Adınız Soyadınız"
                        className="w-full px-4 py-3 bg-[#191924] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[#ff5a1f]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-stone-400 block mb-1">E-posta Adresiniz *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ornek@mail.com"
                        className="w-full px-4 py-3 bg-[#191924] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[#ff5a1f]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-stone-400 block mb-1">Telefon Numaranız</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05XX XXX XX XX"
                        className="w-full px-4 py-3 bg-[#191924] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[#ff5a1f]"
                      />
                    </div>

                    <div className="flex gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCourseForModal(null)}
                        className="w-1/2 py-3 rounded-xl bg-stone-800 text-stone-300 text-xs uppercase font-semibold cursor-pointer"
                      >
                        Vazgeç
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 py-3 rounded-xl bg-[#ff5a1f] hover:bg-[#ff7442] text-white text-xs uppercase font-semibold cursor-pointer"
                      >
                        Kaydı Tamamla
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
