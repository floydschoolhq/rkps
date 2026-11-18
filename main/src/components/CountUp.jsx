import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

// Splits "15,000+", "85%", "8.5", "₹2L" into prefix / number / suffix.
const PARTS = /^([^\d]*)([\d,]*\.?\d+)(.*)$/;

/**
 * Counts a stat up from 0 when it scrolls into view, like countUp.js on the SAS stat panels.
 * Text that isn't a number is shown as-is. Change `key` to replay it.
 *
 * The span has no React children: GSAP writes its text directly, so React never
 * holds a stale text node.
 */
export default function CountUp({ value, duration = 2.4, className }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finalText = String(value);
    el.textContent = finalText;

    const match = finalText.match(PARTS);
    if (!match || prefersReducedMotion()) return;

    const [, prefix, raw, suffix] = match;
    const target = parseFloat(raw.replace(/,/g, ''));
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    const format = (n) =>
      prefix +
      n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: raw.includes(','),
      }) +
      suffix;

    const counter = { n: 0 };
    el.textContent = format(0);

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = format(counter.n);
        },
        onComplete: () => {
          el.textContent = finalText;
        },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    });

    return () => {
      ctx.revert();
      el.textContent = finalText;
    };
  }, [value, duration]);

  return <span ref={ref} className={className} aria-label={String(value)} />;
}
