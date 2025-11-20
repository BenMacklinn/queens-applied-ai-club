import { useState, useEffect, useRef } from 'react';
import './SectionTitle.css';

function SectionTitle() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity and position based on scroll
  let opacity = 0;
  let translateY = 50;
  let exploreTranslateX = -100;
  let qvibeTranslateX = 100;

  if (sectionRef.current) {
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop + 500) / 400));
    
    opacity = scrollProgress;
    translateY = (1 - scrollProgress) * 50;
    exploreTranslateX = (1 - scrollProgress) * -100;
    qvibeTranslateX = (1 - scrollProgress) * 100;
  }

  return (
    <section className="section-title" ref={sectionRef}>
      <div className="section-title-container">
        <div 
          className="section-title-content"
          style={{
            opacity: opacity,
            transform: `translateY(${translateY}px)`
          }}
        >
          <div 
            className="section-title-word section-title-word-merchandise"
            style={{
              transform: `translateX(${exploreTranslateX}px) scaleY(0.6)`
            }}
          >
            EXPLORE
          </div>
          <div 
            className="section-title-word section-title-word-categories"
            style={{
              transform: `translateX(${qvibeTranslateX}px) scaleY(0.6)`
            }}
          >
            <div className="carousel-container">
              <div className="carousel-content">
                <span>QUEEN'S APPLIED AI CLUB</span>
                <span className="carousel-dot"></span>
                <span>QUEEN'S APPLIED AI CLUB</span>
                <span className="carousel-dot"></span>
                <span>QUEEN'S APPLIED AI CLUB</span>
                <span className="carousel-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionTitle;

