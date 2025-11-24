import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { categories, subcategories } from '../data/categories';
import { projects as sharedProjects, events as sharedEvents } from '../data/searchData';
import Navbar from '../components/Navbar';
import './CategoryPage.css';

function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(cat => cat.slug === slug);
  const categorySubcategories = subcategories[slug] || [];
  const cardsRef = useRef([]);
  const hasAnimatedRef = useRef(false);
  const paletteColors = ['#C48BD4', '#8A7BCF', '#76A7E4', '#63B4EB', '#2665A8'];
  const [selectedProject, setSelectedProject] = React.useState(null);

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
      </>
    );
  }

  // Team members organized hierarchically
  const teamHierarchy = [
    {
      level: 'PRES',
      title: 'Presidents',
      members: [
        { name: 'Ben Macklin', imageUrl: '/Ben Macklin.png', linkedin: 'https://www.linkedin.com/in/ben-macklin-927576297/' },
        { name: 'Ben Lewandowski', imageUrl: '/Ben Lewandowski.png', linkedin: 'https://www.linkedin.com/in/ben-lewandowski-/' },
        { name: 'Ray Goldberg', imageUrl: '/Ray Goldberg.png', linkedin: 'https://www.linkedin.com/in/ray-goldberg-2791a9338/' }
      ]
    },
    {
      level: 'Head',
      title: 'Chief of Staff',
      members: [
        { name: 'Charlotte King', imageUrl: '/CharKing.jpeg', linkedin: 'https://www.linkedin.com/in/charlotte-king-0ba139310/' },
        { name: 'Ella McConell', imageUrl: '/EllaMcConell.jpeg', linkedin: 'https://www.linkedin.com/in/ellamcconnell/' }
      ]
    },
    {
      level: 'Director',
      title: 'Director of Partnerships',
      members: [
        { name: 'Matthew Bowman', imageUrl: '/Matthew Bowman.jpeg', linkedin: 'https://www.linkedin.com/in/matthew-bowman-4a0874388/' },
        { name: 'Jacob Shull', imageUrl: '/Jacob Shull.png', linkedin: 'https://www.linkedin.com/in/jacob-shull-95b019221/' }
      ]
    },
    {
      level: 'Advisor',
      title: 'Senior Advisor',
      members: [
        { name: 'Ned Booth', imageUrl: '/NedBooth.jpeg', linkedin: 'https://www.linkedin.com/in/ned-booth/' }
      ]
    },
    {
      level: 'Director',
      title: 'General Member Director',
      members: [
        { name: 'Max Rainville', imageUrl: '/Max Rainville.png', linkedin: 'https://www.linkedin.com/in/max-rainville-5814642a8/' }
      ]
    },
    {
      level: 'Director',
      title: 'Director of Marketing',
      members: [
        { name: 'Thaila Adda', imageUrl: '/ThailaAdda.jpeg', linkedin: 'https://www.linkedin.com/in/thailaadda/' },
        { name: 'Meyer Eskin', imageUrl: '/MeyerEskin.jpeg', linkedin: 'https://www.linkedin.com/in/meyereskin/' }
      ],
      coordinators: 'TBD'
    },
    {
      level: 'Director',
      title: 'Director of Logistics',
      members: [
        { name: 'Tanry Wang', imageUrl: '/Tanry Wang.png', linkedin: 'https://www.linkedin.com/in/tanry-wang-9b7222278/' },
        { name: 'Julian Chan', imageUrl: '/Julian Chan.png', linkedin: 'https://www.linkedin.com/in/julian-chan-91347b2b9/' }
      ]
    },
    {
      level: 'Director',
      title: 'Director of Strategy',
      members: [
        { name: 'Alex Wittstock', imageUrl: '/AlexWittstock.jpeg', linkedin: 'https://www.linkedin.com/in/alex-wittstock-69363929a/' }
      ]
    },
    {
      level: 'Head',
      title: 'Head Of Culture',
      members: [
        { name: 'Jay Persaud', imageUrl: '/JayChugs.jpeg', linkedin: 'https://www.linkedin.com/in/jay-persaud/' }
      ]
    }
  ];

  // Use shared data
  const events = sharedEvents.map(event => ({
    ...event,
    imageUrl: event.imageUrl
  }));
  
  const projects = sharedProjects.map(project => ({
    ...project,
    imageUrl: project.imageUrl
  }));

  // Get Involved form state
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    purpose: '',
    message: ''
  });

  // Special layout for Get Involved page
  if (slug === 'get-involved') {
    return (
      <>
        <Navbar />
        <div className="category-page get-involved-page">
          <div className="category-page-container">
            <Link to="/" className="back-link cursor-target">← Back to Home</Link>
            <div className="get-involved-content">
              <div className="get-involved-left">
                <div className="get-involved-header">
                  <h1 className="get-involved-title">GET INVOLVED</h1>
                  <p className="get-involved-description">
                    Join Queen's University's fastest growing AI community. Whether you're a beginner or experienced developer, we welcome you to build, learn, and grow with us.
                  </p>
                </div>
              </div>
              <div className="get-involved-right">
                <form className="get-involved-form" onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission here
                  console.log('Form submitted:', formData);
                }}>
                  <div className="form-field">
                    <label className="form-label">FULL NAME</label>
                    <input
                      type="text"
                      className="form-input cursor-target"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label">EMAIL</label>
                    <input
                      type="email"
                      className="form-input cursor-target"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label">HOW WOULD YOU LIKE TO GET INVOLVED?</label>
                    <div className="purpose-buttons">
                      <button
                        type="button"
                        className={`purpose-button cursor-target ${formData.purpose === 'join-club' ? 'active' : ''}`}
                        onClick={() => setFormData({...formData, purpose: 'join-club'})}
                      >
                        JOIN CLUB
                      </button>
                      <button
                        type="button"
                        className={`purpose-button cursor-target ${formData.purpose === 'workshop' ? 'active' : ''}`}
                        onClick={() => setFormData({...formData, purpose: 'workshop'})}
                      >
                        ATTEND WORKSHOP
                      </button>
                      <button
                        type="button"
                        className={`purpose-button cursor-target ${formData.purpose === 'collaborate' ? 'active' : ''}`}
                        onClick={() => setFormData({...formData, purpose: 'collaborate'})}
                      >
                        COLLABORATE
                      </button>
                      <button
                        type="button"
                        className={`purpose-button cursor-target ${formData.purpose === 'other' ? 'active' : ''}`}
                        onClick={() => setFormData({...formData, purpose: 'other'})}
                      >
                        OTHER
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label">MESSAGE</label>
                    <textarea
                      className="form-textarea cursor-target"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="form-submit-button cursor-target">
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Special layout for Events page
  if (slug === 'events') {
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    
    // Preload images for faster navigation
    React.useEffect(() => {
      if (selectedEvent) {
        const eventImages = selectedEvent.images || [selectedEvent.imageUrl].filter(Boolean);
        // Preload current, next, and previous images
        eventImages.forEach((imgSrc, index) => {
          const img = new Image();
          img.src = imgSrc;
        });
      }
    }, [selectedEvent]);
    
    // Preload adjacent images when index changes
    React.useEffect(() => {
      if (selectedEvent) {
        const eventImages = selectedEvent.images || [selectedEvent.imageUrl].filter(Boolean);
        // Preload next and previous images
        const nextIndex = (selectedImageIndex + 1) % eventImages.length;
        const prevIndex = (selectedImageIndex - 1 + eventImages.length) % eventImages.length;
        
        [nextIndex, prevIndex].forEach(index => {
          if (eventImages[index]) {
            const img = new Image();
            img.src = eventImages[index];
          }
        });
      }
    }, [selectedEvent, selectedImageIndex]);
    
    // Sort events by date (newest first)
    const sortedEvents = [...events].sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date) - new Date(a.date);
    });
    
    // Format date for display
    const formatDate = (dateString) => {
      if (!dateString) return '';
      // Parse date string directly to avoid timezone issues
      const parts = dateString.split('-');
      if (parts.length !== 3) return dateString;
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      return `${months[month - 1]} ${day}, ${year}`;
    };
    
    // Memoized navigation handlers for better performance
    const handleNextImage = React.useCallback((e, eventImages) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedImageIndex((prev) => 
        prev === eventImages.length - 1 ? 0 : prev + 1
      );
    }, []);
    
    const handlePrevImage = React.useCallback((e, eventImages) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedImageIndex((prev) => 
        prev === 0 ? eventImages.length - 1 : prev - 1
      );
    }, []);
    
    const handleThumbnailClick = React.useCallback((e, index) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedImageIndex(index);
    }, []);
    
    return (
      <>
        <Navbar />
        <div className={`category-page events-page ${selectedEvent ? 'modal-open' : ''}`}>
          <div className="category-page-container">
            <Link to="/" className="back-link cursor-target">← Back to Home</Link>
            <div className="category-header">
              <h1 className="category-title">Events</h1>
            </div>
            
            <div className="events-timeline">
              <div className="timeline-middle-line"></div>
              {sortedEvents.map((event, index) => {
                const borderColor = paletteColors[index % paletteColors.length];
                const eventImages = event.images || [event.imageUrl].filter(Boolean);
                // Alternate: 0=right, 1=left, 2=right, 3=left, etc.
                const isRight = index % 2 === 0;
                const progress = ((index + 1) / sortedEvents.length) * 100;
                
                return (
                  <div 
                    key={index}
                    className={`timeline-event ${isRight ? 'timeline-event-right' : 'timeline-event-left'}`}
                    ref={el => setCardRef(el, index)}
                  >
                    <div className="timeline-marker" style={{ '--event-color': borderColor }}>
                      <div className="timeline-marker-dot"></div>
                      <div className="timeline-marker-pulse"></div>
                    </div>
                    
                    <div 
                      className="timeline-event-card cursor-target"
                      style={{ '--event-color': borderColor }}
                      onClick={() => {
                        setSelectedEvent(event);
                        setSelectedImageIndex(0);
                      }}
                    >
                      <div className="timeline-event-date">
                        {event.date && formatDate(event.date)}
                      </div>
                      
                      <div className="timeline-event-image-wrapper">
                        {eventImages.length > 0 && (
                          <>
                            <img 
                              src={eventImages[0]} 
                              alt={event.name}
                              className="timeline-event-image"
                            />
                            <div className="timeline-event-image-overlay"></div>
                          </>
                        )}
                      </div>
                      
                      <div className="timeline-event-content">
                        <h3 className="timeline-event-title">{event.name}</h3>
                        <div className="timeline-event-footer">
                          <span className="timeline-event-photos">{eventImages.length} Photos</span>
                          <span className="timeline-event-arrow">→</span>
                        </div>
                      </div>
                      
                      <div className="timeline-event-progress" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {selectedEvent && (() => {
              const eventIndex = events.findIndex(e => e.name === selectedEvent.name);
              const modalBorderColor = paletteColors[eventIndex % paletteColors.length];
              const eventImages = selectedEvent.images || [selectedEvent.imageUrl].filter(Boolean);
              
              return (
                <div className="event-gallery-overlay" onClick={() => setSelectedEvent(null)}>
                  <div 
                    className="event-gallery-modal" 
                    onClick={(e) => e.stopPropagation()}
                    style={{ 
                      '--event-color': modalBorderColor
                    }}
                  >
                    <button 
                      className="event-gallery-close cursor-target" 
                      onClick={() => setSelectedEvent(null)}
                    >×</button>
                    
                    <div className="event-gallery-header">
                      <div className="event-gallery-header-top">
                        <h2 className="event-gallery-title">{selectedEvent.name}</h2>
                        {selectedEvent.date && (
                          <div className="event-gallery-date">{formatDate(selectedEvent.date)}</div>
                        )}
                      </div>
                      <p className="event-gallery-description">{selectedEvent.description}</p>
                    </div>
                    
                    <div className="event-gallery-main">
                      {eventImages.length > 0 && (
                        <div className="event-gallery-main-image-container">
                          {/* Hidden preload images for adjacent slides */}
                          {eventImages.length > 1 && (
                            <>
                              <img 
                                src={eventImages[(selectedImageIndex + 1) % eventImages.length]} 
                                alt=""
                                style={{ display: 'none' }}
                                loading="eager"
                              />
                              <img 
                                src={eventImages[(selectedImageIndex - 1 + eventImages.length) % eventImages.length]} 
                                alt=""
                                style={{ display: 'none' }}
                                loading="eager"
                              />
                            </>
                          )}
                          <img 
                            key={selectedImageIndex}
                            src={eventImages[selectedImageIndex]} 
                            alt={`${selectedEvent.name} ${selectedImageIndex + 1}`}
                            className="event-gallery-main-image"
                            loading="eager"
                            decoding="async"
                          />
                          {eventImages.length > 1 && (
                            <>
                              <button 
                                className="event-gallery-nav event-gallery-prev cursor-target"
                                onClick={(e) => handlePrevImage(e, eventImages)}
                                type="button"
                              >‹</button>
                              <button 
                                className="event-gallery-nav event-gallery-next cursor-target"
                                onClick={(e) => handleNextImage(e, eventImages)}
                                type="button"
                              >›</button>
                            </>
                          )}
                        </div>
                      )}
                      
                      {eventImages.length > 1 && (
                        <div className="event-gallery-thumbnails">
                          {eventImages.map((img, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`event-gallery-thumbnail cursor-target ${imgIndex === selectedImageIndex ? 'active' : ''}`}
                              onClick={(e) => handleThumbnailClick(e, imgIndex)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleThumbnailClick(e, imgIndex);
                                }
                              }}
                            >
                              <img 
                                src={img} 
                                alt={`${selectedEvent.name} thumbnail ${imgIndex + 1}`}
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </>
    );
  }

  // Special layout for Projects page
  if (slug === 'projects') {
    return (
      <>
        <Navbar />
        <div className="category-page projects-page">
          <div className="category-page-container">
            <Link to="/" className="back-link cursor-target">← Back to Home</Link>
            <div className="category-header">
              <h1 className="category-title">Projects</h1>
            </div>
            
            <div className="projects-grid">
              {projects.map((project, index) => {
                const borderColor = paletteColors[index % paletteColors.length];
                return (
                  <div 
                    key={index}
                    className="project-card cursor-target"
                    ref={el => setCardRef(el, index)}
                    style={{ 
                      borderColor: borderColor,
                      '--project-border-color': borderColor
                    }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.imageUrl && (
                      <div className="project-image-container">
                        <img 
                          src={project.imageUrl} 
                          alt={project.name}
                          className="project-image"
                        />
                      </div>
                    )}
                    <div className="project-card-content">
                      <h3 className="project-name">{project.name}</h3>
                      <p className="project-view-more">View More</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {selectedProject && (() => {
              const projectIndex = projects.findIndex(p => p.name === selectedProject.name);
              const modalBorderColor = paletteColors[projectIndex % paletteColors.length];
              return (
                <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
                  <div 
                    className="project-modal" 
                    onClick={(e) => e.stopPropagation()}
                    style={{ 
                      '--project-border-color': modalBorderColor,
                      borderColor: modalBorderColor
                    }}
                  >
                    <button 
                      className="project-modal-close cursor-target" 
                      onClick={() => setSelectedProject(null)}
                      style={{ borderColor: modalBorderColor }}
                    >×</button>
                    {selectedProject.imageUrl && (
                      <div 
                        className="project-modal-image-container"
                        style={{ borderBottomColor: modalBorderColor }}
                      >
                        <img 
                          src={selectedProject.imageUrl} 
                          alt={selectedProject.name}
                          className="project-modal-image"
                        />
                      </div>
                    )}
                    <div className="project-modal-content">
                      <h2 className="project-modal-name">{selectedProject.name}</h2>
                      <p className="project-modal-description">{selectedProject.description}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </>
    );
  }

  // Special layout for Our Team page
  if (slug === 'our-team') {
    return (
      <>
        <Navbar />
        <div className="category-page our-team-page">
          <div className="category-page-container">
            <Link to="/" className="back-link cursor-target">← Back to Home</Link>
            <div className="category-header">
              <h1 className="category-title">Our Team</h1>
            </div>
            
            <div className="team-hierarchy">
              {teamHierarchy.map((section, sectionIndex) => {
                let cardIndex = 0;
                return (
                  <div key={sectionIndex} className="team-section">
                    <div className="team-section-header">
                      <h2 className="team-section-title">{section.title}</h2>
                      {section.description && (
                        <p className="team-section-description">{section.description}</p>
                      )}
                      {section.coordinators && (
                        <p className="team-section-coordinators">Coordinators: {section.coordinators}</p>
                      )}
                    </div>
                    <div className={`team-grid team-grid-${section.level.toLowerCase()}`}>
                      {section.members.map((member, memberIndex) => {
                        const globalIndex = sectionIndex * 10 + memberIndex;
                        const borderColor = paletteColors[globalIndex % paletteColors.length];
                        const CardComponent = member.linkedin ? 'a' : 'div';
                        const cardProps = member.linkedin ? {
                          href: member.linkedin,
                          target: '_blank',
                          rel: 'noopener noreferrer'
                        } : {};
                        
                        return (
                          <CardComponent
                            key={memberIndex}
                            className="team-card cursor-target"
                            ref={el => {
                              if (el) {
                                const index = sectionIndex * 10 + memberIndex;
                                setCardRef(el, index);
                              }
                            }}
                            style={{ 
                              '--team-border-color': borderColor,
                              borderColor: borderColor
                            }}
                            {...cardProps}
                          >
                            {member.imageUrl && (
                              <div className="team-image-container">
                                <img 
                                  src={member.imageUrl} 
                                  alt={member.name}
                                  className="team-image"
                                />
                              </div>
                            )}
                            {!member.imageUrl && (
                              <div className="team-image-container team-image-placeholder">
                                <div className="team-placeholder-icon">👤</div>
                              </div>
                            )}
                            <div className="team-card-content">
                              <h3 className="team-member-name">{member.name}</h3>
                            </div>
                          </CardComponent>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Special layout for About Us page
  if (slug === 'about-us') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div className="category-page about-us-page" style={{ flex: 1 }}>
          <div className="category-page-container">
            <Link to="/" className="back-link cursor-target">← Back to Home</Link>
            
            <div className="about-us-hero">
              <div className="about-us-abstract-bg">
                <div className="about-us-abstract-shape about-us-shape-1"></div>
                <div className="about-us-abstract-shape about-us-shape-2"></div>
                <div className="about-us-abstract-shape about-us-shape-3"></div>
                <div className="about-us-abstract-shape about-us-shape-4"></div>
              </div>
              <h1 className="about-us-title">About Us</h1>
            </div>

            <div className="about-us-main-content">
              <div className="about-us-description">
                <div className="about-us-abstract-line about-us-line-1"></div>
                <div className="about-us-geometric-shape about-us-geo-1"></div>
                <div className="about-us-geometric-shape about-us-geo-2"></div>
                <p className="about-us-text">
                  QVibe is Queen's University's Applied AI Club. We empower students to build with AI, regardless of technical background.
                </p>
                <div className="about-us-abstract-line about-us-line-2"></div>
              </div>
              
              <div className="about-us-details">
                <div className="about-us-detail-item">
                  <div className="about-us-detail-line"></div>
                  <div className="about-us-detail-content">
                    <div className="about-us-detail-abstract about-us-detail-abstract-1"></div>
                    <h3 className="about-us-detail-title">Workshops</h3>
                    <p className="about-us-detail-text">Hands-on learning with cutting-edge AI tools</p>
                  </div>
                </div>
                <div className="about-us-detail-item">
                  <div className="about-us-detail-line"></div>
                  <div className="about-us-detail-content">
                    <div className="about-us-detail-abstract about-us-detail-abstract-2"></div>
                    <h3 className="about-us-detail-title">Hackathons</h3>
                    <p className="about-us-detail-text">Annual events to build, network, and showcase</p>
                  </div>
                </div>
                <div className="about-us-detail-item">
                  <div className="about-us-detail-line"></div>
                  <div className="about-us-detail-content">
                    <div className="about-us-detail-abstract about-us-detail-abstract-3"></div>
                    <h3 className="about-us-detail-title">Projects</h3>
                    <p className="about-us-detail-text">Collaborative building sessions solving real problems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the category's index to match border color with category card
  const categoryIndex = categories.findIndex(cat => cat.slug === slug);
  const categoryBorderColor = paletteColors[categoryIndex % paletteColors.length];

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
                style={{ 
                  borderColor: categoryBorderColor,
                  '--category-border-color': categoryBorderColor
                }}
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
    </>
  );
}

export default CategoryPage;


