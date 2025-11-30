import './Footer.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../data/categories';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (slug) => {
    const targetPath = `/category/${slug}`;
    // Force navigation even if already on the same route
    if (location.pathname === targetPath) {
      // Navigate away first, then back to force re-render
      navigate('/');
      setTimeout(() => {
        navigate(targetPath);
        window.scrollTo(0, 0);
      }, 0);
    } else {
      navigate(targetPath);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/QVibeLogo.png" alt="QVibe Logo" className="footer-logo-img" />
          </div>
          
          <div className="footer-links">
            <span className="footer-categories-group">
              {categories.map((category, index) => (
                <span key={category.id}>
                  <a 
                    href={`/category/${category.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(category.slug);
                    }}
                    className="footer-link footer-link-category cursor-target"
                  >
                    {category.name}
                  </a>
                  {index < categories.length - 1 && <span className="footer-separator">•</span>}
                </span>
              ))}
            </span>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 Queen's Applied AI Club | QVibe. All rights reserved.
          </p>
          <p className="footer-contact">
            Questions? Reach out to Founder <strong>Ben Macklin</strong> - <a href="mailto:ben.macklin@queensu.ca" className="footer-email">ben.macklin@queensu.ca</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

