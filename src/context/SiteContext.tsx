/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Sitenin dinamik verilerini, tasarım değişkenlerini (Design Tokens),
 * logo yapılandırmasını ve admin oturumunu yöneten React Context.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SITE_DATA, SiteDataState, DesignTokens, LogoSettings, HoverPopupSettings, SectionConfig } from '../data.ts';

interface SiteContextType {
  data: SiteDataState;
  isLoading: boolean;
  isDraftMode: boolean;
  setIsDraftMode: (val: boolean) => void;
  updateData: (newData: Partial<SiteDataState> | ((prev: SiteDataState) => SiteDataState)) => void;
  updateSection: (sectionId: string, updates: Partial<SectionConfig>) => void;
  reorderSections: (newSections: SectionConfig[]) => void;
  saveDraft: () => Promise<boolean>;
  publishSite: () => Promise<boolean>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
  refreshData: () => Promise<void>;
  fetchLinkPreview: (url: string) => Promise<any>;
}

const SiteContext = createContext<SiteContextType | null>(null);

// Varsayılan State
const fallbackState: SiteDataState = {
  version: 1,
  updatedAt: new Date().toISOString(),
  designTokens: {
    accentColor: '#ff5a1f',
    bgColor: '#0b0b0f',
    cardBgColor: '#121218',
    textColor: '#f1f1f4',
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    borderRadius: 'rounded-2xl',
    shadowIntensity: 'shadow-xl'
  },
  logoSettings: {
    mode: 'signature',
    signatureText: 'İsmail Semih',
    signatureFont: 'Great Vibes',
    signatureTilt: -3,
    signatureColor: '#ffffff',
    imageUrl: '',
    imageWidth: 160,
    faviconUrl: ''
  },
  featuredPanelSettings: {
    enabled: true,
    widthRatio: 38,
    listShiftAmount: 18,
    autoplayVideo: true,
    defaultItemId: 'first',
    size: 'md',
    showOnMobileTap: true
  },
  hoverPopupSettings: {
    enabled: true,
    widthRatio: 38,
    listShiftAmount: 18,
    autoplayVideo: true,
    defaultItemId: 'first',
    size: 'md',
    showOnMobileTap: true
  },
  sections: [
    { id: 'sec-hero', type: 'hero', name: 'Afiş Slider (Hero)', visible: true },
    { id: 'sec-featured', type: 'featured', name: 'Öne Çıkanlar (DasDas Liste)', visible: true },
    { id: 'sec-podcast', type: 'podcast', name: 'Son Podcast Bölümleri', visible: true, columns: 3, gap: 'gap-8' },
    { id: 'sec-ai', type: 'ai', name: 'Yapay Zekâ Analizleri', visible: true, columns: 3, gap: 'gap-8' },
    { id: 'sec-events', type: 'events', name: 'Etkinlik Takvimi (Haftalık)', visible: true },
    { id: 'sec-courses', type: 'courses', name: 'Eğitimler (Kart Şeridi)', visible: true },
    { id: 'sec-press', type: 'press', name: 'Basında İsmail Semih', visible: true, columns: 4, gap: 'gap-6' },
    { id: 'sec-newsletter', type: 'newsletter', name: 'Bülten Kayıt Şeridi', visible: true }
  ],
  menuItems: [
    { id: 'm-1', label: 'Ana Sayfa', path: '/', visible: true },
    { id: 'm-2', label: 'Podcast', path: '/podcast', visible: true },
    { id: 'm-3', label: 'Yapay Zekâ', path: '/yapay-zeka', visible: true },
    { id: 'm-4', label: 'Etkinlikler', path: '/etkinlikler', visible: true },
    { id: 'm-5', label: 'Eğitimler', path: '/egitimler', visible: true },
    { id: 'm-6', label: 'Hakkımda', path: '/hakkimda', visible: true },
    { id: 'm-7', label: 'İletişim', path: '/iletisim', visible: true }
  ],
  general: SITE_DATA.general,
  heroSlides: SITE_DATA.heroSlides,
  featuredItems: SITE_DATA.featuredItems,
  podcasts: SITE_DATA.podcasts,
  aiArticles: SITE_DATA.aiArticles,
  events: SITE_DATA.events,
  courses: SITE_DATA.courses,
  pressArticles: SITE_DATA.pressArticles,
  timeline: SITE_DATA.timeline,
  gallery: SITE_DATA.gallery
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteDataState>(fallbackState);
  const [isLoading, setIsLoading] = useState(true);
  const [isDraftMode, setIsDraftMode] = useState(false);
  const [token, setToken] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('ismail_admin_token') : null;
  });

  // Undo / Redo Yığını
  const [historyStack, setHistoryStack] = useState<SiteDataState[]>([]);
  const [redoStack, setRedoStack] = useState<SiteDataState[]>([]);

  // Sitedeki CSS Değişkenlerini (Design Tokens) Uygula
  const applyDesignTokens = useCallback((tokens: DesignTokens) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--accent', tokens.accentColor);
    root.style.setProperty('--accent-hover', tokens.accentColor);
    root.style.setProperty('--bg-dark', tokens.bgColor);
    root.style.setProperty('--card-dark', tokens.cardBgColor);
    root.style.setProperty('--text-main', tokens.textColor);
  }, []);

  // Sunucudan Veri Çek
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = isDraftMode ? '/api/data?draft=true' : '/api/data';
      const res = await fetch(url);
      if (res.ok) {
        const fetched = await res.json();
        setData(fetched);
        applyDesignTokens(fetched.designTokens);
      }
    } catch (err) {
      console.warn('Backend API erişilemedi, varsayılan veri kullanılıyor:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isDraftMode, applyDesignTokens]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Design Tokens Değiştikçe Canlı Uygula
  useEffect(() => {
    if (data.designTokens) {
      applyDesignTokens(data.designTokens);
    }
  }, [data.designTokens, applyDesignTokens]);

  // Veri Güncelleme (Undo Yığını Desteğiyle)
  const updateData = (updater: Partial<SiteDataState> | ((prev: SiteDataState) => SiteDataState)) => {
    setData((prev: SiteDataState) => {
      // Undo yığınına ekle (maks 30 adım)
      setHistoryStack((stack) => [...stack.slice(-30), prev]);
      setRedoStack([]); // Yeni işlem yapıldığında redo sıfırlanır

      if (typeof updater === 'function') {
        return updater(prev);
      }
      return { ...prev, ...updater };
    });
  };

  const undo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[historyStack.length - 1];
    setHistoryStack((stack) => stack.slice(0, stack.length - 1));
    setRedoStack((stack) => [...stack, data]);
    setData(previous);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((stack) => stack.slice(0, stack.length - 1));
    setHistoryStack((stack) => [...stack, data]);
    setData(next);
  };

  const updateSection = (sectionId: string, updates: Partial<SectionConfig>) => {
    updateData((prev: SiteDataState) => ({
      ...prev,
      sections: prev.sections.map((s: SectionConfig) => (s.id === sectionId ? { ...s, ...updates } : s))
    }));
  };

  const reorderSections = (newSections: SectionConfig[]) => {
    updateData((prev: SiteDataState) => ({
      ...prev,
      sections: newSections
    }));
  };

  // Taslak Kaydet
  const saveDraft = async (): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch('/api/data/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  // Canlıya Yayınla
  const publishSite = async (): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch('/api/data/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const result = await res.json();
        setData(result.data);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Linkten Önizleme Çekme Yardımcısı
  const fetchLinkPreview = async (url: string) => {
    try {
      const res = await fetch(`/api/preview?url=${encodeURIComponent(url.trim())}`);
      if (res.ok) {
        return await res.json();
      }
      return { error: 'Önizleme sunucusuna bağlanılamadı.' };
    } catch (err: any) {
      return { error: err.message || 'Önizleme çekilemedi.' };
    }
  };

  const login = (newToken: string, user: any) => {
    setToken(newToken);
    localStorage.setItem('ismail_admin_token', newToken);
  };

  const logout = () => {
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    setToken(null);
    localStorage.removeItem('ismail_admin_token');
  };

  return (
    <SiteContext.Provider
      value={{
        data,
        isLoading,
        isDraftMode,
        setIsDraftMode,
        updateData,
        updateSection,
        reorderSections,
        saveDraft,
        publishSite,
        undo,
        redo,
        canUndo: historyStack.length > 0,
        canRedo: redoStack.length > 0,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        refreshData,
        fetchLinkPreview
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
