import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, subcategories } from '../data/categories';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CategoryPage.css';

function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(cat => cat.slug === slug);
  const categorySubcategories = subcategories[slug] || [];

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

