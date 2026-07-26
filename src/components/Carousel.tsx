"use client";

import { useState, useCallback } from "react";
import { useI18n } from "@/i18n/context";

interface CarouselProps {
  images: string[];
  placeholderColor?: string;
}

export default function Carousel({ images, placeholderColor = "#F5F5F5" }: CarouselProps) {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? (total > 0 ? total - 1 : 0) : prev - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setCurrent((prev) => (total > 0 ? (prev + 1) % total : 0));
  }, [total]);

  // No images - show placeholder
  if (total === 0) {
    return (
      <div
        className="relative w-[560px] h-[360px] rounded-lg overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: placeholderColor }}
      >
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm">{t("carousel.noImages")}</span>
        </div>
      </div>
    );
  }

  // Single image - no navigation needed
  if (total === 1) {
    return (
      <div className="relative w-[560px] h-[360px] rounded-lg overflow-hidden bg-[#F5F5F5]">
        <img src={images[0]} alt="" className="w-full h-full object-cover" />
      </div>
    );
  }

  // Multiple images - full carousel
  return (
    <div className="relative w-[560px] h-[360px] rounded-lg overflow-hidden">
      {/* Image track */}
      <div
        className="flex h-full carousel-track"
        style={{ transform: `translateX(-${current * 560}px)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="w-[560px] flex-shrink-0 bg-gray-100">
            <img src={img} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={goPrev}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Previous"
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1L2 7l6 6" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={goNext}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Next"
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 1l6 6-6 6" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/50 text-white text-xs font-mono">
        {current + 1} / {total}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-[#0A0A0A]" : "bg-[#D4D4D4]"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
