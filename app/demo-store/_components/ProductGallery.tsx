"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductGalleryProps {
  title: string;
  images: string[];
}

export function ProductGallery({
  title,
  images,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const safeImages = images.length > 0 ? images : ["/images/furniture-1.svg"];

  useEffect(() => {
    setActiveIndex(0);
  }, [safeImages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((current) =>
        current === safeImages.length - 1 ? 0 : current + 1,
      );
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((current) =>
        current === 0 ? safeImages.length - 1 : current - 1,
      );
    }
  };

  return (
    <section
      aria-label="პროდუქტის ფოტოები"
      className="space-y-3"
    >
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-primary-600/10 via-accent-400/10 to-slate-900/20 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={safeImages[activeIndex]}
            alt={title}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition duration-500"
          />
        </div>
      </div>

      {safeImages.length > 1 ? (
        <div className="flex gap-3">
          {safeImages.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative flex-1 overflow-hidden rounded-xl border transition ${
                  isActive
                    ? "border-primary-500 ring-1 ring-primary-500/60"
                    : "border-slate-100 hover:border-primary-300 dark:border-slate-800 dark:hover:border-primary-400"
                }`}
                aria-label={`სურათი ${index + 1}`}
                aria-pressed={isActive}
              >
                <div className="relative aspect-video">
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
      ) : null}
    </section>
  );
}


