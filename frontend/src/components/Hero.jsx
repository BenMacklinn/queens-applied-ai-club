import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

function Hero() {
  const heroTextRef = useRef(null);
  const titleLinesRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!heroTextRef.current) return;

    const titleLines = titleLinesRef.current.filter(Boolean);
    const cta = ctaRef.current;

    // Set initial state
    gsap.set(titleLines, { opacity: 0, y: 50 });
    gsap.set(cta, { opacity: 0, y: 20 });

    // Create timeline
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate each title line sequentially
    titleLines.forEach((line, index) => {
      tl.to(line, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, index * 0.15);
    });

    // Animate CTA after title
    tl.to(cta, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3');
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-left-bg"></div>
          <div className="hero-text" ref={heroTextRef}>
            <h1 className="hero-title">
              <span 
                className="hero-title-line"
                ref={el => titleLinesRef.current[0] = el}
              >
                GET
              </span>
              <span 
                className="hero-title-line"
                ref={el => titleLinesRef.current[1] = el}
              >
                YOURSELF
              </span>
              <div className="hero-title-green-block">
                <span 
                  className="hero-title-line hero-title-white"
                  ref={el => titleLinesRef.current[2] = el}
                >
                  INTO TECH'S
                </span>
              </div>
              <div className="hero-title-green-block">
                <span 
                  className="hero-title-line hero-title-white"
                  ref={el => titleLinesRef.current[3] = el}
                >
                  FAVOURITE GEAR
                </span>
              </div>
            </h1>
            <div className="hero-cta" ref={ctaRef}>
              Technology Business Programming Network
            </div>
            <div className="hero-overlap-element"></div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-container">
              <img src="/TBPNBoys.webp" alt="TBPN Merch" className="hero-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

