import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollWrapperProps {
  children: ReactNode;
}

export const ScrollWrapper = ({ children }: ScrollWrapperProps) => {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Integrate Lenis with GSAP ScrollTrigger for optimal performance
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for smooth integration
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);

    // Scroll to top on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, [location.pathname]);

  return <>{children}</>;
};

