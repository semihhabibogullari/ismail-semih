import React, { useState } from 'react';
import { Link2, Loader2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useSite } from '../context/SiteContext.tsx';

interface LinkPreviewResult {
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  type?: string;
  url?: string;
  warning?: string;
  error?: string;
}

interface LinkPreviewFetcherProps {
  onFetched: (data: {
    title: string;
    description: string;
    image: string;
    video: string;
    url: string;
  }) => void;
  initialUrl?: string;
}

export default function LinkPreviewFetcher({ onFetched, initialUrl = '' }: LinkPreviewFetcherProps) {
  const { fetchLinkPreview } = useSite();
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);

  const handleFetch = async () => {
    if (!url || !url.trim().startsWith('http')) {
      setFeedback({ type: 'error', message: 'Lütfen geçerli bir http:// veya https:// bağlantısı girin.' });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const data: LinkPreviewResult = await fetchLinkPreview(url);

      if (data.error) {
        setFeedback({ type: 'error', message: data.error });
      } else {
        onFetched({
          title: data.title || '',
          description: data.description || '',
          image: data.image || '',
          video: data.video || '',
          url: url.trim()
        });

        if (data.warning) {
          setFeedback({ type: 'warning', message: data.warning });
        } else {
          setFeedback({
            type: 'success',
            message: `Bağlantıdan veriler başarıyla çekildi: ${data.title ? `"${data.title.slice(0, 35)}..."` : 'Önizleme hazır'}`
          });
        }
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Bağlantı çekilirken bir hata oluştu.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#181824] border border-[#262638] rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
          <Link2 className="w-4 h-4 text-[var(--accent,#ff5a1f)]" />
          İçerik Linki (Önizleme Otomatik Çekilir)
        </label>
        <span className="text-[10px] text-stone-500 font-mono">
          YouTube, Spotify, Web, Doğrudan Görsel/Video
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=... veya https://open.spotify.com/..."
          className="flex-1 px-4 py-2.5 bg-[#121218] border border-[#2b2b3d] rounded-xl text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
        />

        <button
          type="button"
          onClick={handleFetch}
          disabled={loading || !url.trim()}
          className="bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] disabled:opacity-50 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Çekiliyor...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Önizleme Çek</span>
            </>
          )}
        </button>
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
              : feedback.type === 'warning'
              ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
              : 'bg-red-950/60 text-red-300 border border-red-800/60'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
}
