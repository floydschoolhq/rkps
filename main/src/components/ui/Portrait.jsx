import React from 'react';
import logoImg from '@assets/logo.jpg';

/**
 * Person photo with an honest fallback: when no real photo is supplied, shows the
 * school crest and the person's initials instead of a stock or AI-generated face.
 */
export default function Portrait({ src, name = '', className = '', imgClassName = '' }) {
  if (src) {
    return <img src={src} alt={name} className={imgClassName} />;
  }

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <div
      role="img"
      aria-label={name}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b2a63] via-[#071f4c] to-[#052051] ${className}`}
    >
      <img
        src={logoImg}
        alt=""
        aria-hidden="true"
        className="absolute w-[140%] max-w-none aspect-square rounded-full object-cover opacity-[0.07]"
      />
      <span className="relative font-bebas text-7xl sm:text-8xl tracking-wider text-[#faba28]/90">{initials}</span>
    </div>
  );
}
