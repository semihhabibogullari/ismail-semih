import React, { useState, useEffect } from 'react';
import {
  History,
  Download,
  Upload,
  RotateCcw,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  FileJson,
  Calendar,
  User,
  ShieldAlert
} from 'lucide-react';
import { useSite } from '../../../context/SiteContext.tsx';

interface HistoryItem {
  id: string;
  timestamp: string;
  note: string;
  data: any;
}

export default function HistoryBackupTab() {
  const { token, refreshData } = useSite();
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchHistory = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('/api/data/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setHistoryList(data);
      }
    } catch (err) {
      console.error('Sürüm geçmişi alınamadı:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [token]);

  // Sürüme Geri Dön
  const handleRestoreVersion = async (versionId: string, note: string) => {
    if (!window.confirm(`"${note}" sürümüne geri dönmek istediğinizden emin misiniz? Mevcut yayınlanmamış değişiklikler üzerine yazılacaktır.`)) {
      return;
    }

    try {
      const res = await fetch('/api/data/history/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ versionId })
      });

      if (res.ok) {
        setStatusMsg({ type: 'success', text: `"${note}" sürümüne başarıyla geri dönüldü!` });
        await refreshData();
        await fetchHistory();
      } else {
        setStatusMsg({ type: 'error', text: 'Geri yükleme başarısız oldu.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Sunucuya bağlanırken bir hata oluştu.' });
    }
  };

  // Tek Dosya JSON Yedeği İndir
  const handleExportBackup = () => {
    if (!token) return;
    fetch('/api/backup/export', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toISOString().split('T')[0];
        a.download = `ismail-semih-tam-yedek-${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setStatusMsg({ type: 'success', text: 'Tam sistem yedeği JSON formatında indirildi.' });
      })
      .catch(() => setStatusMsg({ type: 'error', text: 'Yedek dosyası indirilemedi.' }));
  };

  // JSON Yedeğini Geri Yükle
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm(`"${file.name}" dosyasını içeri aktarmak istediğinizden emin misiniz? Tüm içerik, ayarlar ve aboneler güncellenecektir.`)) {
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const backupPackage = JSON.parse(event.target?.result as string);
        const res = await fetch('/api/backup/restore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(backupPackage)
        });

        if (res.ok) {
          setStatusMsg({ type: 'success', text: 'Yedek başarıyla yüklendi ve uygulandı!' });
          await refreshData();
          await fetchHistory();
        } else {
          const err = await res.json();
          setStatusMsg({ type: 'error', text: err.error || 'Yedek yüklenemedi.' });
        }
      } catch {
        setStatusMsg({ type: 'error', text: 'Geçersiz JSON dosyası formatı.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Başlık ve Eylemler */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
            <span>Sürüm Geçmişi & Sistem Yedeği</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Canlıya yayınlanan son 20 sürüm anlık görüntüsü ve tek tıkla tam JSON yedekleme/içe aktarma.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <label className="px-3.5 py-2 rounded-xl bg-[#171722] hover:bg-[#222232] text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#272738]">
            <Upload className="w-3.5 h-3.5" />
            <span>Yedek Yükle (JSON)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>

          <button
            onClick={handleExportBackup}
            className="px-4 py-2 rounded-xl bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Yedek İndir (JSON)</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center justify-between gap-3 ${
            statusMsg.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-300'
              : 'bg-red-950/60 border border-red-800/80 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMsg.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
          <button
            onClick={() => setStatusMsg(null)}
            className="text-stone-400 hover:text-white text-xs"
          >
            Kapat
          </button>
        </div>
      )}

      {/* Sürüm Geçmişi Listesi (Maksimum 20 Sürüm) */}
      <div className="bg-[#12121a] border border-[#222232] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#1c1c28]">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <FileJson className="w-4 h-4 text-[var(--accent,#ff5a1f)]" />
            <span>Yayınlanan Sürüm Anlık Görüntüleri ({historyList.length} / 20)</span>
          </h3>
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white transition-colors cursor-pointer"
            title="Yenile"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {historyList.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            Henüz kaydedilmiş bir sürüm anlık görüntüsü bulunmuyor. Siteyi "Canlıya Yayınla" butonuna bastığınızda otomatik oluşturulur.
          </div>
        ) : (
          <div className="space-y-3">
            {historyList.map((item, index) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#161622] border border-[#252538] hover:border-[#383852] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#202030] text-stone-300 text-[10px] font-mono flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white">
                      {item.note || `Sürüm Anlık Görüntüsü`}
                    </h4>
                    {index === 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-[10px] font-semibold">
                        Son Kaydedilen
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-stone-400 font-mono pl-8">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-500" />
                      {new Date(item.timestamp).toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRestoreVersion(item.id, item.note)}
                  className="px-4 py-2 rounded-xl bg-[#202030] hover:bg-[var(--accent,#ff5a1f)] text-stone-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-end sm:self-center"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Bu Sürüme Dön</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
