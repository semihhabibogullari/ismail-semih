import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext.tsx';

let globalInitialAnimationPlayed = false;

interface SignatureProps {
  size?: 'header' | 'footer' | 'huge' | 'custom';
  className?: string;
  showUnderline?: boolean;
  opacity?: string;
}

export default function Signature({
  size = 'header',
  className = '',
  showUnderline = true,
  opacity
}: SignatureProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Site ayarlarından logo modunu ve tercihlerini al
  let logoSettings = {
    mode: 'signature',
    signatureText: 'İsmail Semih',
    signatureFont: 'Great Vibes',
    signatureTilt: -3,
    signatureColor: '#ffffff',
    imageUrl: '',
    imageWidth: 160
  };

  try {
    const site = useSite();
    if (site?.data?.logoSettings) {
      logoSettings = site.data.logoSettings;
    }
  } catch {
    // Context dışı kullanım desteği
  }

  useEffect(() => {
    if (!globalInitialAnimationPlayed && typeof window !== 'undefined') {
      const hasStored = sessionStorage.getItem('ismail_signature_animated');
      if (!hasStored) {
        setShouldAnimate(true);
        sessionStorage.setItem('ismail_signature_animated', 'true');
      }
      globalInitialAnimationPlayed = true;
    }
  }, []);

  // Eğer admin panelinden özel görsel (PNG/SVG) seçilmişse görseli göster
  if (logoSettings.mode === 'image' && logoSettings.imageUrl) {
    let imgWidthClass = 'w-32 sm:w-40';
    if (size === 'footer') imgWidthClass = 'w-44 sm:w-52';
    if (size === 'huge') imgWidthClass = 'w-64 sm:w-80';

    return (
      <div
        className={`inline-block select-none ${className}`}
        style={{ opacity: opacity || (size === 'footer' ? '0.85' : '1') }}
      >
        <img
          src={logoSettings.imageUrl}
          alt={logoSettings.signatureText || "İsmail Semih Logosu"}
          className={`h-auto object-contain ${imgWidthClass}`}
        />
      </div>
    );
  }

  // Boyut ayarları
  let textSizeClass = 'text-[28px] sm:text-[36px] md:text-[40px] leading-tight';
  let underlineSvgWidth = 'w-[150px] sm:w-[190px] md:w-[210px]';
  let underlineSvgHeight = 'h-[12px] sm:h-[15px]';

  if (size === 'footer') {
    textSizeClass = 'text-[44px] sm:text-[56px] leading-none';
    underlineSvgWidth = 'w-[200px] sm:w-[250px]';
    underlineSvgHeight = 'h-[18px]';
  } else if (size === 'huge') {
    textSizeClass = 'text-[64px] sm:text-[84px] md:text-[96px] leading-none';
    underlineSvgWidth = 'w-[260px] sm:w-[340px] md:w-[400px]';
    underlineSvgHeight = 'h-[24px] sm:h-[28px]';
  }

  const tiltStyle = {
    transform: `rotate(${logoSettings.signatureTilt ?? -3}deg)`,
    fontFamily: `"${logoSettings.signatureFont || 'Great Vibes'}", cursive`,
    color: logoSettings.signatureColor || '#ffffff',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex flex-col items-start select-none group cursor-pointer ${className}`}
      style={{ opacity: opacity || (size === 'footer' ? '0.80' : '1') }}
      aria-label="İsmail Semih İmza Logosu"
    >
      {/* İmza Metni (Asla TÜMÜ BÜYÜK DEĞİL, "İsmail Semih" olarak yazılır) */}
      <div
        className={`font-normal tracking-wide origin-bottom-left transition-transform duration-300 group-hover:scale-[1.02] ${textSizeClass} ${
          shouldAnimate ? 'animate-signature-write' : ''
        }`}
        style={tiltStyle}
      >
        {logoSettings.signatureText || 'İsmail Semih'}
      </div>

      {/* Vurgu Renginde İnce Kavisli İmza Çizgisi (SVG Path) */}
      {showUnderline && (
        <div className={`-mt-1 sm:-mt-2 ${underlineSvgWidth} ${underlineSvgHeight} overflow-visible`}>
          <svg
            viewBox="0 0 240 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
          >
            <path
              d="M 4 10 Q 55 16 115 11 T 180 13 Q 215 15 236 8"
              stroke="var(--accent, #ff5a1f)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={`signature-line ${
                shouldAnimate ? 'signature-line-initial' : ''
              } ${isHovered ? 'signature-line-hover' : ''}`}
            />
            <circle cx="238" cy="8" r="2.2" fill="var(--accent, #ff5a1f)" opacity="0.9" />
          </svg>
        </div>
      )}
    </div>
  );
}
