import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './SectionTransition.css';

function SectionTransition() {
  const transitionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!transitionRef.current || !lineRef.current) return;

    gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });

    const handleScroll = () => {
      if (!transitionRef.current) return;
      
      const rect = transitionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInView) {
        gsap.to(lineRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        });
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="section-transition" ref={transitionRef}>
      <div className="transition-container">
        <div className="transition-line" ref={lineRef}>
          <div className="line-glow"></div>
        </div>
      </div>
    </section>
  );
}

export default SectionTransition;

