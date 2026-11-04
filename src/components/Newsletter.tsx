import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, BellRing } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      aria-label="E-Bülten Kaydı"
      className="w-full bg-[#ff5a1f] text-black py-14 md:py-20 relative overflow-hidden"
    >
      {/* Hafif geometrik arka plan dokusu */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Sol: Başlık ve Alt Metin */}
          <div className="text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 bg-black/10 text-black font-semibold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
              <BellRing className="w-3.5 h-3.5" />
              <span>Haftalık Fikir & İçerik Bülteni</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black mb-3">
              Bültene Üye Ol
            </h2>

            <p className="text-black/85 text-base sm:text-lg font-medium leading-relaxed">
              Yeni bölümler, etkinlikler ve eğitimlerden ilk sen haberdar ol.
            </p>
          </div>

          {/* Sağ: E-posta Formu / Teşekkürler Bildirimi */}
          <div className="w-full lg:w-auto lg:min-w-[480px]">
            {isSubmitted ? (
              <div className="bg-black/95 text-white rounded-2xl p-6 flex items-center gap-4 text-left shadow-2xl animate-fadeIn">
                <CheckCircle2 className="w-8 h-8 text-[#ff5a1f] shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-lg text-white">Teşekkürler!</h4>
                  <p className="text-stone-300 text-xs sm:text-sm mt-0.5">
                    Bültenimize başarıyla kaydoldun. İlk sayıda görüşmek üzere!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 text-black/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresini gir..."
                    className="w-full pl-11 pr-4 py-4 bg-black/90 text-white placeholder-stone-400 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black border border-black/40 shadow-xl"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black hover:bg-black/80 text-white font-heading font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xl hover:scale-105 cursor-pointer shrink-0"
                >
                  <span>Üye Ol</span>
                  <ArrowRight className="w-4 h-4 text-[#ff5a1f]" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-black/70 mt-3 text-center lg:text-left font-medium">
              Spam yok. Dilediğin an tek tıkla abonelikten ayrılabilirsin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
