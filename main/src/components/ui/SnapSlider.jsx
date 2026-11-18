import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Lightweight replacement for the Slick carousels on SAS (facts slider, panel-7 slider).
 * Native CSS scroll-snap does the swiping; the arrows step one card at a time,
 * disable themselves at either end, and disappear when every card already fits.
 *
 * @param {string} itemClassName  width of each slide, e.g. "basis-[85%] sm:basis-1/2 lg:basis-1/3"
 * @param {'light'|'dark'} tone   arrow colours for light or dark section backgrounds
 */
export default function SnapSlider({ children, label, itemClassName = 'basis-[85%] sm:basis-1/2 lg:basis-1/3', tone = 'dark', className = '' }) {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [measure]);

  const step = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const width = card ? card.getBoundingClientRect().width + gap : el.clientWidth;
    el.scrollBy({ left: dir * width, behavior: 'smooth' });
  };

  const fits = edges.start && edges.end;
  const arrow =
    tone === 'dark'
      ? 'bg-white/10 hover:bg-[#a22634] text-white border-white/25 hover:border-[#a22634]'
      : 'bg-white hover:bg-[#a22634] text-[#0b2a63] hover:text-white border-slate-200 hover:border-[#a22634]';

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        className="no-scrollbar flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
      >
        {React.Children.map(children, (child, i) => (
          <div className={`${itemClassName} shrink-0 grow-0 snap-start`} aria-roledescription="slide" aria-label={`${i + 1}`}>
            {child}
          </div>
        ))}
      </div>

      {!fits && (
        <div className="mt-6 flex justify-end gap-2">
          {[
            [-1, edges.start, ChevronLeft, 'Previous'],
            [1, edges.end, ChevronRight, 'Next'],
          ].map(([dir, disabled, Icon, name]) => (
            <button
              key={name}
              type="button"
              onClick={() => step(dir)}
              disabled={disabled}
              aria-label={name}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-default disabled:pointer-events-none ${arrow}`}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
