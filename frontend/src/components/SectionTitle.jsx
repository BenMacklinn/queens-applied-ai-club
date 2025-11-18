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
  let merchandiseTranslateX = -100;
  let categoriesTranslateX = 100;

  if (sectionRef.current) {
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop + 500) / 400));
    
    opacity = scrollProgress;
    translateY = (1 - scrollProgress) * 50;
    merchandiseTranslateX = (1 - scrollProgress) * -100;
    categoriesTranslateX = (1 - scrollProgress) * 100;
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
              transform: `translateX(${merchandiseTranslateX}px) scaleY(0.6)`
            }}
          >
            MERCHANDISE
          </div>
          <div 
            className="section-title-word section-title-word-categories"
            style={{
              transform: `translateX(${categoriesTranslateX}px) scaleY(0.6)`
            }}
          >
            CATEGORIES
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionTitle;

