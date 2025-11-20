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
      level: 'Director',
      title: 'Director of Partnerships',
      description: 'Find speakers and partnerships for events.',
      members: [
        { name: 'Matthew Bowman', imageUrl: '/Matthew Bowman.jpeg', linkedin: 'https://www.linkedin.com/in/matthew-bowman-4a0874388/' },
        { name: 'Jacob Shull', imageUrl: '/Jacob Shull.png', linkedin: 'https://www.linkedin.com/in/jacob-shull-95b019221/' }
      ]
    },
    {
      level: 'Advisor',
      title: 'Senior Advisor',
      members: [
        { name: 'Ned', imageUrl: null, linkedin: null }
      ]
    },
    {
      level: 'Director',
      title: 'General Member Director',
      description: 'Sends Email to events and helps connect people to help.',
      members: [
        { name: 'Max Rainville', imageUrl: '/Max Rainville.png', linkedin: 'https://www.linkedin.com/in/max-rainville-5814642a8/' }
      ]
    },
    {
      level: 'Director',
      title: 'Director of Marketing',
      members: [
        { name: 'Thaila Adda', imageUrl: null, linkedin: null },
        { name: 'Meyer Eskin', imageUrl: null, linkedin: null }
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
        { name: 'Alex', imageUrl: null, linkedin: null }
      ]
    },
    {
      level: 'Head',
      title: 'Head Of Culture',
      members: [
        { name: 'J CHUGSSSS', imageUrl: null, linkedin: null }
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
    return (
      <>
        <Navbar />
        <div className="category-page events-page">
          <div className="category-page-container">
            <Link to="/" className="back-link cursor-target">← Back to Home</Link>
            <div className="category-header">
              <h1 className="category-title">Events</h1>
            </div>
            
            <div className="projects-grid events-grid">
              {events.map((event, index) => {
                const borderColor = paletteColors[index % paletteColors.length];
                return (
                  <div 
                    key={index}
                    className="project-card event-card cursor-target"
                    ref={el => setCardRef(el, index)}
                    style={{ 
                      borderColor: borderColor,
                      '--project-border-color': borderColor
                    }}
                    onClick={() => setSelectedProject(event)}
                  >
                    {event.imageUrl && (
                      <div className="project-image-container">
                        <img 
                          src={event.imageUrl} 
                          alt={event.name}
                          className="project-image"
                        />
                      </div>
                    )}
                    <div className="project-card-content">
                      <h3 className="project-name">{event.name}</h3>
                      <p className="project-view-more">View More</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {selectedProject && (() => {
              const eventIndex = events.findIndex(e => e.name === selectedProject.name);
              const modalBorderColor = paletteColors[eventIndex % paletteColors.length];
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
                      className="project-modal-close" 
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
                      className="project-modal-close" 
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
              <h1 className="about-us-title">About Us</h1>
              <p className="about-us-tagline">
                Empowering the next generation of AI builders at Queen's University
              </p>
            </div>

            <div className="about-us-main-content">
              <section className="about-us-section">
                <h2 className="about-us-section-title">Our Mission</h2>
                <p className="about-us-text">
                  QVibe empowers anyone to build with AI tools, regardless of technical background. We host hands-on workshops, annual hackathons, and collaborative project building sessions.
                </p>
              </section>

              <section className="about-us-section">
                <h2 className="about-us-section-title">What We Do</h2>
                <div className="about-us-features">
                  <div className="about-us-feature">
                    <div className="about-us-feature-icon">🎓</div>
                    <h3 className="about-us-feature-title">Workshops</h3>
                    <p className="about-us-feature-text">
                      Hands-on learning sessions where members explore cutting-edge AI tools and techniques in a supportive environment.
                    </p>
                  </div>
                  <div className="about-us-feature">
                    <div className="about-us-feature-icon">🚀</div>
                    <h3 className="about-us-feature-title">Hackathons</h3>
                    <p className="about-us-feature-text">
                      Annual events that bring together students to build innovative AI projects, network, and showcase their creativity.
                    </p>
                  </div>
                  <div className="about-us-feature">
                    <div className="about-us-feature-icon">🤝</div>
                    <h3 className="about-us-feature-title">Collaboration</h3>
                    <p className="about-us-feature-text">
                      Project building sessions where members work together to solve real-world problems using AI technologies.
                    </p>
                  </div>
                </div>
              </section>

              <section className="about-us-section">
                <h2 className="about-us-section-title">Our Values</h2>
                <div className="about-us-values">
                  <div className="about-us-value">
                    <h3 className="about-us-value-title">Accessibility</h3>
                    <p className="about-us-value-text">
                      We believe AI should be accessible to everyone, regardless of prior experience or technical background.
                    </p>
                  </div>
                  <div className="about-us-value">
                    <h3 className="about-us-value-title">Innovation</h3>
                    <p className="about-us-value-text">
                      We foster a culture of experimentation and creative problem-solving with emerging technologies.
                    </p>
                  </div>
                  <div className="about-us-value">
                    <h3 className="about-us-value-title">Community</h3>
                    <p className="about-us-value-text">
                      We build strong connections between students passionate about AI and technology.
                    </p>
                  </div>
                </div>
              </section>
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

