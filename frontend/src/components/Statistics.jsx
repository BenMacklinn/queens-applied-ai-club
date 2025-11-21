import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Statistics.css';

const stats = [
  {
    id: 'members',
    value: 500,
    suffix: '+',
    label: 'Active Members',
    description: 'Students & Alumni',
    gradient: 'linear-gradient(135deg, #C48BD4 0%, #8A7BCF 100%)'
  },
  {
    id: 'projects',
    value: 75,
    suffix: '+',
    label: 'Projects Completed',
    description: 'AI & ML Innovations',
    gradient: 'linear-gradient(135deg, #8A7BCF 0%, #76A7E4 100%)'
  },
  {
    id: 'events',
    value: 40,
    suffix: '+',
    label: 'Events Hosted',
    description: 'Workshops & Meetups',
    gradient: 'linear-gradient(135deg, #76A7E4 0%, #63B4EB 100%)'
  },
  {
    id: 'workshops',
    value: 25,
    suffix: '+',
    label: 'Workshops',
    description: 'Hands-On Learning',
    gradient: 'linear-gradient(135deg, #63B4EB 0%, #2665A8 100%)'
  }
];

function Statistics() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const statCards = sectionRef.current.querySelectorAll('.stat-card');
    const numberElements = sectionRef.current.querySelectorAll('.stat-number');
    const progressElements = sectionRef.current.querySelectorAll('.stat-progress');

    // Set initial state
    gsap.set(statCards, { opacity: 0, y: 60, scale: 0.8 });
    gsap.set(numberElements, { opacity: 0, scale: 0.5 });

    let hasAnimated = false;
    const countersAnimated = new Set();

    const animateStats = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

      if (isInView && !hasAnimated) {
        hasAnimated = true;

        // Animate cards in sequentially
        const tl = gsap.timeline();
        statCards.forEach((card, index) => {
          tl.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)'
          }, index * 0.15);
        });

        // Animate numbers counting up
        statCards.forEach((card, index) => {
          const stat = stats[index];
          const numberElement = card.querySelector('.stat-number');
          const progressElement = card.querySelector('.stat-progress');

          if (numberElement && progressElement && !countersAnimated.has(index)) {
            countersAnimated.add(index);
            
            gsap.to({ value: 0 }, {
              value: stat.value,
              duration: 2,
              delay: index * 0.2 + 0.5,
              ease: 'power2.out',
              onUpdate: function() {
                const currentValue = Math.floor(this.targets()[0].value);
                numberElement.textContent = currentValue;
                
                // Animate number appearance
                gsap.to(numberElement, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.3
                });

                // Animate progress bar
                const progress = (currentValue / stat.value) * 100;
                gsap.to(progressElement, {
                  width: `${progress}%`,
                  duration: 0.1
                });
              }
            });
          }
        });
      }
    };

    // Initial check
    animateStats();

    // Scroll listener
    const handleScroll = () => {
      animateStats();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="statistics" ref={sectionRef}>
      <div className="statistics-container">
        <div className="statistics-header">
          <h2 className="statistics-title">
            <span className="statistics-title-line">By The</span>
            <span className="statistics-title-accent">Numbers</span>
          </h2>
          <p className="statistics-subtitle">
            Growing the AI community at Queen's, one project at a time
          </p>
        </div>

        <div className="statistics-grid">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className="stat-card"
              style={{ '--gradient': stat.gradient }}
            >
              <div className="stat-card-inner">
                <div className="stat-progress-bar">
                  <div 
                    className="stat-progress"
                    style={{ 
                      background: stat.gradient,
                      width: '0%'
                    }}
                  ></div>
                </div>
                
                <div className="stat-content">
                  <div className="stat-number-wrapper">
                    <span className="stat-number">0</span>
                    <span className="stat-suffix">{stat.suffix}</span>
                  </div>
                  
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>

                <div className="stat-card-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;

