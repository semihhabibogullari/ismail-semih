/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import { SiteProvider, useSite } from './context/SiteContext.tsx';

// Sayfalar
import HomePage from './pages/HomePage.tsx';
import PodcastPage from './pages/PodcastPage.tsx';
import AIPage from './pages/AIPage.tsx';
import EventsPage from './pages/EventsPage.tsx';
import CoursesPage from './pages/CoursesPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';

// Admin Sayfaları
import AdminLogin from './pages/admin/AdminLogin.tsx';
import AdminLayout from './pages/admin/AdminLayout.tsx';

function AdminRoute() {
  const { isAuthenticated } = useSite();
  if (!isAuthenticated) {
    return <AdminLogin />;
  }
  return <AdminLayout />;
}

function MainApp() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-dark,#0b0b0f)] text-stone-100 font-sans selection:bg-[var(--accent,#ff5a1f)] selection:text-white">
      <ScrollToTop />

      {/* Sabit Header (Admin sayfalarında gizlenir) */}
      {!isAdmin && <Header />}

      {/* Ana İçerik */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Podcast Rotaları */}
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/podcast/:id" element={<PodcastPage />} />

          {/* Yapay Zekâ Rotaları */}
          <Route path="/yapay-zeka" element={<AIPage />} />
          <Route path="/yapay-zeka/:id" element={<AIPage />} />

          {/* Etkinlikler Rotaları */}
          <Route path="/etkinlikler" element={<EventsPage />} />

          {/* Eğitimler Rotaları */}
          <Route path="/egitimler" element={<CoursesPage />} />
          <Route path="/egitimler/:id" element={<CoursesPage />} />

          {/* Hakkımda */}
          <Route path="/hakkimda" element={<AboutPage />} />

          {/* İletişim */}
          <Route path="/iletisim" element={<ContactPage />} />

          {/* Admin Rotaları */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />

          {/* 404 Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer (Admin sayfalarında gizlenir) */}
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <MainApp />
      </SiteProvider>
    </BrowserRouter>
  );
}
