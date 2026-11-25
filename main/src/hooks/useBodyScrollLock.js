import { useEffect } from 'react';

// Shared counter so stacked overlays (e.g. a popup opened from the menu) don't
// unlock the page while another one is still open.
let locks = 0;
let saved = '';

/**
 * Stops the page behind a popup from scrolling while `active` is true.
 */
export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    if (locks === 0) {
      saved = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    locks += 1;
    return () => {
      locks -= 1;
      if (locks === 0) document.body.style.overflow = saved;
    };
  }, [active]);
}
