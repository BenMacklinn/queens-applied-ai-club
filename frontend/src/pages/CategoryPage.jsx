import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { categories, subcategories } from '../data/categories';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CategoryPage.css';

function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(cat => cat.slug === slug);
  const categorySubcategories = subcategories[slug] || [];
  const cardsRef = useRef([]);
  const hasAnimatedRef = useRef(false);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Set initial state immediately when refs are assigned
  const setCardRef = (el, index) => {
    if (el) {
      cardsRef.current[index] = el;
      if (!hasAnimatedRef.current) {
        // Set initial hidden state immediately for first load
        gsap.set(el, { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          rotation: -2
        });
      } else {
        // On subsequent navigations, make sure they're visible
        gsap.set(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0
        });
      }
    }
  };

  // Animate subcategory cards only on first mount
  useEffect(() => {
    if (hasAnimatedRef.current) return;
    
    // Small delay to ensure all refs are set
    const timeoutId = setTimeout(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      hasAnimatedRef.current = true;

      // Create timeline with shorter delay
      const tl = gsap.timeline({ delay: 0.1 });

      // Animate each card with stagger
      cards.forEach((card, index) => {
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'back.out(1.2)'
        }, index * 0.05);
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!category) {
    return (
      <>
        <Navbar />
        <div className="category-page">
          <div className="category-page-container">
            <h1>Category not found</h1>
            <Link to="/" className="back-link cursor-target">← Back to Home</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="category-page">
        <div className="category-page-container">
          <Link to="/" className="back-link cursor-target">← Back to Home</Link>
          <div className="category-header">
            <h1 className="category-title">{category.name}</h1>
          </div>
          
          <div className="subcategories-grid">
            {categorySubcategories.map((subcategory, index) => (
              <a
                key={subcategory.slug}
                href={subcategory.url}
                target="_blank"
                rel="noopener noreferrer"
                className="subcategory-card cursor-target"
                ref={el => setCardRef(el, index)}
              >
                {subcategory.imageUrl && (
                  <div className="subcategory-image-container">
                    <img 
                      src={subcategory.imageUrl} 
                      alt={subcategory.name}
                      className="subcategory-image"
                    />
                  </div>
                )}
                <div className="subcategory-card-content">
                  <h3 className="subcategory-name">{subcategory.name}</h3>
                  <span className="subcategory-link">View Products →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;

