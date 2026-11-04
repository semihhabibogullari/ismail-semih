import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Sliders,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Edit3
} from 'lucide-react';
import { useSite } from '../../../context/SiteContext.tsx';
import { SectionConfig } from '../../../data.ts';

// @dnd-kit Sürüklenebilir Bölüm Öğesi
function SortableSectionItem({
  section,
  onToggleVisible,
  onDuplicate,
  onDelete,
  onUpdateConfig
}: {
  section: SectionConfig;
  onToggleVisible: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onUpdateConfig: (updates: Partial<SectionConfig>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-2xl p-4 transition-all ${
        section.visible
          ? 'bg-[#151520] border-[#252536] hover:border-stone-500'
          : 'bg-[#101017] border-[#1c1c26] opacity-60'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Sürükleme Tutacağı */}
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="p-1.5 text-stone-500 hover:text-white cursor-grab active:cursor-grabbing rounded-lg hover:bg-[#1f1f2e]"
            title="Sürükle ve Sırala"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span>{section.name}</span>
              {!section.visible && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-400 font-mono">
                  Gizli
                </span>
              )}
            </h4>
            <span className="text-[11px] text-stone-400 font-mono">
              Bölüm Tipi: {section.type}
            </span>
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#202030]"
            title="Izgara & Ayarlar"
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleVisible}
            className={`p-1.5 rounded-lg ${
              section.visible
                ? 'text-emerald-400 hover:bg-emerald-950/40'
                : 'text-stone-500 hover:bg-stone-800'
            }`}
            title={section.visible ? 'Gizle' : 'Göster'}
          >
            {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onDuplicate}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#202030]"
            title="Kopyala / Çoğalt"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
            title="Sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Genişletilmiş Izgara ve Boşluk Ayarları */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-[#232332] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-fadeIn">
          <div>
            <label className="text-stone-400 block mb-1">Masaüstü Sütun Sayısı (Grid Columns)</label>
            <select
              value={section.columns || 3}
              onChange={(e) => onUpdateConfig({ columns: parseInt(e.target.value, 10) })}
              className="w-full px-3 py-2 bg-[#1b1b28] border border-[#2d2d40] rounded-xl text-white"
            >
              <option value="1">1 Sütun (Tam Genişlik)</option>
              <option value="2">2 Sütun</option>
              <option value="3">3 Sütun (Standart)</option>
              <option value="4">4 Sütun</option>
            </select>
          </div>

          <div>
            <label className="text-stone-400 block mb-1">Kart Boşlukları (Gap)</label>
            <select
              value={section.gap || 'gap-8'}
              onChange={(e) => onUpdateConfig({ gap: e.target.value as any })}
              className="w-full px-3 py-2 bg-[#1b1b28] border border-[#2d2d40] rounded-xl text-white"
            >
              <option value="gap-4">Dar (16px)</option>
              <option value="gap-6">Orta (24px)</option>
              <option value="gap-8">Geniş (32px)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VisualEditorTab() {
  const { data, updateData, reorderSections } = useSite();
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [inlineEditing, setInlineEditing] = useState(false);

  const sections = data.sections || [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s: SectionConfig) => s.id === active.id);
      const newIndex = sections.findIndex((s: SectionConfig) => s.id === over.id);
      const reordered = arrayMove(sections, oldIndex, newIndex);
      reorderSections(reordered);
    }
  };

  const toggleSectionVisible = (id: string) => {
    const updated = sections.map((s: SectionConfig) => (s.id === id ? { ...s, visible: !s.visible } : s));
    reorderSections(updated);
  };

  const duplicateSection = (id: string) => {
    const target = sections.find((s: SectionConfig) => s.id === id);
    if (!target) return;
    const cloned: SectionConfig = {
      ...target,
      id: `sec-${Date.now()}`,
      name: `${target.name} (Kopya)`
    };
    const index = sections.findIndex((s: SectionConfig) => s.id === id);
    const updated = [...sections];
    updated.splice(index + 1, 0, cloned);
    reorderSections(updated);
  };

  const deleteSection = (id: string) => {
    if (sections.length <= 1) return;
    const updated = sections.filter((s: SectionConfig) => s.id !== id);
    reorderSections(updated);
  };

  const updateSectionConfig = (id: string, updates: Partial<SectionConfig>) => {
    const updated = sections.map((s: SectionConfig) => (s.id === id ? { ...s, ...updates } : s));
    reorderSections(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Üst Düzenleyici Araç Çubuğu */}
      <div className="bg-[#14141c] border border-[#232332] rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent,#ff5a1f)]" />
            Canlı Görsel Sayfa Düzenleyici
          </h3>
          <p className="text-xs text-stone-400">
            Bölümleri @dnd-kit ile sürükleyip sıralayın, sütun sayılarını ve boşluklarını yönetin.
          </p>
        </div>

        {/* Cihaz Boyutu Önizleme Anahtarı */}
        <div className="flex items-center gap-2 bg-[#1b1b26] p-1.5 rounded-2xl border border-[#28283a]">
          <button
            type="button"
            onClick={() => setDeviceView('desktop')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              deviceView === 'desktop' ? 'bg-[var(--accent,#ff5a1f)] text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Masaüstü</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceView('tablet')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              deviceView === 'tablet' ? 'bg-[var(--accent,#ff5a1f)] text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceView('mobile')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              deviceView === 'mobile' ? 'bg-[var(--accent,#ff5a1f)] text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobil</span>
          </button>
        </div>
      </div>

      {/* 2 Sütunlu Yan Yana Canlı Düzenleme Alanı */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sol Panel: @dnd-kit Bölüm Sıralayıcı (5 Sütun) */}
        <div className="lg:col-span-5 bg-[#121218] border border-[#1f1f28] rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#232332]">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              Ana Sayfa Bölüm Mimarisi
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              {sections.length} Bölüm
            </span>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections.map((s: SectionConfig) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2.5">
                {sections.map((section: SectionConfig) => (
                  <SortableSectionItem
                    key={section.id}
                    section={section}
                    onToggleVisible={() => toggleSectionVisible(section.id)}
                    onDuplicate={() => duplicateSection(section.id)}
                    onDelete={() => deleteSection(section.id)}
                    onUpdateConfig={(updates) => updateSectionConfig(section.id, updates)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Sağ Panel: Canlı Önizleme Çerçevesi (7 Sütun) */}
        <div className="lg:col-span-7 bg-[#121218] border border-[#1f1f28] rounded-3xl p-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-[#232332]">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
              Canlı Sayfa Simülasyonu ({deviceView})
            </span>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Canlı Senkronize
            </span>
          </div>

          {/* Cihaz Boyutlandırma Kapsayıcısı */}
          <div
            className={`transition-all duration-300 bg-[#0b0b0f] border border-[#232332] rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
              deviceView === 'mobile'
                ? 'w-[375px] min-h-[640px]'
                : deviceView === 'tablet'
                ? 'w-[768px] min-h-[640px]'
                : 'w-full min-h-[640px]'
            }`}
          >
            {/* Önizleme İçi Bölüm Kartları */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[680px]">
              {sections
                .filter((s: SectionConfig) => s.visible)
                .map((sec: SectionConfig, idx: number) => (
                  <div
                    key={sec.id}
                    className="p-5 rounded-xl bg-[#14141d] border border-[#232330] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {idx + 1}. {sec.name}
                      </span>
                      <span className="text-[10px] text-[var(--accent,#ff5a1f)] font-mono">
                        {sec.columns ? `${sec.columns} Sütun` : 'Geniş Banner'}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-400">
                      Ön yüzde {sec.name} bileşeni render edilir. Sıralama veya görünürlük soldaki panelden anında değiştirilebilir.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
