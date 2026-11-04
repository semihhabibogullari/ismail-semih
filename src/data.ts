/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * İSMAİL SEMİH - Kişisel Marka / İçerik Üreticisi
 * Tüm site verileri bu dosyada tutulmaktadır.
 * Podcast'ler, Yapay Zekâ içerikleri, Etkinlikler, Eğitimler, Basın ve Profil bilgileri.
 */

export interface HeroSlide {
  id: string;
  slideNumber: string; // örn: "01 / 05"
  category: string;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  image: string;
}

export interface FeaturedItem {
  id: string;
  title: string;
  category: 'Podcast' | 'Etkinlik' | 'Eğitim' | 'Yapay Zekâ';
  dateFormatted: string; // "6 Kasım 2026, 20:30"
  dateIso: string;
  actionLabel: 'Dinle' | 'Kayıt Ol' | 'İncele' | 'Oku';
  link: string;
  highlightText?: string;
  previewImage?: string;
  previewVideo?: string;
  shortDescription?: string;
}

export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  dateFormatted: string;
  dateIso: string;
  cover: string;
  description: string;
  guest?: string;
  spotifyUrl: string;
  appleUrl: string;
  youtubeUrl: string;
  shownotes: string[];
}

export interface AIArticle {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  dateFormatted: string;
  dateIso: string;
  category: string;
  tags: string[];
  cover: string;
  content: string[];
  keyTakeaways: string[];
}

export interface SiteEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  time: string;
  dateFormatted: string;
  venue: string;
  category: 'Canlı Yayın' | 'Atölye' | 'Söyleşi' | 'Konferans';
  price: string;
  status: 'available' | 'sold_out' | 'few_left';
  ticketUrl: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  level: 'Başlangıç' | 'Orta' | 'İleri Seviye';
  startDate: string;
  price: string;
  quota: string;
  cover: string;
  description: string;
  syllabus: string[];
  features: string[];
}

export interface PressItem {
  id: string;
  title: string;
  outlet: string;
  date: string;
  excerpt: string;
  url: string;
  image: string;
}

export interface DesignTokens {
  accentColor: string;
  bgColor: string;
  cardBgColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: string;
  shadowIntensity: string;
}

export interface LogoSettings {
  mode: 'signature' | 'image';
  signatureText: string;
  signatureFont: string;
  signatureTilt: number;
  signatureColor: string;
  imageUrl: string;
  imageWidth: number;
  faviconUrl: string;
}

export interface FeaturedPanelSettings {
  enabled: boolean;
  widthRatio: number; // 30 - 50 (%)
  listShiftAmount: number; // 8 - 32 (px)
  autoplayVideo: boolean;
  defaultItemId?: string; // 'first' or item.id
  size?: 'sm' | 'md' | 'lg';
  showOnMobileTap?: boolean;
}

export type HoverPopupSettings = FeaturedPanelSettings;

export interface SectionConfig {
  id: string;
  type: 'hero' | 'featured' | 'podcast' | 'ai' | 'events' | 'courses' | 'press' | 'newsletter';
  name: string;
  visible: boolean;
  columns?: number;
  gap?: string;
  customTitle?: string;
  customSubtitle?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  visible: boolean;
}

export interface SiteDataState {
  version: number;
  updatedAt: string;
  designTokens: DesignTokens;
  logoSettings: LogoSettings;
  hoverPopupSettings: HoverPopupSettings;
  sections: SectionConfig[];
  menuItems: MenuItem[];
  general: any;
  heroSlides: HeroSlide[];
  featuredItems: FeaturedItem[];
  podcasts: PodcastEpisode[];
  aiArticles: AIArticle[];
  events: SiteEvent[];
  courses: Course[];
  pressArticles: PressItem[];
  timeline: any[];
  gallery: any[];
  [key: string]: any;
}

export const SITE_DATA = {
  general: {
    name: "İsmail Semih",
    title: "İçerik Üreticisi, Teknoloji Düşünürü & Eğitmen",
    bio: "Yapay zekâ, geleceğin meslekleri ve dijital dönüşüm odağında haftalık podcast'ler, derinlemesine analiz yazıları ve canlı atölyeler üretiyorum. 10 yılı aşkın süredir teknoloji ve insan hikayelerinin kesişim kümesinde içerik geliştiriyor, on binlerce zihne ilham vermeye devam ediyorum.",
    shortBio: "Teknoloji, yapay zekâ, podcast ve düşünce atölyeleriyle geleceği bugünden anlamak.",
    email: "iletisim@ismailsemih.com",
    contactNote: "İş birlikleri, konuşma davetleri ve basın talepleri için bize dilediğiniz zaman yazabilirsiniz.",
    socialLinks: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      spotify: "https://spotify.com"
    }
  },

  // 1. HERO SLIDER (5 Slayt, 1280x400 / 16:9 geniş banner, 01 / 05 sayacı)
  heroSlides: [
    {
      id: "slide-1",
      slideNumber: "01 / 05",
      category: "Yeni Podcast Bölümü",
      badge: "Bölüm #48 Yayında",
      title: "Yapay Zekâ Devrimi ve Zihinsel Egemenlik",
      description: "Yapay zekâ araçları yaratıcılığımızı elimizden mi alıyor, yoksa bizi düşünce mimarlarına mı dönüştürüyor? Son bölümde derin bir felsefi ve pratik sorgulama.",
      buttonText: "Bölümü Keşfet",
      link: "/podcast/48",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: "slide-2",
      slideNumber: "02 / 05",
      category: "Yapay Zekâ Dosyası",
      badge: "Kapsamlı Rehber",
      title: "Büyük Dil Modelleriyle Düşünmek: 2026 Vizyonu",
      description: "Prompt yazmanın ötesine geçerek yapay zekayı bir düşünce ortağı, stratejik analist ve öğrenme hızlandırıcısı olarak kullanmanın pratik metotları.",
      buttonText: "Yazıyı Keşfet",
      link: "/yapay-zeka/buyuk-dil-modelleriyle-dusunmek",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: "slide-3",
      slideNumber: "03 / 05",
      category: "Yaklaşan Canlı Etkinlik",
      badge: "Sınırlı Kontenjan",
      title: "Üretici Zekâ Çağında Yaratıcılık ve İçerik Tasarımı",
      description: "DasDas Sahne'de ve eş zamanlı canlı yayında: İçerik üreticileri, araştırmacılar ve girişimciler için yüz yüze masterclass ve interaktif soru-cevap seansı.",
      buttonText: "Etkinliği Keşfet",
      link: "/etkinlikler",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: "slide-4",
      slideNumber: "04 / 05",
      category: "Açılan Yeni Eğitim",
      badge: "Kayıtlar Başladı",
      title: "Pratik Yapay Zekâ & Prompt Mühendisliği Masterclass",
      description: "4 haftalık yoğun canlı atölye. İş akışlarını otomatize etmek, veri analizlerini hızlandırmak ve üretkenliğinizi 5 katına çıkarmak için sıfırdan ileri seviyeye.",
      buttonText: "Eğitimi Keşfet",
      link: "/egitimler/pratik-yapay-zeka-masterclass",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: "slide-5",
      slideNumber: "05 / 05",
      category: "Genel Tanıtım",
      badge: "İsmail Semih Ekosistemi",
      title: "Teknoloji, Fikir ve Geleceğin Kesişim Kümesi",
      description: "Haftalık bülten, podcast yayınları, yapay zekâ analizleri ve düşünce kulübüyle yarının dünyasına bugünden hazırlanıyoruz.",
      buttonText: "Hikayemi Keşfet",
      link: "/hakkimda",
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80"
    }
  ],

  // 2. ÖNE ÇIKANLAR (DasDas tarzı liste satırları & sol afiş paneli)
  featuredItems: [
    {
      id: "feat-1",
      title: "Bölüm #48: Yapay Zekâ Devrimi ve Zihinsel Egemenlik",
      category: "Podcast",
      dateFormatted: "6 Kasım 2026, 20:30",
      dateIso: "2026-11-06",
      actionLabel: "Dinle",
      link: "/podcast/48",
      highlightText: "En Çok Dinlenen",
      previewImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
      shortDescription: "Üretken yapay zekanın sadece bir araç değil, bilişsel süreçlerimizi ve zihinsel mimarimizi kökten değiştiren bir ayna olduğunu masaya yatırdığımız derinlemesine sohbet."
    },
    {
      id: "feat-2",
      title: "Canlı Masterclass: Üretici Zekâ ile Dijital İçerik Tasarımı",
      category: "Etkinlik",
      dateFormatted: "14 Kasım 2026, 19:30",
      dateIso: "2026-11-14",
      actionLabel: "Kayıt Ol",
      link: "/etkinlikler",
      highlightText: "Son 12 Bilet",
      previewImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      shortDescription: "DasDas Sahnesi'nde yüz yüze ve canlı yayınla: İçerik üreticileri ve araştırmacılar için üretim süreçlerini 10 kat hızlandıran atölye ve soru-cevap."
    },
    {
      id: "feat-3",
      title: "Pratik Yapay Zekâ & Prompt Mühendisliği (Güz Dönemi)",
      category: "Eğitim",
      dateFormatted: "21 Kasım 2026, 14:00",
      dateIso: "2026-11-21",
      actionLabel: "İncele",
      link: "/egitimler/pratik-yapay-zeka-masterclass",
      highlightText: "Erken Kayıt İndirimi",
      previewImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      shortDescription: "4 haftalık yoğun canlı program: LLM mimarisi, ajan bazlı otomasyonlar ve yaratıcı düşünce ortaklığı kurmanın pratik metodolojisi."
    },
    {
      id: "feat-4",
      title: "Büyük Dil Modelleriyle Düşünmek: 2026 Kılavuzu",
      category: "Yapay Zekâ",
      dateFormatted: "2 Kasım 2026, 11:00",
      dateIso: "2026-11-02",
      actionLabel: "Oku",
      link: "/yapay-zeka/buyuk-dil-modelleriyle-dusunmek",
      previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      shortDescription: "Prompt yazmanın ötesine geçerek yapay zekayı bir düşünce ortağı, stratejik analist ve öğrenme hızlandırıcısı olarak konumlandırma rehberi."
    },
    {
      id: "feat-5",
      title: "Bölüm #47: Dikkat Ekonomisinde Odaklanma Sanatı",
      category: "Podcast",
      dateFormatted: "29 Ekim 2026, 20:30",
      dateIso: "2026-10-29",
      actionLabel: "Dinle",
      link: "/podcast/47",
      previewImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
      shortDescription: "Sürekli bildirim bombardımanı altında derin çalışma (Deep Work) ve odaklanma disiplini inşa etmenin nörolojik ve pratik temelleri."
    },
    {
      id: "feat-6",
      title: "Geleceğin Meslekleri ve Sentetik Zihinler Panel & Söyleşi",
      category: "Etkinlik",
      dateFormatted: "28 Kasım 2026, 20:00",
      dateIso: "2026-11-28",
      actionLabel: "Kayıt Ol",
      link: "/etkinlikler",
      previewImage: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
      shortDescription: "Otomasyonun yükselişinde insan kalabilmek: Geleceğin çalışma dünyasında hangi beceriler vazgeçilmez kalacak?"
    }
  ] as FeaturedItem[],

  // 3. PODCAST BÖLÜMLERİ
  podcasts: [
    {
      id: "48",
      episodeNumber: 48,
      title: "Yapay Zekâ Devrimi ve Zihinsel Egemenlik",
      subtitle: "Yapay zekanın hızına yetişmeye çalışırken insani özümüzü nasıl koruruz?",
      duration: "48 Dk",
      dateFormatted: "6 Kasım 2026",
      dateIso: "2026-11-06",
      cover: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
      description: "Bu bölümde üretken yapay zekanın sadece bir araç değil, bilişsel süreçlerimizi kökten değiştiren bir ayna olduğunu konuşuyoruz. Bilgiye ulaşmanın sıfır maliyetli olduğu bir dünyada ayırt edici olan nedir?",
      guest: "Prof. Dr. Metehan Çelik (Bilişsel Bilimci)",
      spotifyUrl: "https://open.spotify.com",
      appleUrl: "https://podcasts.apple.com",
      youtubeUrl: "https://youtube.com",
      shownotes: [
        "00:00 - Giriş ve haftanın öne çıkan gelişmeleri",
        "08:15 - Ezberden anlamaya geçiş: Yeni çağın bilişsel kasları",
        "21:30 - Konuk Sohbeti: Yapay zekâ felsefesi ve etik sınırları",
        "36:45 - Günlük pratikler: Düşünce mimarisi oluşturmak",
        "44:20 - Dinleyici soruları ve kapanış tavsiyeleri"
      ]
    },
    {
      id: "47",
      episodeNumber: 47,
      title: "Dikkat Ekonomisinde Odaklanma Sanatı",
      subtitle: "Sürekli bildirim bombardımanı altında derin çalışma (Deep Work) nasıl mümkün?",
      duration: "42 Dk",
      dateFormatted: "29 Ekim 2026",
      dateIso: "2026-10-29",
      cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      description: "Zihnimizin algoritmalar tarafından ele geçirildiği çağda dikkati bir para birimi gibi yönetmek. Dijital detoks, zaman bloklama ve yaratıcı yalnızlık stratejileri.",
      spotifyUrl: "https://open.spotify.com",
      appleUrl: "https://podcasts.apple.com",
      youtubeUrl: "https://youtube.com",
      shownotes: [
        "00:00 - Neden hiçbir şeye 10 dakikadan fazla odaklanamıyoruz?",
        "12:40 - Dopamin döngüleri ve algoritmik tuzaklar",
        "26:10 - Günde 2 saat kesintisiz derin çalışma kuralı",
        "38:00 - Önerilen kitaplar ve haftalık meydan okuma"
      ]
    },
    {
      id: "46",
      episodeNumber: 46,
      title: "Kişisel Marka İnşaatı ve Değer Üretimi",
      subtitle: "Gürültülü dijital evrende kendi sesini ve topluluğunu inşa etmek.",
      duration: "54 Dk",
      dateFormatted: "22 Ekim 2026",
      dateIso: "2026-10-22",
      cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
      description: "Sosyal medyada fenomen olmak ile saygın bir fikir lideri olmak arasındaki derin fark. Özgün hikaye anlatıcılığı, niş uzmanlık ve organik güven inşa etmenin ilkeleri.",
      spotifyUrl: "https://open.spotify.com",
      appleUrl: "https://podcasts.apple.com",
      youtubeUrl: "https://youtube.com",
      shownotes: [
        "00:00 - İçi boş gösterişe karşı gerçek değer sunmak",
        "15:20 - İlk 1.000 sadık takipçi konsepti",
        "30:45 - İçerik matriksi oluşturma: Fikirleri ölçeklendirmek",
        "49:10 - Topluluk yönetimi ve sadakat yaratma"
      ]
    }
  ],

  // 4. YAPAY ZEKÂ İÇERİKLERİ & MAKALELER
  aiArticles: [
    {
      id: "buyuk-dil-modelleriyle-dusunmek",
      title: "Büyük Dil Modelleriyle Düşünmek: 2026 Rehberi",
      summary: "Yapay zekayı bir soru-cevap makinesi gibi değil, çok yönlü bir akıl hocası ve düşünce ortağı olarak kurgulamanın stratejik yaklaşımları.",
      readTime: "7 dk okuma",
      dateFormatted: "2 Kasım 2026",
      dateIso: "2026-11-02",
      category: "Rehber & Strateji",
      tags: ["LLM", "Prompt Engineering", "Bilişsel Tasarım", "Yapay Zekâ"],
      cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      keyTakeaways: [
        "Yapay zekaya sadece yanıt üretmesini değil, argümanlarınızdaki kör noktaları bulmasını söyleyin.",
        "Bağlam mühendisliği (Context Engineering), tekil prompt yazımından 10 kat daha etkilidir.",
        "Öğrenme sürecinde Sokratik diyalog metodunu simüle ettirin."
      ],
      content: [
        "Çoğu insan yapay zekayı Google aramasının daha akıllı bir versiyonu olarak kullanıyor. 'Bana şu konuyu özetle' veya 'Şu metni düzelt' demek, bir Formula 1 arabasını sadece market alışverişine götürmek gibidir.",
        "Asıl devrim, yapay zekayı bir *düşünce amplifikatörü* olarak konumlandırdığınızda başlar. Kendi hipotezlerinizi çürütmesi için ona karşıt roller vermek, karmaşık kararlarda birden fazla bakış açısını modelletmek ve yaratıcı tıkanıklıkları aşmak için zihinsel çatışmalar tasarlamak...",
        "Bu rehberde paylaştığım 5 katmanlı düşünce çerçevesiyle, günlük çalışma rutininizde harcadığınız 10 saati nasıl 2 saate indireceğinizi ve kalan zamanda derin fikirlere nasıl odaklanacağınızı adım adım inceleyeceğiz."
      ]
    },
    {
      id: "ajan-yapay-zeka-cagi",
      title: "Ajan Tabanlı Yapay Zekâ (Agentic AI) Neleri Değiştirecek?",
      summary: "Yalnızca metin üreten sistemlerden görevleri uçtan uca otonom olarak icra eden yapay zekâ ajanlarına geçişin anatomisi.",
      readTime: "9 dk okuma",
      dateFormatted: "25 Ekim 2026",
      dateIso: "2026-10-25",
      category: "Trend Analizi",
      tags: ["AI Agents", "Otomasyon", "Gelecek", "Yazılım"],
      cover: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      keyTakeaways: [
        "Ajanlar sadece cevap vermez; tarayıcı kullanır, kod yazar, çalıştırır ve test eder.",
        "Şirketlerin organizasyon şemaları insan-ajan hibrit ekiplerine dönüşüyor.",
        "Kritik beceri: Sistem tasarımı ve ajanların denetimi (Human-in-the-loop)."
      ],
      content: [
        "Yapay zekâ araçlarıyla konuşma çağından, yapay zekâ ajanlarına talimat verme ve onları koordine etme çağına resmen girdik.",
        "Bir ajan sistemine sadece 'Son 6 ayın finansal raporlarını analiz et, anomalileri bul, görselleştir ve ekibe bir brifing e-postası hazırla' diyorsunuz ve sistem araçları birbirine bağlayarak görevi tamamlıyor.",
        "Bu durum geleneksel iş bölümlerini tamamen dönüştürürken, insanın rolünü bir icracıdan ziyade bir 'orkestra şefi' konumuna taşıyor."
      ]
    },
    {
      id: "yaratici-uretimde-insan-dokunusu",
      title: "Yaratıcı Üretimde 'İnsan Dokunuşu' Artık Neden Daha Değerli?",
      summary: "Kusursuz makinelerin ürettiği içerik denizinde; kusurlar, kişisel tanıklıklar ve duygu yoğunluğunun yeniden yükselen değeri.",
      readTime: "5 dk okuma",
      dateFormatted: "18 Ekim 2026",
      dateIso: "2026-10-18",
      category: "Düşünce & Deneme",
      tags: ["Felsefe", "Yaratıcılık", "İçerik", "Kültür"],
      cover: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
      keyTakeaways: [
        "Sentez ucuzladı, samimiyet pahalandı.",
        "İnsanlar bilgiyi değil, bilgiyi süzen karakteri ve deneyimi takip eder.",
        "Geleceğin en kıymetli sanatı: Kişisel perspektif ve kürasyon."
      ],
      content: [
        "Herkesin tek bir tuşla kusursuz grafikler, metinler ve besteler üretebildiği bir dünyada, kusursuzluk artık bir ayrıcalık olmaktan çıktı.",
        "Bizi bir esere veya kişiye bağlayan şey onun pürüzsüzlüğü değil; ardındaki yaşanmışlık, tereddüt, cesaret ve samimi kusurlardır.",
        "İçerik üreticileri için en büyük yanılgı makine gibi yazmaya çalışmaktır. Oysa makinenin asla yapamayacağı tek şey, sizin hayatınızı yaşamış olmaktır."
      ]
    }
  ],

  // 5. ETKİNLİK TAKVİMİ VERİLERİ (ModaSahnesi tarzı haftalık gün seçimi)
  events: [
    {
      id: "ev-1",
      title: "Bölüm #48 Canlı Dinleme & Dinleyici Sohbeti",
      date: "2026-11-06",
      dayOfWeek: "Cuma",
      time: "20:30",
      dateFormatted: "6 Kasım 2026, Cuma",
      venue: "YouTube & Discord Canlı Sahne",
      category: "Canlı Yayın",
      price: "Ücretsiz (Kayıtlı)",
      status: "available",
      ticketUrl: "https://youtube.com",
      description: "Yeni bölümün yayınlanışını birlikte kutluyor, arkasındaki araştırma notlarını ve soru-cevapları canlı olarak tartışıyoruz."
    },
    {
      id: "ev-2",
      title: "Üretici Zekâ Çağında Yaratıcılık ve İçerik Tasarımı",
      date: "2026-11-14",
      dayOfWeek: "Cumartesi",
      time: "19:30",
      dateFormatted: "14 Kasım 2026, Cumartesi",
      venue: "DasDas Sahne - Ataşehir, İstanbul",
      category: "Söyleşi",
      price: "350 ₺",
      status: "few_left",
      ticketUrl: "https://biletix.com",
      description: "İsmail Semih'in sahne sunumu, sürpriz konuklar ve interaktif yapay zekâ gösterimi eşliğinde 2 saatlik ilham verici gece."
    },
    {
      id: "ev-3",
      title: "Pratik Prompt Mühendisliği Canlı Uygulama Atölyesi",
      date: "2026-11-18",
      dayOfWeek: "Çarşamba",
      time: "20:00",
      dateFormatted: "18 Kasım 2026, Çarşamba",
      venue: "Zoom İnteraktif Atölye",
      category: "Atölye",
      price: "450 ₺",
      status: "available",
      ticketUrl: "https://biletix.com",
      description: "Katılımcıların kendi projeleri üzerinden birebir prompt optimizasyonu ve iş akışı tasarımı laboratuvarı."
    },
    {
      id: "ev-4",
      title: "Geleceğin Zihinleri: Teknoloji & İnsan Zirvesi Konuşması",
      date: "2026-11-21",
      dayOfWeek: "Cumartesi",
      time: "14:30",
      dateFormatted: "21 Kasım 2026, Cumartesi",
      venue: "Zorlu PSM Turkcell Sahnesi",
      category: "Konferans",
      price: "600 ₺",
      status: "sold_out",
      ticketUrl: "https://biletix.com",
      description: "Ana sahnede 'Algoritmalar Arasında Özgür İrade' başlıklı 40 dakikalık açılış konuşması."
    },
    {
      id: "ev-5",
      title: "Aylık Kitap & Makale Kulübü Tartışması: 'Superintelligence'",
      date: "2026-11-27",
      dayOfWeek: "Cuma",
      time: "21:00",
      dateFormatted: "27 Kasım 2026, Cuma",
      venue: "Topluluk Özel Discord Kanalı",
      category: "Canlı Yayın",
      price: "Topluluk Üyelerine Açık",
      status: "available",
      ticketUrl: "https://discord.com",
      description: "Nick Bostrom'un başyapıtı ışığında yapay genel zekâ (AGI) senaryolarını hep birlikte masaya yatırıyoruz."
    }
  ] as SiteEvent[],

  // 6. EĞİTİMLER (Yatay kaydırılabilir kart şeridi)
  courses: [
    {
      id: "pratik-yapay-zeka-masterclass",
      title: "Pratik Yapay Zekâ & Prompt Mühendisliği Masterclass",
      subtitle: "İşinizi ve üretkenliğinizi 5 katına çıkaran 4 haftalık yoğun canlı program",
      duration: "4 Hafta (Haftada 3 Saat Canlı)",
      level: "Orta",
      startDate: "21 Kasım 2026",
      price: "3.450 ₺",
      quota: "25 Kişi (Sınırlı Kontenjan)",
      cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      description: "ChatGPT, Claude, Midjourney ve açık kaynak modellerle teoriyi bir kenara bırakıp tamamen gerçek hayat iş akışlarını inşa ettiğimiz uygulamalı program.",
      syllabus: [
        "1. Hafta: LLM Mantığı, Token Mimarisi ve İleri Seviye Prompt Şablonları",
        "2. Hafta: Bağlam Yönetimi, Few-Shot Örnekleme ve Mantıksal Çıkarım",
        "3. Hafta: Otomasyon Araçları ile AI Ajanlarını Birbirine Bağlamak",
        "4. Hafta: Bitirme Projesi: Kendi Kişisel Yapay Zekâ Asistanınızı Kodsuz İnşa Edin"
      ],
      features: [
        "Haftalık canlı interaktif oturumlar & kayıt erişimi",
        "Hazır 100+ prompt kütüphanesi & şablon paketi",
        "Özel Discord çalışma grubu ve birebir mentorluk",
        "Resmi bitirme sertifikası"
      ]
    },
    {
      id: "icerik-ureticiligi-ve-hikaye-anlaticiligi",
      title: "Sıfırdan Zirveye Podcast & Dijital Hikaye Anlatıcılığı",
      subtitle: "Kendi sesini bulmak, prodüksiyon kalitesini yükseltmek ve kitle büyütmek",
      duration: "3 Hafta (6 Canlı Oturum)",
      level: "Başlangıç",
      startDate: "05 Aralık 2026",
      price: "2.850 ₺",
      quota: "30 Kişi",
      cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
      description: "Ekipman seçiminden ses kurgusuna, konuk davet stratejisinden Spotify & Apple Podcasts algoritmalarına kadar profesyonel bir podcast kanalı kurmanın A'dan Z'ye rehberi.",
      syllabus: [
        "1. Hafta: Konsept Belirleme, Hedef Kitle ve Bölüm Formatı Mimarisi",
        "2. Hafta: Mikrofon, Ses Kartı, Akustik ve Reaper/Audacity ile Hızlı Kurgu",
        "3. Hafta: Dağıtım, Kapak Tasarımı, Sosyal Medya Kesitleri ve Sponsorluklar"
      ],
      features: [
        "Kurgu şablonları & ses efekt paketi",
        "Kapak tasarımı Figma şablonları",
        "Konuk davet e-posta şablonları",
        "İsmail Semih ile birebir kanal inceleme seansı"
      ]
    },
    {
      id: "dijital-uretkenlik-ve-not-alma",
      title: "İkinci Beyin: Dijital Not Alma & Zihinsel Düzen Atölyesi",
      subtitle: "Okuduklarınızı, dinlediklerinizi ve fikirlerinizi unutulmaz bir bilgi ağına dönüştürün",
      duration: "2 Hafta (Hafta Sonu Kampı)",
      level: "Başlangıç",
      startDate: "19 Aralık 2026",
      price: "1.950 ₺",
      quota: "40 Kişi",
      cover: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
      description: "Notion ve Obsidian kullanarak hayatınızı, projelerinizi ve öğrenme hedeflerinizi organize eden, bilişsel yükünüzü sıfırlayan pratik sistem kurulumu.",
      syllabus: [
        "1. Gün: CODE Metodolojisi (Capture, Organize, Distill, Express)",
        "2. Gün: Notion & Obsidian ile Kişisel Bilgi Yönetimi (PKM) Mimarisi",
        "3. Gün: Günlük Görevler, Projeler ve Uzun Vadeli Hedefleri Eşleme"
      ],
      features: [
        "Önceden yapılandırılmış komple Notion & Obsidian şablonları",
        "Ömür boyu kaynak erişimi ve topluluk desteği"
      ]
    }
  ] as Course[],

  // 7. BASINDA İSMAİL SEMİH (Haberler & Röportajlar)
  pressArticles: [
    {
      id: "pr-1",
      title: "İsmail Semih: ‘Yapay Zekâ İnsanı Tembelleştirmez, Sıradanlığı Cezalandırır’",
      outlet: "Cumhuriyet Gazetesi",
      date: "28 Ekim 2026",
      excerpt: "Popüler içerik üreticisi ve podcast yayıncısı İsmail Semih ile yeni nesil öğrenme modelleri ve dijital çağda insanın yerini konuştuk.",
      url: "https://cumhuriyet.com.tr",
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "pr-2",
      title: "Haftanın En Çok Dinlenen Teknoloji Yayını: İsmail Semih Podcast",
      outlet: "Hürriyet Teknoloji",
      date: "15 Ekim 2026",
      excerpt: "Spotify Türkiye listelerinde haftalardır zirveden inmeyen yayın, derinlikli analizleri ve akıcı anlatımıyla dikkat çekiyor.",
      url: "https://hurriyet.com.tr",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "pr-3",
      title: "Geleceğin Meslekleri ve Sentetik Akıllar: İsmail Semih ile Özel Röportaj",
      outlet: "T24 Kültür Sanat",
      date: "04 Eylül 2026",
      excerpt: "‘Gelecek korkulacak bir tehdit değil; doğru soruları sormayı bilenler için tarihin en büyük yaratıcı oyun alanıdır.’",
      url: "https://t24.com.tr",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "pr-4",
      title: "DasDas Sahne'de İlham Dolu Bir Akşam: Üretici Zekâ Çağında Yaratıcılık",
      outlet: "Gazete Duvar",
      date: "21 Ağustos 2026",
      excerpt: "Salonu dolduran yüzlerce teknoloji ve sanat meraklısı, İsmail Semih'in sahne sunumu ve canlı demolarıyla büyülendi.",
      url: "https://gazeteduvar.com.tr",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
    }
  ] as PressItem[],

  // 8. HAKKIMDA ZAMAN ÇİZELGESİ & FOTOĞRAFLAR
  timeline: [
    {
      year: "2016",
      title: "İlk Dijital Yazılar & Teknoloji Blogu",
      desc: "Üniversite yıllarında yapay zekâ, insan-bilgisayar etkileşimi ve dijital felsefe üzerine ilk makalelerini yayınlamaya başladı."
    },
    {
      year: "2019",
      title: "Podcast Kanalının Doğuşu",
      desc: "Mikrofonun başına geçerek haftalık teknoloji ve düşünce sohbetlerini başlattı. İlk yıl içinde 100.000 dinlenmeye ulaştı."
    },
    {
      year: "2022",
      title: "Canlı Sahne & Atölye Serisi",
      desc: "DasDas, Zorlu PSM ve çeşitli üniversitelerde yüz yüze etkinlikler, hackathon mentörlükleri ve masterclass programları gerçekleştirdi."
    },
    {
      year: "2024",
      title: "1 Milyon Dinlenme & 'İkinci Beyin' Topluluğu",
      desc: "Podcast kanalı toplamda 1.5 milyon dinlenmeyi aştı. Discord üzerinde binlerce öğrenci ve uzmanın yer aldığı aktif bir düşünce kulübü kuruldu."
    },
    {
      year: "2026",
      title: "Yapay Zekâ Laboratuvarı & Yeni Dönem",
      desc: "Haftalık bülten, ileri seviye atölyeler ve yapay zekâ içerikleriyle Türkiye'nin en nitelikli teknoloji topluluklarından birine liderlik ediyor."
    }
  ],

  gallery: [
    {
      id: "gal-1",
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
      caption: "DasDas Sahnesi'nde açılış konuşması yaparken."
    },
    {
      id: "gal-2",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
      caption: "Stüdyoda mikrofon başında haftalık podcast kaydı."
    },
    {
      id: "gal-3",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      caption: "Yapay zekâ ve gelecek atölyesinde katılımcılarla interaktif çalışma."
    },
    {
      id: "gal-4",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      caption: "Masterclass oturumunun ardından çalışma grubuyla hatıra karesi."
    },
    {
      id: "gal-5",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      caption: "Yazı masasında yeni yapay zekâ bülteni araştırma notları."
    },
    {
      id: "gal-6",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
      caption: "Kamera önünde haftalık YouTube video çekimi hazırlıkları."
    }
  ]
};
