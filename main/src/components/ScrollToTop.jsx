import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsap';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let timer;

    if (hash) {
      // Subpages are code-split, so the target may not exist yet: retry for up to ~2s.
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const seek = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tries++ < 20) {
          timer = setTimeout(seek, 100);
        }
      };
      timer = setTimeout(seek, 120);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // The new page changes document height: re-measure header and reveal triggers.
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(timer);
      clearTimeout(refresh);
    };
  }, [pathname, hash]);

  return null;
}
