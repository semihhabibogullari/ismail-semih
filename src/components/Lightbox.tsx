import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  captions?: string[];
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  captions
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fotoğraf galerisi tam ekran görünümü"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
      onClick={onClose}
    >
      {/* Kapat Butonu */}
      <button
        onClick={onClose}
        aria-label="Kapat"
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-300 hover:text-[#c9a45c] hover:border-[#c9a45c] transition-colors cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Sol Ok */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Önceki Görsel"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-200 hover:text-[#c9a45c] hover:border-[#c9a45c] transition-all hover:scale-110 cursor-pointer"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Sağ Ok */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Sonraki Görsel"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-200 hover:text-[#c9a45c] hover:border-[#c9a45c] transition-all hover:scale-110 cursor-pointer"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Ana Görsel ve Açıklama */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Sahne fotoğrafı ${currentIndex + 1}`}
          loading="eager"
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-stone-800"
        />

        {/* Bilgi Çubuğu */}
        <div className="mt-4 flex flex-col items-center text-center max-w-xl">
          {captions && captions[currentIndex] && (
            <p className="text-stone-300 text-sm md:text-base font-light italic mb-1">
              {captions[currentIndex]}
            </p>
          )}
          <span className="text-xs uppercase tracking-widest text-[#c9a45c] font-medium">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
