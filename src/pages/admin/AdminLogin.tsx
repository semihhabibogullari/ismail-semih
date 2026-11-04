import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import Signature from '../../components/Signature.tsx';
import { useSite } from '../../context/SiteContext.tsx';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

  const { login, isAuthenticated } = useSite();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Yönetici Girişi | İsmail Semih";
    // robots noindex ekle
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      metaRobots.setAttribute('content', 'noindex, nofollow');
      document.head.appendChild(metaRobots);
    } else {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    }

    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }

    return () => {
      // Çıkarken normal arama motoru indeksine çevir
      const tag = document.querySelector('meta[name="robots"]');
      if (tag) tag.setAttribute('content', 'all');
    };
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        login(data.token, data.user);
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(data.error || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        if (data.attemptsLeft !== undefined) {
          setAttemptsLeft(data.attemptsLeft);
        }
      }
    } catch {
      setErrorMsg('Giriş sunucusuna ulaşılamadı. Lütfen sunucunun çalıştığından emin olun.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Arka plan ışık efektleri */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent,#ff5a1f)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#0f0f15] border border-[#232332] rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Logo & Başlık */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Signature size="header" />
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1b26] border border-[#262638] text-[11px] uppercase tracking-widest text-[var(--accent,#ff5a1f)] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Yönetim Portalı (CMS)</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-800/80 text-red-200 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p>{errorMsg}</p>
              {attemptsLeft !== null && attemptsLeft > 0 && (
                <p className="text-[11px] text-red-300 mt-1 font-mono">
                  Kalan deneme hakkı: {attemptsLeft}
                </p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-stone-400 block mb-1.5 font-semibold">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Yönetici Kullanıcı Adı"
                autoComplete="username"
                className="w-full pl-11 pr-4 py-3 bg-[#15151f] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-stone-400 block mb-1.5 font-semibold">
              Şifre
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className="w-full pl-11 pr-4 py-3 bg-[#15151f] border border-[#28283a] rounded-xl text-white text-sm focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] disabled:opacity-50 text-white font-heading font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-[var(--accent,#ff5a1f)]/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Doğrulanıyor...</span>
              </>
            ) : (
              <>
                <span>Panele Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#1f1f28] text-center">
          <p className="text-[11px] text-stone-500">
            Güvenli Yönetim Arayüzü • 2 saat hareketsizlikte otomatik çıkış yapılır.
          </p>
        </div>
      </div>
    </div>
  );
}
