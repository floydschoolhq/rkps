import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Tab row that becomes a single swipeable line below 1024px, like the SAS panel-4/panel-7
 * tab sliders. From `lg` up it lays out exactly as `className` says.
 *
 * - Arrows appear only on the side that has hidden tabs.
 * - The active tab scrolls into view inside the strip, never moving the page.
 *
 * @param {number} activeIndex  index of the selected tab button
 * @param {'light'|'dark'} tone colour of the edge fades and arrows
 * @param {string} fadeClass     Tailwind `from-*` class to match a custom background
 */
export default function TabStrip({
  children,
  activeIndex = 0,
  className = '',
  wrapperClassName = '',
  tone = 'light',
  fadeClass,
  style,
}) {
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

  // Keep the selected tab visible by scrolling only the strip (scrollIntoView could jump the page).
  // Skipped on first render so the strip starts at its natural position.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const el = trackRef.current;
    const tab = el?.children[activeIndex];
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return;
    const left = tab.offsetLeft - (el.clientWidth - tab.offsetWidth) / 2;
    el.scrollTo({ left, behavior: 'smooth' });
  }, [activeIndex]);

  const nudge = (dir) => trackRef.current?.scrollBy({ left: dir * 160, behavior: 'smooth' });

  const fade = fadeClass || (tone === 'dark' ? 'from-[#052051]' : 'from-[#f8f9fa]');
  const arrow = tone === 'dark' ? 'text-white' : 'text-[#0b2a63]';

  return (
    <div className={`relative ${wrapperClassName}`} style={style}>
      <div
        ref={trackRef}
        className={`tab-strip no-scrollbar max-lg:!flex-nowrap max-lg:overflow-x-auto max-lg:scroll-smooth ${className}`}
      >
        {children}
      </div>

      {!edges.start && (
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Scroll tabs left"
          className={`lg:hidden absolute left-0 top-0 bottom-0 w-10 flex items-center justify-start bg-gradient-to-r ${fade} to-transparent ${arrow} cursor-pointer`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {!edges.end && (
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Scroll tabs right"
          className={`lg:hidden absolute right-0 top-0 bottom-0 w-10 flex items-center justify-end bg-gradient-to-l ${fade} to-transparent ${arrow} cursor-pointer`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
