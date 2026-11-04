import React, { useState, useEffect } from 'react';
import {
  Mail,
  MessageSquare,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  ExternalLink,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';
import { useSite } from '../../../context/SiteContext.tsx';

interface Subscriber {
  id: string;
  email: string;
  date: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read?: boolean;
}

export default function SubscribersTab() {
  const { token } = useSite();
  const [activeSubTab, setActiveSubTab] = useState<'subscribers' | 'messages'>('subscribers');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [subRes, msgRes] = await Promise.all([
        fetch('/api/newsletter/subscribers', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/contact/messages', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (subRes.ok) {
        const subs = await subRes.json();
        setSubscribers(subs);
      }
      if (msgRes.ok) {
        const msgs = await msgRes.json();
        setMessages(msgs);
      }
    } catch (err) {
      console.error('Veriler çekilemedi:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDeleteSubscriber = async (id: string) => {
    if (!window.confirm('Bu aboneyi silmek istediğinizden emin misiniz?')) return;
    try {
      const res = await fetch(`/api/newsletter/subscribers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Abone silinemedi:', err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;
    try {
      const res = await fetch(`/api/contact/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Mesaj silinemedi:', err);
    }
  };

  const handleMarkMessageRead = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (msg.read) return;

    try {
      await fetch(`/api/contact/messages/${msg.id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
    } catch (err) {
      console.error('Okundu işaretlenemedi:', err);
    }
  };

  const handleDownloadCsv = (type: 'subscribers' | 'messages') => {
    if (!token) return;
    const url =
      type === 'subscribers'
        ? '/api/newsletter/export-csv'
        : '/api/contact/messages/export-csv';

    // Auth header ile indirme
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.blob())
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = type === 'subscribers' ? 'bulten_aboneleri.csv' : 'iletisim_mesajlari.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => console.error('CSV indirilemedi:', err));
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Başlık ve Eylemler */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-white tracking-tight">
            Aboneler & Mesajlar
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Bültene abone olan e-postaları ve iletişim formundan gelen ziyaretçi mesajlarını görüntüleyin, CSV olarak indirin.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#14141e] hover:bg-[#1e1e2d] text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => handleDownloadCsv(activeSubTab)}
            className="px-4 py-2 rounded-xl bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV İndir</span>
          </button>
        </div>
      </div>

      {/* Alt Sekmeler */}
      <div className="flex items-center gap-2 border-b border-[#1c1c28] pb-3">
        <button
          onClick={() => setActiveSubTab('subscribers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === 'subscribers'
              ? 'bg-[var(--accent,#ff5a1f)] text-white shadow-md'
              : 'bg-[#12121a] text-stone-400 hover:text-white'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Bülten Aboneleri</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
            {subscribers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('messages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === 'messages'
              ? 'bg-[var(--accent,#ff5a1f)] text-white shadow-md'
              : 'bg-[#12121a] text-stone-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>İletişim Mesajları</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-600 text-white font-bold font-mono">
              {unreadCount} yeni
            </span>
          )}
        </button>
      </div>

      {/* Arama Barı */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            activeSubTab === 'subscribers'
              ? 'E-posta adreslerinde ara...'
              : 'İsim, konu veya mesaj içeriğinde ara...'
          }
          className="w-full pl-11 pr-4 py-2.5 bg-[#121218] border border-[#232332] rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
        />
      </div>

      {/* Bülten Aboneleri Listesi */}
      {activeSubTab === 'subscribers' && (
        <div className="bg-[#101018] border border-[#1f1f2e] rounded-2xl overflow-hidden">
          {filteredSubscribers.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500">
              Kayıtlı bülten abonesi bulunamadı.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#141420] border-b border-[#222232] text-stone-400 uppercase tracking-wider text-[10px] font-semibold">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">E-posta Adresi</th>
                  <th className="py-3 px-4">Kayıt Tarihi</th>
                  <th className="py-3 px-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b1b28]">
                {filteredSubscribers.map((sub, idx) => (
                  <tr key={sub.id} className="hover:bg-[#161622] transition-colors">
                    <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 text-stone-200 font-medium font-mono">
                      {sub.email}
                    </td>
                    <td className="py-3 px-4 text-stone-400 font-mono text-[11px]">
                      {new Date(sub.date).toLocaleString('tr-TR')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteSubscriber(sub.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* İletişim Mesajları Listesi */}
      {activeSubTab === 'messages' && (
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500 bg-[#101018] border border-[#1f1f2e] rounded-2xl">
              Gelen iletişim mesajı bulunamadı.
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleMarkMessageRead(msg)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  msg.read
                    ? 'bg-[#101018] border-[#1e1e2d] opacity-80'
                    : 'bg-[#151522] border-[var(--accent,#ff5a1f)]/50 shadow-md'
                }`}
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-[var(--accent,#ff5a1f)]" />
                    )}
                    <h4 className="text-xs font-bold text-white truncate">
                      {msg.name}
                    </h4>
                    <span className="text-[11px] text-stone-400 font-mono">
                      &lt;{msg.email}&gt;
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono ml-auto">
                      {new Date(msg.date).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-stone-300">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-stone-400 line-clamp-1">
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkMessageRead(msg);
                    }}
                    className="p-1.5 rounded-lg bg-[#1e1e2c] hover:bg-[#28283a] text-stone-300 transition-colors"
                    title="Görüntüle"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMessage(msg.id);
                    }}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Mesaj Detay Modalı */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#101018] border border-[#262638] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c1c28] mb-4">
              <span className="text-xs uppercase tracking-wider text-[var(--accent,#ff5a1f)] font-bold">
                Mesaj Detayı
              </span>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Gönderen</p>
                <h3 className="text-sm font-bold text-white">{selectedMessage.name}</h3>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-xs text-[var(--accent,#ff5a1f)] hover:underline font-mono inline-flex items-center gap-1 mt-0.5"
                >
                  <span>{selectedMessage.email}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Konu</p>
                <p className="text-xs font-semibold text-stone-200">{selectedMessage.subject}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Mesaj İçeriği</p>
                <div className="mt-1 p-4 bg-[#141420] border border-[#202030] rounded-xl text-xs text-stone-300 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1c1c28]">
                <span className="text-[10px] text-stone-500 font-mono">
                  {new Date(selectedMessage.date).toLocaleString('tr-TR')}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Ynt: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="px-4 py-2 rounded-xl bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    E-posta ile Yanıtla
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
