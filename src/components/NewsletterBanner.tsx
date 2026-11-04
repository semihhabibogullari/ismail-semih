import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function NewsletterBanner() {
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
      className="py-12 md:py-16 bg-[#111111] border-y border-stone-800/80 relative overflow-hidden"
    >
      {/* Arka plan sahne ışığı efekti */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c9a45c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Metin Alanı */}
          <div className="text-center lg:text-left max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c9a45c] font-semibold mb-2 block">
              Sahneden İlk Siz Haberdar Olun
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Bültene Kayıt Ol
            </h2>
            <p className="text-stone-400 text-sm md:text-base font-light">
              Prömiyer duyuruları, indirimli erken dönem biletleri ve tiyatro atölyesi kontenjanları doğrudan gelen kutunuza gelsin.
            </p>
          </div>

          {/* Form / Teşekkürler Bildirimi */}
          <div className="w-full lg:w-auto lg:min-w-[460px]">
            {isSubmitted ? (
              <div className="bg-[#181818] border border-[#c9a45c]/40 rounded-2xl p-5 flex items-center gap-4 text-left shadow-lg animate-fadeIn">
                <CheckCircle2 className="w-8 h-8 text-[#c9a45c] shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-base">Teşekkürler!</h4>
                  <p className="text-stone-400 text-xs sm:text-sm">
                    Bültenimize başarıyla kaydoldunuz. Tiyatro dolu haberlerde buluşmak üzere!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresinizi girin..."
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-900 border border-stone-700/80 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#c9a45c] hover:bg-[#dfba6e] text-black font-semibold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-[#c9a45c]/20 hover:-translate-y-0.5 cursor-pointer shrink-0"
                >
                  <span>Kaydol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-stone-500 mt-2.5 text-center lg:text-left">
              İstediğiniz zaman tek tıkla ayrılabilirsiniz. Kişisel verileriniz gizlilik ilkelerimizce korunur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
