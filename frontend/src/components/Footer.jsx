import './Footer.css';
import { categories } from '../data/categories';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/TBONLogo.png" alt="TBPN Logo" className="footer-logo-img" />
          </div>
          
          <div className="footer-links">
            <a href="https://www.tbpnmerch.com/blog" className="footer-link cursor-target">Blog</a>
            <span className="footer-separator">•</span>
            {categories.map((category, index) => (
              <span key={category.id}>
                <a href={`#${category.slug}`} className="footer-link cursor-target">
                  {category.name}
                </a>
                {index < categories.length - 1 && <span className="footer-separator">•</span>}
              </span>
            ))}
            <span className="footer-separator">•</span>
            <a href="#contact" className="footer-link cursor-target">Contact Us</a>
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

