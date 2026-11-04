import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Palette,
  Compass,
  PanelLeft,
  Mail,
  Globe,
  History,
  Undo2,
  Redo2,
  Save,
  Send,
  Eye,
  LogOut,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  PenTool
} from 'lucide-react';
import { useSite } from '../../context/SiteContext.tsx';
import Signature from '../../components/Signature.tsx';

// Sekmeler
import VisualEditorTab from './tabs/VisualEditorTab.tsx';
import ContentManagerTab from './tabs/ContentManagerTab.tsx';
import DesignTokensTab from './tabs/DesignTokensTab.tsx';
import LogoSettingsTab from './tabs/LogoSettingsTab.tsx';
import MenuManagerTab from './tabs/MenuManagerTab.tsx';
import FeaturedPanelSettingsTab from './tabs/FeaturedPanelSettingsTab.tsx';
import SubscribersTab from './tabs/SubscribersTab.tsx';
import SeoSettingsTab from './tabs/SeoSettingsTab.tsx';
import HistoryBackupTab from './tabs/HistoryBackupTab.tsx';

type AdminTab =
  | 'visual'
  | 'content'
  | 'tokens'
  | 'logo'
  | 'menu'
  | 'popup'
  | 'subscribers'
  | 'seo'
  | 'history';

export default function AdminLayout() {
  const {
    data,
    isDraftMode,
    setIsDraftMode,
    saveDraft,
    publishSite,
    undo,
    redo,
    canUndo,
    canRedo,
    logout
  } = useSite();

  const [activeTab, setActiveTab] = useState<AdminTab>('visual');
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const handleSaveDraft = async () => {
    setActionLoading(true);
    setNotification(null);
    try {
      const ok = await saveDraft();
      if (ok) {
        setNotification({ type: 'success', text: 'Taslak başarıyla kaydedildi.' });
      } else {
        setNotification({ type: 'error', text: 'Taslak kaydedilemedi.' });
      }
    } catch {
      setNotification({ type: 'error', text: 'Bağlantı hatası oluştu.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!window.confirm('Tüm değişiklikler anında canlı siteye yayınlanacaktır. Devam edilsin mi?')) {
      return;
    }
    setActionLoading(true);
    setNotification(null);
    try {
      const ok = await publishSite();
      if (ok) {
        setNotification({ type: 'success', text: 'Tebrikler! Site başarıyla canlıya yayınlandı.' });
      } else {
        setNotification({ type: 'error', text: 'Yayınlama başarısız oldu.' });
      }
    } catch {
      setNotification({ type: 'error', text: 'Bağlantı hatası oluştu.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems: { id: AdminTab; label: string; icon: any }[] = [
    { id: 'visual', label: 'Görsel Düzenleyici', icon: LayoutDashboard },
    { id: 'content', label: 'İçerik Yönetimi', icon: Layers },
    { id: 'tokens', label: 'Tasarım & Renkler', icon: Palette },
    { id: 'logo', label: 'Logo & İmza', icon: PenTool },
    { id: 'menu', label: 'Menü Yönetimi', icon: Compass },
    { id: 'popup', label: 'Afiş Paneli Ayarları', icon: PanelLeft },
    { id: 'subscribers', label: 'Aboneler & Mesajlar', icon: Mail },
    { id: 'seo', label: 'SEO & Meta', icon: Globe },
    { id: 'history', label: 'Sürüm Geçmişi & Yedek', icon: History }
  ];

  return (
    <div className="min-h-screen bg-[#07070a] text-stone-100 flex flex-col font-sans selection:bg-[var(--accent,#ff5a1f)] selection:text-white">
      {/* Üst Bar (Top Header) */}
      <header className="sticky top-0 z-40 bg-[#0e0e15]/95 backdrop-blur-md border-b border-[#1c1c28] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Canlı / Taslak Mod Göstergesi */}
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="hover:opacity-90 transition-opacity">
              <Signature size="header" />
            </Link>
            <div className="h-5 w-px bg-[#262638] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest hidden sm:inline">
                Yönetim
              </span>
              <button
                onClick={() => setIsDraftMode(!isDraftMode)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDraftMode
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
                title="Tıklayarak Taslak / Canlı görünümünü değiştirin"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isDraftMode ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                <span>{isDraftMode ? 'Taslak Modu' : 'Canlı Sürüm (v' + (data.version || 1) + ')'}</span>
              </button>
            </div>
          </div>

          {/* Aksiyon Butonları (Undo, Redo, Save, Publish, View, Logout) */}
          <div className="flex items-center gap-2 flex-wrap self-end md:self-center">
            {/* Geri Al / İleri Al */}
            <div className="flex items-center bg-[#151520] border border-[#262638] rounded-xl p-1">
              <button
                onClick={undo}
                disabled={!canUndo}
                className="p-1.5 rounded-lg hover:bg-[#202030] disabled:opacity-30 text-stone-300 transition-colors cursor-pointer"
                title="Geri Al (Undo)"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className="p-1.5 rounded-lg hover:bg-[#202030] disabled:opacity-30 text-stone-300 transition-colors cursor-pointer"
                title="İleri Al (Redo)"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Taslağı Kaydet */}
            <button
              onClick={handleSaveDraft}
              disabled={actionLoading}
              className="px-3.5 py-2 rounded-xl bg-[#171724] hover:bg-[#212134] text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-[#27273a]"
              title="Değişiklikleri taslak olarak kaydet"
            >
              <Save className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Taslağı Kaydet</span>
            </button>

            {/* Canlıya Yayınla */}
            <button
              onClick={handlePublish}
              disabled={actionLoading}
              className="px-4 py-2 rounded-xl bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-[var(--accent,#ff5a1f)]/25 cursor-pointer"
            >
              {actionLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Canlıya Yayınla</span>
            </button>

            {/* Canlı Siteyi Aç */}
            <Link
              to="/"
              target="_blank"
              className="p-2 rounded-xl bg-[#151520] hover:bg-[#202030] text-stone-300 transition-colors"
              title="Siteyi Yeni Sekmede Görüntüle"
            >
              <Eye className="w-4 h-4" />
            </Link>

            {/* Çıkış Yap */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-[#151520] hover:bg-red-950/50 text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Yönetimden Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bildirim Barı */}
        {notification && (
          <div
            className={`max-w-7xl mx-auto mt-3 p-3 rounded-xl text-xs flex items-center justify-between gap-3 animate-fadeIn ${
              notification.type === 'success'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/80'
                : 'bg-red-950/70 text-red-300 border border-red-800/80'
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{notification.text}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-stone-400 hover:text-white text-[11px]"
            >
              Kapat
            </button>
          </div>
        )}
      </header>

      {/* Ana Gövde (Sidebar & Content) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col md:flex-row gap-6">
        {/* Sol Menü (Desktop) / Üst Yatay Tab Bar (Mobil) */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none sticky top-24">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer text-left ${
                    isActive
                      ? 'bg-[var(--accent,#ff5a1f)] text-white shadow-lg shadow-[var(--accent,#ff5a1f)]/20'
                      : 'bg-[#0f0f16] hover:bg-[#161622] text-stone-300 hover:text-white border border-transparent hover:border-[#222232]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Aktif Sekme İçeriği */}
        <main className="flex-1 min-w-0">
          <div className="bg-[#0b0b12] border border-[#1a1a26] rounded-3xl p-6 sm:p-8 shadow-xl">
            {activeTab === 'visual' && <VisualEditorTab />}
            {activeTab === 'content' && <ContentManagerTab />}
            {activeTab === 'tokens' && <DesignTokensTab />}
            {activeTab === 'logo' && <LogoSettingsTab />}
            {activeTab === 'menu' && <MenuManagerTab />}
            {activeTab === 'popup' && <FeaturedPanelSettingsTab />}
            {activeTab === 'subscribers' && <SubscribersTab />}
            {activeTab === 'seo' && <SeoSettingsTab />}
            {activeTab === 'history' && <HistoryBackupTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
