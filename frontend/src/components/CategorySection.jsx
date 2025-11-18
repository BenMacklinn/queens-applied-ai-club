import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CategorySection.css';
import CategoryCard from './CategoryCard';
import { categories } from '../data/categories';

function CategorySection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean);

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 50 });

    // Create timeline with delay
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate each card sequentially
    cards.forEach((card, index) => {
      tl.to(card, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, index * 0.2);
    });
  }, []);

  return (
    <section className="category-section" ref={sectionRef}>
      <div className="category-section-container">
        <div className="category-section-scroll">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index}
              ref={el => cardsRef.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;

