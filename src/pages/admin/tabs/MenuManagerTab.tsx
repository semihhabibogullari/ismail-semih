import React, { useState } from 'react';
import {
  Menu as MenuIcon,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  RotateCcw,
  Compass
} from 'lucide-react';
import { useSite } from '../../../context/SiteContext.tsx';
import { MenuItem } from '../../../data.ts';

export default function MenuManagerTab() {
  const { data, updateData } = useSite();
  const menuItems = data.menuItems || [];
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleToggleVisible = (id: string) => {
    updateData((prev: any) => ({
      ...prev,
      menuItems: prev.menuItems.map((item: MenuItem) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= menuItems.length) return;

    const updated = [...menuItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    updateData((prev: any) => ({
      ...prev,
      menuItems: updated
    }));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Bu menü öğesini silmek istediğinizden emin misiniz?')) return;
    updateData((prev: any) => ({
      ...prev,
      menuItems: prev.menuItems.filter((item: MenuItem) => item.id !== id)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isNew) {
      updateData((prev: any) => ({
        ...prev,
        menuItems: [...prev.menuItems, editingItem]
      }));
    } else {
      updateData((prev: any) => ({
        ...prev,
        menuItems: prev.menuItems.map((item: MenuItem) =>
          item.id === editingItem.id ? editingItem : item
        )
      }));
    }

    setEditingItem(null);
    setIsNew(false);
  };

  const handleResetDefaults = () => {
    if (!window.confirm('Menü öğelerini varsayılana döndürmek istiyor musunuz?')) return;
    updateData((prev: any) => ({
      ...prev,
      menuItems: [
        { id: 'm-1', label: 'Ana Sayfa', path: '/', visible: true },
        { id: 'm-2', label: 'Podcast', path: '/podcast', visible: true },
        { id: 'm-3', label: 'Yapay Zekâ', path: '/yapay-zeka', visible: true },
        { id: 'm-4', label: 'Etkinlikler', path: '/etkinlikler', visible: true },
        { id: 'm-5', label: 'Eğitimler', path: '/egitimler', visible: true },
        { id: 'm-6', label: 'Hakkımda', path: '/hakkimda', visible: true },
        { id: 'm-7', label: 'İletişim', path: '/iletisim', visible: true }
      ]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
            <span>Menü Yönetimi</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Üst başlıkta (Header) ve mobilde yer alan bağlantıların sırasını, isimlerini ve görünürlüklerini ayarlayın.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-[#1a1a26] hover:bg-[#252538] text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Varsayılana Dön</span>
          </button>
          <button
            onClick={() => {
              setIsNew(true);
              setEditingItem({
                id: `m-${Date.now()}`,
                label: '',
                path: '/',
                visible: true
              });
            }}
            className="px-4 py-2 rounded-xl bg-[var(--accent,#ff5a1f)] hover:bg-[var(--accent-hover,#ff7442)] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Menü Öğesi</span>
          </button>
        </div>
      </div>

      {/* Menü Listesi */}
      <div className="space-y-2.5">
        {menuItems.map((item: MenuItem, index: number) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
              item.visible
                ? 'bg-[#12121a] border-[#222232]'
                : 'bg-[#0e0e14] border-[#181822] opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-center text-xs font-mono text-stone-500">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>{item.label}</span>
                  {!item.visible && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-400">
                      Gizli
                    </span>
                  )}
                </h4>
                <p className="text-xs font-mono text-stone-400 mt-0.5">
                  {item.path}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                disabled={index === 0}
                onClick={() => handleMove(index, 'up')}
                className="p-2 rounded-lg bg-[#181824] hover:bg-[#222234] disabled:opacity-30 text-stone-300 transition-colors cursor-pointer"
                title="Yukarı Taşı"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                disabled={index === menuItems.length - 1}
                onClick={() => handleMove(index, 'down')}
                className="p-2 rounded-lg bg-[#181824] hover:bg-[#222234] disabled:opacity-30 text-stone-300 transition-colors cursor-pointer"
                title="Aşağı Taşı"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleToggleVisible(item.id)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  item.visible
                    ? 'bg-[#181824] text-stone-300 hover:text-white'
                    : 'bg-red-950/40 text-red-400'
                }`}
                title={item.visible ? 'Gizle' : 'Göster'}
              >
                {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setEditingItem({ ...item });
                  setIsNew(false);
                }}
                className="p-2 rounded-lg bg-[#181824] hover:bg-[#222234] text-[var(--accent,#ff5a1f)] transition-colors cursor-pointer"
                title="Düzenle"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors cursor-pointer"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Düzenleme Modalı */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#101017] border border-[#262638] rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c1c28] mb-5">
              <h3 className="text-base font-heading font-bold text-white">
                {isNew ? 'Yeni Menü Öğesi Ekle' : 'Menü Öğesini Düzenle'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Menü Başlığı (Etiket)
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.label}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  placeholder="Örn: Galeri, Projeler"
                  className="w-full px-4 py-2.5 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Yönlendirme Yolu (Path veya URL)
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.path}
                  onChange={(e) => setEditingItem({ ...editingItem, path: e.target.value })}
                  placeholder="/yeni-sayfa veya https://..."
                  className="w-full px-4 py-2.5 bg-[#151520] border border-[#2b2b3d] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[var(--accent,#ff5a1f)]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="menuVisible"
                  checked={editingItem.visible}
                  onChange={(e) => setEditingItem({ ...editingItem, visible: e.target.checked })}
                  className="rounded bg-[#1a1a24] border-[#2b2b3d] text-[var(--accent,#ff5a1f)] focus:ring-0"
                />
                <label htmlFor="menuVisible" className="text-xs text-stone-300 font-medium cursor-pointer">
                  Menüde görünür olsun
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#1c1c28]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-[#1c1c28] text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[var(--accent,#ff5a1f)] text-white text-xs font-semibold uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
