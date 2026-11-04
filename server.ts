/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Express + Vite Full-Stack Sunucusu
 * İsmail Semih Kişisel Marka Web Sitesi & Admin API
 */

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {
  getSiteData,
  getDraftData,
  saveSiteData,
  saveDraftData,
  getHistory,
  saveHistorySnapshot,
  getSubscribers,
  addSubscriber,
  deleteSubscriber,
  getMessages,
  addMessage,
  deleteMessage,
  markMessageRead
} from './server/store.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Güvenli Yönetici Kimlik Bilgileri (Ortam Değişkeni / Backend)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'İsmailSemih';
const ADMIN_PASSWORD_RAW = process.env.ADMIN_PASSWORD || 'Habib1959oglu.tr';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD_RAW, 10);
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'ismail-semih-super-secret-jwt-key-2026';

// Oturum Yönetimi (2 Saat Geçerlilik)
interface Session {
  token: string;
  username: string;
  createdAt: number;
  lastActive: number;
}
const activeSessions = new Map<string, Session>();
const SESSION_MAX_INACTIVITY = 2 * 60 * 60 * 1000; // 2 saat hareketsizlik

// Rate Limiting (5 Hatalı Girişte 15 Dakika Kilitleme)
interface RateLimitRecord {
  attempts: number;
  lockedUntil: number;
}
const loginRateLimits = new Map<string, RateLimitRecord>();

function getClientIp(req: Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
}

// Kimlik Doğrulama Middleware'i
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yetkisiz erişim. Lütfen giriş yapın.' });
  }

  const token = authHeader.substring(7);
  const session = activeSessions.get(token);

  if (!session) {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş oturum.' });
  }

  // 2 Saatlik Hareketsizlik Kontrolü
  const now = Date.now();
  if (now - session.lastActive > SESSION_MAX_INACTIVITY) {
    activeSessions.delete(token);
    return res.status(401).json({ error: 'Oturum hareketsizlik nedeniyle sonlandırıldı. Lütfen tekrar giriş yapın.' });
  }

  session.lastActive = now;
  (req as any).user = { username: session.username };
  next();
}

// ----------------------------------------------------
// 1. KİMLİK DOĞRULAMA (AUTH) ROTLARI
// ----------------------------------------------------

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const ip = getClientIp(req);
  const now = Date.now();

  const rate = loginRateLimits.get(ip) || { attempts: 0, lockedUntil: 0 };

  // 15 Dakikalık Kilit Kontrolü
  if (rate.lockedUntil > now) {
    const remainingMins = Math.ceil((rate.lockedUntil - now) / (60 * 1000));
    return res.status(429).json({
      error: `Çok fazla hatalı giriş denemesi. Lütfen ${remainingMins} dakika sonra tekrar deneyin.`
    });
  }

  // Kullanıcı adı ve şifre kontrolü
  const isValidUsername = username === ADMIN_USERNAME;
  const isValidPassword = password && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);

  if (!isValidUsername || !isValidPassword) {
    rate.attempts += 1;
    if (rate.attempts >= 5) {
      rate.lockedUntil = now + 15 * 60 * 1000; // 15 dakika kilit
      loginRateLimits.set(ip, rate);
      return res.status(429).json({
        error: '5 kez hatalı giriş yapıldı. Güvenliğiniz için 15 dakika boyunca giriş engellendi.'
      });
    }
    loginRateLimits.set(ip, rate);
    return res.status(401).json({
      error: 'Kullanıcı adı veya şifre hatalı.',
      attemptsLeft: 5 - rate.attempts
    });
  }

  // Giriş Başarılı -> Rate limit sıfırla & Oturum Tokenı üret
  loginRateLimits.delete(ip);
  const token = crypto.randomBytes(32).toString('hex');
  activeSessions.set(token, {
    token,
    username: ADMIN_USERNAME,
    createdAt: now,
    lastActive: now
  });

  return res.json({
    success: true,
    token,
    user: { username: ADMIN_USERNAME }
  });
});

app.get('/api/auth/me', requireAuth, (req: Request, res: Response) => {
  return res.json({
    authenticated: true,
    user: (req as any).user
  });
});

app.post('/api/auth/logout', requireAuth, (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    activeSessions.delete(token);
  }
  return res.json({ success: true });
});

// ----------------------------------------------------
// 2. SİTE VERİSİ & YAYINLAMA / TASLAK ROTLARI
// ----------------------------------------------------

// Canlı veya Taslak Veriyi Oku
app.get('/api/data', (req: Request, res: Response) => {
  const isDraftRequested = req.query.draft === 'true';
  if (isDraftRequested) {
    // Taslak veriyi çek
    return res.json(getDraftData());
  }
  return res.json(getSiteData());
});

// Taslak Olarak Kaydet (Admin)
app.post('/api/data/draft', requireAuth, (req: Request, res: Response) => {
  const newData = req.body;
  newData.updatedAt = new Date().toISOString();
  saveDraftData(newData);
  return res.json({ success: true, message: 'Taslak başarıyla kaydedildi.', data: newData });
});

// Canlıya Yayınla (Admin)
app.post('/api/data/publish', requireAuth, (req: Request, res: Response) => {
  const dataToPublish = req.body;
  dataToPublish.version = (dataToPublish.version || 1) + 1;
  dataToPublish.updatedAt = new Date().toISOString();

  // Önce mevcut canlı veriyi 20 sürümlük geçmişe kaydet
  const currentLive = getSiteData();
  saveHistorySnapshot(currentLive, `Sürüm v${currentLive.version || 1}`);

  // Yeni veriyi canlı ve taslak olarak kaydet
  saveSiteData(dataToPublish);
  saveDraftData(dataToPublish);

  return res.json({ success: true, message: 'Site başarıyla canlıya yayınlandı!', data: dataToPublish });
});

// Sürüm Geçmişi Listesi (Admin)
app.get('/api/data/history', requireAuth, (req: Request, res: Response) => {
  return res.json(getHistory());
});

// Eski Bir Sürüme Geri Dön (Admin)
app.post('/api/data/history/restore', requireAuth, (req: Request, res: Response) => {
  const { versionId } = req.body;
  const history = getHistory();
  const target = history.find((h) => h.id === versionId);

  if (!target) {
    return res.status(404).json({ error: 'Seçilen sürüm bulunamadı.' });
  }

  // Geri yüklenen veriyi taslak ve canlıya aktar
  target.data.updatedAt = new Date().toISOString();
  saveDraftData(target.data);
  saveSiteData(target.data);

  return res.json({ success: true, message: `${target.note} başarıyla geri yüklendi.`, data: target.data });
});

// ----------------------------------------------------
// 3. LİNKTEN ÖNİZLEME ÇEKME (LINK PREVIEW & SSRF KORUMASI)
// ----------------------------------------------------

const previewCache = new Map<string, any>();

function isPrivateIpOrHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim();
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '0.0.0.0' ||
    host === '::1' ||
    host.endsWith('.local') ||
    host.endsWith('.internal')
  ) {
    return true;
  }
  // 10.x.x.x, 192.168.x.x, 172.16-31.x.x, 169.254.x.x
  if (
    host.startsWith('10.') ||
    host.startsWith('192.168.') ||
    host.startsWith('169.254.')
  ) {
    return true;
  }
  const match172 = host.match(/^172\.(\d+)\./);
  if (match172 && parseInt(match172[1], 10) >= 16 && parseInt(match172[1], 10) <= 31) {
    return true;
  }
  return false;
}

app.get('/api/preview', async (req: Request, res: Response) => {
  const targetUrl = req.query.url as string;

  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).json({ error: 'Geçerli bir url parametresi gerekli.' });
  }

  try {
    const parsed = new URL(targetUrl.trim());

    // 1. Protokol Doğrulaması (Yalnızca http/https)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return res.status(400).json({ error: 'Yalnızca HTTP ve HTTPS linkleri desteklenir.' });
    }

    // 2. SSRF Koruması (İç ağ adreslerini engelle)
    if (isPrivateIpOrHost(parsed.hostname)) {
      return res.status(403).json({ error: 'İç ağ adreslerine erişim güvenlik nedeniyle engellendi.' });
    }

    // 3. Önbellek Kontrolü
    if (previewCache.has(targetUrl)) {
      return res.json(previewCache.get(targetUrl));
    }

    // 4. Doğrudan Medya Uzantısı Kontrolü
    const pathname = parsed.pathname.toLowerCase();
    if (pathname.match(/\.(jpeg|jpg|png|webp|gif|svg)$/)) {
      const result = {
        title: path.basename(parsed.pathname),
        description: 'Doğrudan görsel bağlantısı',
        image: targetUrl,
        video: '',
        type: 'image',
        url: targetUrl
      };
      previewCache.set(targetUrl, result);
      return res.json(result);
    }

    if (pathname.match(/\.(mp4|webm|mov)$/)) {
      const result = {
        title: path.basename(parsed.pathname),
        description: 'Doğrudan video bağlantısı',
        image: '',
        video: targetUrl,
        type: 'video',
        url: targetUrl
      };
      previewCache.set(targetUrl, result);
      return res.json(result);
    }

    // 5. YouTube Özel Ayrıştırıcı
    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
      let videoId = '';
      if (parsed.hostname.includes('youtu.be')) {
        videoId = parsed.pathname.slice(1);
      } else if (parsed.searchParams.has('v')) {
        videoId = parsed.searchParams.get('v') || '';
      } else if (parsed.pathname.includes('/shorts/')) {
        videoId = parsed.pathname.split('/shorts/')[1] || '';
      }

      if (videoId) {
        videoId = videoId.split('?')[0].split('&')[0];
        const result = {
          title: 'YouTube Videosu',
          description: `https://www.youtube.com/watch?v=${videoId}`,
          image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          video: `https://www.youtube.com/embed/${videoId}`,
          type: 'video',
          url: targetUrl
        };
        previewCache.set(targetUrl, result);
        return res.json(result);
      }
    }

    // 6. Sayfa HTML'ini Çek ve Open Graph / Twitter Card Çözümle
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 sn zaman aşımı

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IsmailSemihBot/1.0; +https://ismailsemih.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.json({
        title: '',
        description: '',
        image: '',
        video: '',
        type: 'web',
        url: targetUrl,
        warning: 'Hedef sayfaya erişilemedi, lütfen bilgileri manuel doldurun.'
      });
    }

    const html = await response.text();

    // Regex Tabanlı Meta Etiket Çözümleyici
    const getMeta = (propName: string): string => {
      const match =
        html.match(new RegExp(`<meta[^>]+property=["']${propName}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
        html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${propName}["']`, 'i')) ||
        html.match(new RegExp(`<meta[^>]+name=["']${propName}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
        html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${propName}["']`, 'i'));
      return match ? match[1] : '';
    };

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = getMeta('og:title') || getMeta('twitter:title') || (titleMatch ? titleMatch[1].trim() : '');
    const description = getMeta('og:description') || getMeta('twitter:description') || getMeta('description') || '';
    let image = getMeta('og:image') || getMeta('twitter:image') || '';
    const video = getMeta('og:video') || getMeta('og:video:url') || '';

    // Relative image link düzeltmesi
    if (image && !image.startsWith('http')) {
      image = new URL(image, targetUrl).toString();
    }

    const result = {
      title,
      description,
      image,
      video,
      type: video ? 'video' : 'web',
      url: targetUrl
    };

    previewCache.set(targetUrl, result);
    return res.json(result);
  } catch (err: any) {
    return res.json({
      title: '',
      description: '',
      image: '',
      video: '',
      type: 'web',
      url: targetUrl,
      warning: 'Önizleme verisi otomatik çekilemedi. Lütfen görsel ve başlığı manuel giriniz.'
    });
  }
});

// ----------------------------------------------------
// 4. BÜLTEN & İLETİŞİM FORMU ROTLARI
// ----------------------------------------------------

// Bültene Abone Ol (Ziyaretçi)
app.post('/api/newsletter/subscribe', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Geçerli bir e-posta adresi giriniz.' });
  }

  const added = addSubscriber(email);
  return res.json({
    success: true,
    message: added ? 'Bültenimize başarıyla kaydoldunuz!' : 'Bu e-posta adresi zaten bültenimize kayıtlı.'
  });
});

// Aboneleri Listele (Admin)
app.get('/api/newsletter/subscribers', requireAuth, (req: Request, res: Response) => {
  return res.json(getSubscribers());
});

// Aboneleri CSV Olarak İndir (Admin)
app.get('/api/newsletter/export-csv', requireAuth, (req: Request, res: Response) => {
  const subs = getSubscribers();
  let csv = 'ID,E-posta,Kayit Tarihi\n';
  subs.forEach((s) => {
    csv += `"${s.id}","${s.email}","${s.date}"\n`;
  });
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="bulten_aboneleri.csv"');
  return res.send('\uFEFF' + csv);
});

// Abone Sil (Admin)
app.delete('/api/newsletter/subscribers/:id', requireAuth, (req: Request, res: Response) => {
  deleteSubscriber(req.params.id);
  return res.json({ success: true });
});

// İletişim Mesajı Gönder (Ziyaretçi)
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Ad, e-posta ve mesaj alanları zorunludur.' });
  }

  const newMessage = addMessage({
    name: name.trim(),
    email: email.trim(),
    subject: (subject || 'İletişim Formu Mesajı').trim(),
    message: message.trim()
  });

  return res.json({ success: true, message: 'Mesajınız başarıyla iletildi.', data: newMessage });
});

// Mesajları Listele (Admin)
app.get('/api/contact/messages', requireAuth, (req: Request, res: Response) => {
  return res.json(getMessages());
});

// Mesajı Okundu Olarak İşaretle (Admin)
app.patch('/api/contact/messages/:id/read', requireAuth, (req: Request, res: Response) => {
  markMessageRead(req.params.id);
  return res.json({ success: true });
});

// Mesaj Sil (Admin)
app.delete('/api/contact/messages/:id', requireAuth, (req: Request, res: Response) => {
  deleteMessage(req.params.id);
  return res.json({ success: true });
});

// Mesajları CSV Olarak İndir (Admin)
app.get('/api/contact/messages/export-csv', requireAuth, (req: Request, res: Response) => {
  const msgs = getMessages();
  let csv = 'ID,Gonderen,E-posta,Konu,Mesaj,Tarih\n';
  msgs.forEach((m) => {
    csv += `"${m.id}","${m.name}","${m.email}","${m.subject}","${m.message.replace(/"/g, '""')}","${m.date}"\n`;
  });
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="iletisim_mesajlari.csv"');
  return res.send('\uFEFF' + csv);
});

// ----------------------------------------------------
// 5. YEDEKLEME (BACKUP & RESTORE)
// ----------------------------------------------------

app.get('/api/backup/export', requireAuth, (req: Request, res: Response) => {
  const siteData = getSiteData();
  const subscribers = getSubscribers();
  const messages = getMessages();
  const history = getHistory();

  const backupPackage = {
    exportedAt: new Date().toISOString(),
    system: 'İsmail Semih CMS Backup',
    siteData,
    subscribers,
    messages,
    history
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="ismail_semih_yedek.json"');
  return res.send(JSON.stringify(backupPackage, null, 2));
});

app.post('/api/backup/restore', requireAuth, (req: Request, res: Response) => {
  const { siteData } = req.body;
  if (!siteData) {
    return res.status(400).json({ error: 'Geçersiz yedek dosyası içeriği.' });
  }

  saveSiteData(siteData);
  saveDraftData(siteData);
  return res.json({ success: true, message: 'Yedek başarıyla geri yüklendi!' });
});

// ----------------------------------------------------
// 6. VITE ENTEGRASYONU (DEV: Middlewares, PROD: Static)
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> İsmail Semih Full-Stack Sunucusu aktif: http://0.0.0.0:${PORT}`);
  });
}

startServer();
