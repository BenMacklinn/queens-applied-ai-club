import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { categories, subcategories } from '../data/categories';
import { projects, events, teamMembers } from '../data/searchData';
import './Navbar.css';

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => {
    // Load search query from localStorage on mount
    return localStorage.getItem('searchQuery') || '';
  });
  const searchInputRef = useRef(null);

  // Save search query to localStorage whenever it changes
  useEffect(() => {
    if (searchQuery.trim()) {
      localStorage.setItem('searchQuery', searchQuery);
    } else {
      // Only remove from localStorage if explicitly cleared, not on mount
      // This allows the query to persist across page navigations
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-menu') && !event.target.closest('.navbar-menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    // Close menu on escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Close search when clicking outside
    const handleClickOutside = (event) => {
      if (isSearchOpen && !event.target.closest('.navbar-search-modal') && !event.target.closest('.navbar-icon')) {
        setIsSearchOpen(false);
        // Don't clear search query - keep it for next time
      }
    };

    // Close search on escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        // Don't clear search query - keep it for next time
      }
    };

    // Focus search input when opened
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) {
      setIsSearchOpen(false);
      // Don't clear search query - keep it for next time
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // Don't clear search query when opening - restore from localStorage if needed
    if (!isSearchOpen) {
      const savedQuery = localStorage.getItem('searchQuery') || '';
      if (savedQuery) {
        setSearchQuery(savedQuery);
      }
    }
  };

  const handleCategoryClick = (e) => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    // Hide target cursor when clicking sidebar menu items
    const cursorElement = document.querySelector('.target-cursor-wrapper');
    if (cursorElement) {
      const cursorStyle = window.getComputedStyle(cursorElement);
      if (cursorStyle.opacity !== '0') {
        gsap.to(cursorElement, {
          opacity: 0,
          duration: 0.2
        });
      }
    }
    // Don't prevent default - let React Router handle navigation
  };

  const handleSearchOverlayClick = () => {
    setIsSearchOpen(false);
    // Don't clear search query - keep it for next time
  };

  // Search function
  const getSearchResults = () => {
    if (!searchQuery.trim()) {
      return { categories: [], subcategories: [], projects: [], events: [], teamMembers: [] };
    }

    const query = searchQuery.toLowerCase().trim();
    
    // Search categories
    const matchedCategories = categories.filter(cat => 
      cat.name.toLowerCase().includes(query) ||
      cat.subtitle.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query)
    );

    // Search subcategories
    const matchedSubcategories = [];
    Object.entries(subcategories).forEach(([categorySlug, subs]) => {
      subs.forEach(sub => {
        if (sub.name.toLowerCase().includes(query)) {
          const parentCategory = categories.find(cat => cat.slug === categorySlug);
          matchedSubcategories.push({
            ...sub,
            parentCategory: parentCategory
          });
        }
      });
    });

    // Search projects
    const matchedProjects = projects.filter(project =>
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query.split(' ')[0]) // Search by words in description
    );

    // Search events
    const matchedEvents = events.filter(event =>
      event.name.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)
    );

    // Search team members
    const matchedTeamMembers = teamMembers.filter(member =>
      member.name.toLowerCase().includes(query) ||
      member.position.toLowerCase().includes(query) ||
      member.name.toLowerCase().split(' ').some(word => word.includes(query)) // Search by first/last name
    );

    return { 
      categories: matchedCategories, 
      subcategories: matchedSubcategories,
      projects: matchedProjects,
      events: matchedEvents,
      teamMembers: matchedTeamMembers
    };
  };

  const searchResults = getSearchResults();

  return (
    <>
      <nav className={`navbar ${!isVisible ? 'navbar-hidden' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo cursor-target">
              <img src="/QVibeLogo.png" alt="QVibe Logo" className="navbar-logo-img" />
            </Link>
            <button 
              className={`navbar-menu-toggle cursor-target ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                ) : (
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                )}
              </svg>
            </button>
          </div>
          <div className="navbar-right">
            <button 
              className="navbar-icon cursor-target" 
              aria-label="Search"
              onClick={toggleSearch}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      <div className={`navbar-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={handleCategoryClick}>
        <div className="navbar-menu" onClick={(e) => e.stopPropagation()}>
          <div className="navbar-menu-header">
            <h2 className="navbar-menu-title">Categories</h2>
          </div>
          <nav className="navbar-menu-nav">
            {categories.map((category, index) => {
              const borderColors = ['#C48BD4', '#8A7BCF', '#76A7E4', '#63B4EB', '#2665A8'];
              const hoverColor = borderColors[index % borderColors.length];
              // Convert hex to rgba with higher opacity to show QVibe colors
              const hex = hoverColor.replace('#', '');
              const r = parseInt(hex.substr(0, 2), 16);
              const g = parseInt(hex.substr(2, 2), 16);
              const b = parseInt(hex.substr(4, 2), 16);
              const hoverColorRgba = `rgba(${r}, ${g}, ${b}, 0.35)`;
              return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="navbar-menu-item cursor-target"
                onClick={handleCategoryClick}
                style={{ '--hover-color': hoverColorRgba }}
              >
                <div className="navbar-menu-item-content">
                  <span className="navbar-menu-item-name">{category.name}</span>
                  <span className="navbar-menu-item-subtitle">{category.subtitle}</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Search Modal */}
      <div className={`navbar-search-overlay ${isSearchOpen ? 'active' : ''}`} onClick={handleSearchOverlayClick}>
        <div className="navbar-search-modal" onClick={(e) => e.stopPropagation()}>
          <div className="navbar-search-header">
            <div className="navbar-search-input-wrapper">
              <svg className="navbar-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className="navbar-search-input"
                placeholder="Search categories and products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="navbar-search-clear"
                  onClick={() => {
                    setSearchQuery('');
                    localStorage.removeItem('searchQuery');
                  }}
                  aria-label="Clear search"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="navbar-search-results">
            {searchQuery.trim() ? (
              <>
                {searchResults.categories.length === 0 && 
                 searchResults.subcategories.length === 0 &&
                 searchResults.projects.length === 0 &&
                 searchResults.events.length === 0 &&
                 searchResults.teamMembers.length === 0 ? (
                  <div className="navbar-search-empty">
                    <p>No results found for "{searchQuery}"</p>
                  </div>
                ) : (
                  <>
                    {searchResults.projects.length > 0 && (
                      <div className="navbar-search-section">
                        <h3 className="navbar-search-section-title">Projects</h3>
                        {searchResults.projects.map((project, index) => (
                          <Link
                            key={`project-${index}`}
                            to={`/category/${project.slug}`}
                            className="navbar-search-result-item cursor-target"
                            onClick={(e) => {
                              handleCategoryClick(e);
                              setIsSearchOpen(false);
                            }}
                          >
                            <div className="navbar-search-result-content">
                              <span className="navbar-search-result-name">{project.name}</span>
                              <span className="navbar-search-result-subtitle">{project.description.substring(0, 60)}...</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                        ))}
                      </div>
                    )}

                    {searchResults.events.length > 0 && (
                      <div className="navbar-search-section">
                        <h3 className="navbar-search-section-title">Events</h3>
                        {searchResults.events.map((event, index) => (
                          <Link
                            key={`event-${index}`}
                            to={`/category/${event.slug}`}
                            className="navbar-search-result-item cursor-target"
                            onClick={(e) => {
                              handleCategoryClick(e);
                              setIsSearchOpen(false);
                            }}
                          >
                            <div className="navbar-search-result-content">
                              <span className="navbar-search-result-name">{event.name}</span>
                              <span className="navbar-search-result-subtitle">{event.description.substring(0, 60)}...</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                        ))}
                      </div>
                    )}

                    {searchResults.teamMembers.length > 0 && (
                      <div className="navbar-search-section">
                        <h3 className="navbar-search-section-title">Team Members</h3>
                        {searchResults.teamMembers.map((member, index) => (
                          <Link
                            key={`member-${index}`}
                            to={`/category/${member.slug}`}
                            className="navbar-search-result-item cursor-target"
                            onClick={(e) => {
                              handleCategoryClick(e);
                              setIsSearchOpen(false);
                            }}
                          >
                            <div className="navbar-search-result-content">
                              <span className="navbar-search-result-name">{member.name}</span>
                              <span className="navbar-search-result-subtitle">{member.position}</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                        ))}
                      </div>
                    )}

                    {searchResults.categories.length > 0 && (
                      <div className="navbar-search-section">
                        <h3 className="navbar-search-section-title">Categories</h3>
                        {searchResults.categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/category/${category.slug}`}
                            className="navbar-search-result-item cursor-target"
                            onClick={(e) => {
                              handleCategoryClick(e);
                              setIsSearchOpen(false);
                            }}
                          >
                            <div className="navbar-search-result-content">
                              <span className="navbar-search-result-name">{category.name}</span>
                              <span className="navbar-search-result-subtitle">{category.subtitle}</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                        ))}
                      </div>
                    )}

                    {searchResults.subcategories.length > 0 && (
                      <div className="navbar-search-section">
                        <h3 className="navbar-search-section-title">Products</h3>
                        {searchResults.subcategories.map((subcategory, index) => (
                          <a
                            key={`${subcategory.slug}-${index}`}
                            href={subcategory.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="navbar-search-result-item cursor-target"
                            onClick={handleCategoryClick}
                          >
                            <div className="navbar-search-result-content">
                              <span className="navbar-search-result-name">{subcategory.name}</span>
                              <span className="navbar-search-result-subtitle">
                                {subcategory.parentCategory?.name || subcategory.parentCategory?.subtitle}
                              </span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="navbar-search-empty">
                <p>Start typing to search...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

