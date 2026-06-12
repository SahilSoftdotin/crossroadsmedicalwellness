"use client";

import * as React from "react";

/**
 * Infinite, edge-masked auto-scrolling image strip.
 * Adapted from a 21st.dev component to fit this project's theme:
 * - no global body styles, no full-screen black wrapper
 * - scoped animation class names (ias-*)
 * - pauses on hover, and stops entirely for prefers-reduced-motion
 */

const u = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`;

const DEFAULT_IMAGES = [
  u("photo-1487412720507-e7ab37603c6f"), // active couple
  u("photo-1518611012118-696072aa579a"), // movement / running
  u("photo-1559757148-5c350d0d3c56"), // woman, energized
  u("photo-1538805060514-97d9cc17730c"), // man, smiling
  u("photo-1571019613454-1cb2f99b2d8b"), // strength training
  u("photo-1506126613408-eca07ce68773"), // calm / meditation
  u("photo-1490645935967-10de6ba17061"), // nutrition
  u("photo-1551632811-561732d1e306"), // hiking outdoors
  u("photo-1469474968028-56623f02e42e"), // mountain ridge
  u("photo-1517649763962-0c623066013b"), // cycling
  u("photo-1531123897727-8f129e1688ce"), // joy / laughter
  u("photo-1494390248081-4e521a5940db"), // fresh smoothie
  u("photo-1490818387583-1baba5e638af"), // walk in nature
  u("photo-1559757175-0eb30cd8c063"), // wellness lifestyle
];

export function ImageAutoSlider({
  images = DEFAULT_IMAGES,
  speedSeconds = 55,
}: {
  images?: string[];
  speedSeconds?: number;
}) {
  // Duplicate for a seamless -50% loop.
  const loop = [...images, ...images];

  return (
    <div className="ias-root w-full">
      <style>{`
        @keyframes ias-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ias-track {
          animation: ias-scroll ${speedSeconds}s linear infinite;
          will-change: transform;
        }
        .ias-root:hover .ias-track { animation-play-state: paused; }
        .ias-mask {
          -webkit-mask: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
          mask: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
        }
        .ias-item { transition: transform 0.4s ease, filter 0.4s ease; }
        .ias-item:hover { transform: scale(1.04); filter: brightness(1.06); }
        @media (prefers-reduced-motion: reduce) {
          .ias-track { animation: none; }
        }
      `}</style>

      <div className="ias-mask w-full overflow-hidden">
        <div className="ias-track flex w-max gap-5">
          {loop.map((src, index) => (
            <div
              key={index}
              className="ias-item h-64 w-52 shrink-0 overflow-hidden rounded-3xl shadow-card ring-1 ring-border sm:h-80 sm:w-64 lg:h-96 lg:w-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
