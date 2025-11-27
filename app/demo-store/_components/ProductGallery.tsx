"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineMagnifyingGlassPlus } from "react-icons/hi2";

interface ProductGalleryProps {
  title: string;
  images: string[];
}

export function ProductGallery({ title, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const safeImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"];

  useEffect(() => {
    setActiveIndex(0);
  }, [safeImages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((current) => (current === safeImages.length - 1 ? 0 : current + 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((current) => (current === 0 ? safeImages.length - 1 : current - 1));
    }
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? safeImages.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === safeImages.length - 1 ? 0 : current + 1));
  };

  return (
    <section aria-label="პროდუქტის ფოტოები" className="space-y-4">
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="group relative overflow-hidden rounded-2xl bg-cream-200 dark:bg-charcoal-800 outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 dark:focus-visible:ring-offset-charcoal-950"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={safeImages[activeIndex] ?? safeImages[0]}
                alt={title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className={`object-cover transition-transform duration-500 ${isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/20 via-transparent to-transparent pointer-events-none" />

          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream-50/90 dark:bg-charcoal-900/90 backdrop-blur-sm flex items-center justify-center text-charcoal-700 dark:text-cream-200 opacity-0 group-hover:opacity-100 hover:bg-cream-50 dark:hover:bg-charcoal-800 transition-all shadow-lg"
                aria-label="წინა სურათი"
              >
                <HiOutlineChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream-50/90 dark:bg-charcoal-900/90 backdrop-blur-sm flex items-center justify-center text-charcoal-700 dark:text-cream-200 opacity-0 group-hover:opacity-100 hover:bg-cream-50 dark:hover:bg-charcoal-800 transition-all shadow-lg"
                aria-label="შემდეგი სურათი"
              >
                <HiOutlineChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-cream-50/90 dark:bg-charcoal-900/90 backdrop-blur-sm flex items-center justify-center text-charcoal-600 dark:text-cream-300">
              <HiOutlineMagnifyingGlassPlus className="w-5 h-5" />
            </div>
          </div>

          {safeImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {safeImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "bg-cream-50 w-6"
                      : "bg-cream-50/50 hover:bg-cream-50/70"
                  }`}
                  aria-label={`სურათი ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-3">
          {safeImages.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative flex-1 overflow-hidden rounded-xl transition-all ${
                  isActive
                    ? "ring-2 ring-charcoal-900 dark:ring-cream-100 ring-offset-2 ring-offset-cream-50 dark:ring-offset-charcoal-950"
                    : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`სურათი ${index + 1}`}
                aria-pressed={isActive}
              >
                <div className="relative aspect-square overflow-hidden bg-cream-200 dark:bg-charcoal-800">
                  <Image
                    src={image}
                    alt={`${title} – ვარიანტი ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 10vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
