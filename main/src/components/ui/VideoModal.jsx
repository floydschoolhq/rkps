import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Popup video player, the counterpart of the SAS `.popup-video` dialog.
 * Plays with sound once opened (the click that opened it counts as the user gesture).
 * Escape, the close button, or a click on the backdrop closes it.
 *
 * @param {{ src: string, poster?: string, title: string } | null} video
 */
export default function VideoModal({ video, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!video) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-[min(420px,90vw)] animate-scaleUp">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-[#a22634] text-white flex items-center justify-center border border-white/30 transition-colors duration-300 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <video
          key={video.src}
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          className="w-full max-h-[80vh] aspect-[9/16] object-cover rounded-2xl bg-black shadow-2xl"
        />
        <p className="mt-3 text-center font-bebas text-xl tracking-wider uppercase text-white/90">{video.title}</p>
      </div>
    </div>
  );
}
