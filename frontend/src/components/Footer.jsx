import './Footer.css';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

function Footer() {
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
                  <Link to={`/category/${category.slug}`} className="footer-link footer-link-category cursor-target">
                    {category.name}
                  </Link>
                  {index < categories.length - 1 && <span className="footer-separator">•</span>}
                </span>
              ))}
            </span>
            <span className="footer-separator">•</span>
            <a href="https://www.tbpnmerch.com/blog" className="footer-link footer-link-blog cursor-target">Blog</a>
            <span className="footer-separator">•</span>
            <a href="mailto:tbpnmerch@gmail.com" className="footer-link footer-link-contact cursor-target">Contact Us</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 TBPN - Technology Brothers Podcast Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

