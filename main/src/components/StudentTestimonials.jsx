import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { STUDENT_TESTIMONIALS, SCHOOL_INFO } from '../data/rkpsData';
import { prefersReducedMotion } from '../lib/gsap';

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

/**
 * One 9:16 reel. The active card plays (muted by default) with its own controls;
 * side cards show the poster and become active when tapped.
 */
function VideoCard({ item, active, playing, muted, time, shouldPlay, videoRef, onTogglePlay, onToggleMute, onEnded, onSelect }) {
  const localRef = useRef(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (localRef.current) localRef.current.muted = muted;
  }, [muted]);

  // Start the active reel from the top whenever it becomes active and is on screen; stop the others.
  useEffect(() => {
    const vid = localRef.current;
    if (!vid) return;
    if (active && shouldPlay) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
      if (!active) vid.currentTime = 0;
    }
  }, [active, shouldPlay, item.video]);

  const goFullscreen = (e) => {
    e.stopPropagation();
    const vid = localRef.current;
    if (!vid) return;
    if (vid.requestFullscreen) vid.requestFullscreen();
    else if (vid.webkitEnterFullscreen) vid.webkitEnterFullscreen(); // iPhone Safari
  };

  return (
    <div
      role={active ? undefined : 'button'}
      tabIndex={active ? undefined : 0}
      aria-label={active ? undefined : `Play ${item.name}'s story`}
      onClick={active ? onTogglePlay : onSelect}
      onKeyDown={(e) => {
        if (!active && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect();
        }
      }}
      className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black/40 border-4 border-white/10 shadow-2xl cursor-pointer select-none"
    >
      {active && (
        <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-20">
          <div
            className="h-full bg-[#faba28] transition-[width] duration-150"
            style={{ width: duration > 0 ? `${(time / duration) * 100}%` : '0%' }}
          />
        </div>
      )}

      <video
        ref={(el) => {
          localRef.current = el;
          videoRef?.(el);
        }}
        src={item.video}
        poster={item.poster}
        muted={muted}
        playsInline
        // Side cards only need their poster; don't pull the video over mobile data.
        preload={active ? 'metadata' : 'none'}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={active ? onEnded : undefined}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {!active && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
          <span className="w-14 h-14 rounded-full bg-[#a22634]/90 text-white flex items-center justify-center ring-8 ring-white/15">
            <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" />
          </span>
        </div>
      )}

      {active && (
        <div className="absolute bottom-[76px] inset-x-3 flex items-center justify-between text-white z-20">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay();
              }}
              aria-label={playing ? 'Pause video' : 'Play video'}
              className="w-11 h-11 rounded-full flex items-center justify-center hover:text-[#faba28] cursor-pointer"
            >
              {playing ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5" fill="currentColor" />}
            </button>
            <span className="font-mono text-[11px] text-white/75 tabular-nums">
              {fmt(time)}
              {duration > 0 && ` / ${fmt(duration)}`}
            </span>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMute();
              }}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
              className="w-11 h-11 rounded-full flex items-center justify-center hover:text-[#faba28] cursor-pointer"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#faba28]" />}
            </button>
            <button
              type="button"
              onClick={goFullscreen}
              aria-label="Full screen"
              className="w-11 h-11 rounded-full flex items-center justify-center hover:text-[#faba28] cursor-pointer"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 inset-x-4 z-20 pointer-events-none text-left">
        <h4 className="font-bebas text-xl sm:text-2xl tracking-wider uppercase text-white leading-none">{item.name}</h4>
        <p className="mt-1 text-xs font-semibold text-[#faba28]">{item.grade}</p>
        <p className="text-[11px] text-white/50 truncate">{SCHOOL_INFO.name}</p>
      </div>
    </div>
  );
}

/**
 * "What's your story?" student video carousel: the centre reel plays, the neighbours peek in
 * on md+ and are tappable. Swipe on touch screens, arrows everywhere. Plays only while on screen.
 */
export default function StudentTestimonials({ className = '' }) {
  const items = STUDENT_TESTIMONIALS;
  const len = items.length;
  const [activeIndex, setActiveIndex] = useState(Math.min(1, len - 1));
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [inView, setInView] = useState(false);

  const rootRef = useRef(null);
  const activeVideo = useRef(null);
  const touch = useRef(null);
  const swiped = useRef(false);

  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % len), [len]);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + len) % len), [len]);

  // Only autoplay while the carousel is actually visible (saves data and battery on phones).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Track play state and progress of whichever reel is active.
  useEffect(() => {
    const vid = activeVideo.current;
    setTime(0);
    if (!vid) return;
    const onTime = () => setTime(vid.currentTime);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    vid.addEventListener('timeupdate', onTime);
    vid.addEventListener('play', onPlay);
    vid.addEventListener('pause', onPause);
    setPlaying(!vid.paused);
    return () => {
      vid.removeEventListener('timeupdate', onTime);
      vid.removeEventListener('play', onPlay);
      vid.removeEventListener('pause', onPause);
    };
  }, [activeIndex]);

  if (!len) return null;

  const togglePlay = () => {
    const vid = activeVideo.current;
    if (!vid) return;
    if (vid.paused) vid.play().catch(() => {});
    else vid.pause();
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
    swiped.current = false;
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true;
      (dx < 0 ? goNext : goPrev)();
    }
  };
  // The tap the browser fires after a swipe must not also pause/select a card.
  const onClickCapture = (e) => {
    if (swiped.current) {
      swiped.current = false;
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const active = items[activeIndex];
  const prevIndex = (activeIndex - 1 + len) % len;
  const nextIndex = (activeIndex + 1) % len;
  const autoplay = inView && !prefersReducedMotion();

  const shared = { muted, time: 0, playing: false, shouldPlay: false, onToggleMute: () => setMuted((m) => !m) };

  return (
    <div ref={rootRef} className={className} role="region" aria-roledescription="carousel" aria-label="Student video stories">
      <p className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#faba28]">Real Stories</p>

      <div
        className="mt-6 flex items-center justify-center gap-4 md:gap-6 touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClickCapture={onClickCapture}
      >
        {len > 1 && (
          <div className="hidden md:block w-44 lg:w-52 opacity-60 hover:opacity-90 transition-opacity duration-300">
            <VideoCard {...shared} item={items[prevIndex]} active={false} onSelect={goPrev} />
          </div>
        )}

        <div className="w-full max-w-[288px] sm:max-w-[320px] z-10">
          <VideoCard
            {...shared}
            item={active}
            active
            playing={playing}
            time={time}
            shouldPlay={autoplay}
            videoRef={(el) => (activeVideo.current = el)}
            onTogglePlay={togglePlay}
            onEnded={goNext}
          />
        </div>

        {len > 2 && (
          <div className="hidden md:block w-44 lg:w-52 opacity-60 hover:opacity-90 transition-opacity duration-300">
            <VideoCard {...shared} item={items[nextIndex]} active={false} onSelect={goNext} />
          </div>
        )}
      </div>

      {/* Quote (only when the student has given one) + attribution */}
      <div key={activeIndex} className="animate-sas-slide-up max-w-xl mx-auto mt-8 px-4 text-center">
        {active.quote && (
          <p className="text-base md:text-lg italic text-white/80 leading-relaxed">"{active.quote}"</p>
        )}
        <p className={`text-xs uppercase tracking-wider text-white/50 font-semibold ${active.quote ? 'mt-3' : ''}`}>
          {active.name} • {active.grade}
        </p>
      </div>

      {len > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous student story"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#a22634] text-white border border-white/25 hover:border-[#a22634] flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Show ${t.name}'s story`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? 'w-7 bg-[#faba28]' : 'w-2 bg-white/35 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next student story"
            className="w-11 h-11 rounded-full bg-[#a22634] hover:bg-[#7a1f2b] text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
