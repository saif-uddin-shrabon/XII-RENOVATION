"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// Project Data
const projects = [
  {
    id: 1,
    title: "Premium Condominium Living Room",
    category: "Living Room",
    image: "/assets/hero_living_room.png",
    description: "Features customized warm oak cabinetry, marble feature wall, and architectural cove lighting."
  },
  {
    id: 2,
    title: "Bespoke Marble Kitchen Island",
    category: "Kitchen",
    image: "/assets/premium_kitchen.png",
    description: "Luxury custom kitchen with integrated appliances, gold accents, and a marble island."
  },
  {
    id: 3,
    title: "Luxury Glass Walk-In Wardrobe",
    category: "Wardrobe",
    image: "/assets/luxury_wardrobe.png",
    description: "Elegant glass-front wardrobes with vertical LED strip lights and custom vanity table."
  },
  {
    id: 4,
    title: "Refined Corporate Office Lobby",
    category: "Commercial",
    image: "/assets/refined_office.png",
    description: "Optimized corporate layout featuring floor-to-ceiling glass and teak wood paneling."
  }
];

// Services Data
const services = [
  {
    title: "Architectural Interior Design",
    description: "Detailed spatial planning and layout optimization to create aesthetic, premium concepts that reflect your unique personality.",
    features: ["Spatial Planning & Optimization", "2D Layout & 3D Visualization", "Material & Lighting Selection"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  },
  {
    title: "Design & Build Management",
    description: "End-to-end execution where we take full accountability of budget, timelines, site supervision, and building authority submissions.",
    features: ["End-to-End Project Execution", "Timeline & Budget Control", "Authority & MCST Submissions"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: "Bespoke Custom Joinery",
    description: "Tailored built-in furniture crafted specifically to your space. Say goodbye to off-the-shelf design compromises.",
    features: ["Custom Kitchens & Island Cabinets", "Luxury Walk-In Wardrobes", "Bespoke Feature Walls & Storage"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.242.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.242.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "Premium Construction & Fit-Out",
    description: "Flawless on-site craftsmanship carrying out demolition, masonry, wet works, screeding, tiling, and structural partitions.",
    features: ["Demolition & Masonry Works", "Tiling & Screeding Mastery", "Waterproofing & Partition Ceilings"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    title: "Licensed MEP & Compliant Works",
    description: "Safe, legal, and regulation-compliant mechanical, electrical, and plumbing engineering backed by certified testing.",
    features: ["Certified Electrical & Lighting Systems", "Licensed Plumbing Execution", "Singapore Building Code Adherence"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Aftercare & Finishes Support",
    description: "Our partnership continues long after project handover. We provide complete final cleaning, inspection, and aftercare.",
    features: ["Professional Cleaning & Handover", "Comprehensive Final Inspection", "Reliable Post-Completion Support"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "Condominium",
    message: ""
  });

  // Handle scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter projects
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Handle Form Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "Condominium",
        message: ""
      });
    }, 800);
  };

  return (
    <div className={styles.main}>
      {/* Navigation Header */}
      <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
        <div className={styles.navbarContainer}>
          <a href="#" className={styles.logoArea}>
            <Image 
              src="/logo.jpg" 
              alt="XIII Renovation & Design Logo" 
              width={40} 
              height={40} 
              className={styles.logoImage}
            />
            <div className={styles.logoText}>
              <span className={styles.logoTextMain}>XIII</span>
              <span className={styles.logoTextSub}>Renovation & Design</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav>
            <ul className={styles.navMenu}>
              <li className={styles.navItem}><a href="#about">About</a></li>
              <li className={styles.navItem}><a href="#services">Services</a></li>
              <li className={styles.navItem}><a href="#portfolio">Portfolio</a></li>
              <li className={styles.navItem}><a href="#why-us">Why Us</a></li>
              <li className={styles.navItem}><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          <a href="#contact" className={styles.ctaButtonNav}>Get Consultation</a>

          {/* Mobile Menu Button */}
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image 
            src="/assets/hero_living_room.png" 
            alt="Luxury Interior Living Room Singapore" 
            fill 
            priority
            style={{ objectFit: "cover" }}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={styles.heroContent}>
          <span className={`${styles.heroSubtitle} animate-fade-in`}>Where Vision Meets Craftsmanship</span>
          <h1 className={`${styles.heroTitle} animate-slide-up`}>
            Crafting Premium <br />
            <span className="gold-text-gradient font-semibold">Refined Spaces</span>
          </h1>
          <p className={styles.heroDescription}>
            We design and build bespoke high-end interiors across Singapore. From custom carpentry to full architectural renovations, we bring accountability, detail, and luxury to your space.
          </p>
          <div className={styles.heroCtaGroup}>
            <a href="#portfolio" className={styles.primaryBtn}>View Portfolio</a>
            <a href="#contact" className={styles.secondaryBtn}>Start Your Journey</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutTextContent}>
              <span className={styles.sectionTag}>Heritage & Mission</span>
              <h2 className={styles.sectionTitle}>Transforming Spaces, Refining Lifestyles</h2>
              <p className={styles.aboutHighlight}>
                Established through word-of-mouth excellence, XIII Renovation & Design balances sophisticated beauty, utility, and durability under one roof.
              </p>
              <p>
                Based in Sengkang and serving clients island-wide across Singapore, we focus on delivering a transparent, stress-free renovation experience. By taking complete accountability and eliminating outsourcing on critical phases, we deliver projects from concept to final handover with meticulous precision.
              </p>
              
              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>2+</span>
                  <span className={styles.statLabel}>Years Active</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>100%</span>
                  <span className={styles.statLabel}>Accountable</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>53485510E</span>
                  <span className={styles.statLabel}>UEN Registered</span>
                </div>
              </div>
            </div>
            
            <div className={styles.aboutVisual}>
              <Image 
                src="/assets/luxury_wardrobe.png" 
                alt="Luxury Walk-In Wardrobe Custom Joinery" 
                fill 
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Expertise</span>
            <h2 className={styles.sectionTitle}>Bespoke Design & Build Services</h2>
            <p className={styles.sectionSubtitle}>
              From structural fit-outs to the finest custom joinery detail, we execute projects with precision.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Curated Work</span>
            <h2 className={styles.sectionTitle}>Signature Interior Projects</h2>
            <p className={styles.sectionSubtitle}>
              Explore our portfolio of premium residential, kitchen, and corporate spaces.
            </p>
          </div>

          {/* Filters */}
          <div className={styles.portfolioFilters}>
            {["All", "Living Room", "Kitchen", "Wardrobe", "Commercial"].map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.filterBtnActive : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={styles.portfolioGrid}>
            {filteredProjects.map((project) => (
              <div key={project.id} className={styles.portfolioItem}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className={styles.portfolioImage}
                />
                <div className={styles.portfolioInfo}>
                  <span className={styles.portfolioCategory}>{project.category}</span>
                  <h3 className={styles.portfolioTitle}>{project.title}</h3>
                  <p className={styles.portfolioDesc}>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section id="why-us" className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Why XIII</span>
            <h2 className={styles.sectionTitle}>The Craftsmanship Standards</h2>
            <p className={styles.sectionSubtitle}>
              We eliminate common industry anxieties by holding ourselves to rigorous, reliable execution structures.
            </p>
          </div>

          <div className={styles.diffGrid}>
            <div className={styles.diffCard}>
              <div className={styles.diffNum}>01</div>
              <h3 className={styles.diffTitle}>End-to-End Accountability</h3>
              <p className={styles.diffDesc}>
                Unlike firms that outsource critical phases, we manage the design, build, carpentry, and finishing under one roof. This guarantees quality consistency.
              </p>
            </div>
            <div className={styles.diffCard}>
              <div className={styles.diffNum}>02</div>
              <h3 className={styles.diffTitle}>Transparent Real-Time Tracking</h3>
              <p className={styles.diffDesc}>
                From photorealistic 3D visualisations before hacking begins, to transparent budget trackers, we eliminate "renovation anxiety" completely.
              </p>
            </div>
            <div className={styles.diffCard}>
              <div className={styles.diffNum}>03</div>
              <h3 className={styles.diffTitle}>Discerning Client Focus</h3>
              <p className={styles.diffDesc}>
                We specialise in serving clients who value architectural longevity, detailed planning, and premium materials over temporary, short-lived trends.
              </p>
            </div>
            <div className={styles.diffCard}>
              <div className={styles.diffNum}>04</div>
              <h3 className={styles.diffTitle}>Regulatory Compliance</h3>
              <p className={styles.diffDesc}>
                Full management of HDB, Condo MCST, and commercial authority approvals, licensed MEP engineering tests, and strict adherence to Singapore regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.contactGrid}>
            {/* Info Column */}
            <div className={styles.contactInfoArea}>
              <div>
                <span className={styles.sectionTag}>Contact</span>
                <h2 className={styles.sectionTitle}>Begin Your Bespoke Journey</h2>
                <p className={styles.contactIntro}>
                  Have an upcoming residential or commercial space? Fill out the form, or reach out to us directly through our verified business channels.
                </p>
              </div>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <svg className={`${styles.contactIcon} w-6 h-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h4 className={styles.contactLabel}>Registered Address</h4>
                    <p className={styles.contactValue}>
                      304A Anchorvale Link, #06-150,<br />
                      Singapore 541304
                    </p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <svg className={`${styles.contactIcon} w-6 h-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h4 className={styles.contactLabel}>Call / WhatsApp</h4>
                    <p className={styles.contactValue}>
                      <a href="tel:+6587231313">+65 8723 1313</a>
                    </p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <svg className={`${styles.contactIcon} w-6 h-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h4 className={styles.contactLabel}>Enquiries / Sales Email</h4>
                    <p className={styles.contactValue}>
                      <a href="mailto:sales.xiii.reno@gmail.com">sales.xiii.reno@gmail.com</a><br />
                      <a href="mailto:arjuna.xiii.reno@gmail.com">arjuna.xiii.reno@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className={styles.contactLabel} style={{ marginBottom: "0.75rem" }}>Follow Our Official Launch</h4>
                <div className={styles.socialRow}>
                  <a href="https://www.facebook.com/XIIIRND" target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Facebook Page">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/xiii_renovation_design/" target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Instagram Profile">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className={styles.formArea}>
              <h3 className={styles.formTitle}>Book a Design Consultation</h3>
              
              {formSubmitted ? (
                <div className={styles.successMessage}>
                  <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Thank you for your interest!</p>
                  <p>Your design request has been received. Our team will contact you within 24–48 hours.</p>
                </div>
              ) : (
                <form className={styles.contactForm} onSubmit={handleFormSubmit}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className={styles.formInput} 
                      placeholder="e.g. Johnathan Tan"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className={styles.formInput} 
                      placeholder="e.g. johnathan@example.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="phone">Phone Number (WhatsApp)</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className={styles.formInput} 
                      placeholder="e.g. +65 9123 4567"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="propertyType">Property Type</label>
                    <select 
                      id="propertyType" 
                      name="propertyType" 
                      value={formData.propertyType} 
                      onChange={handleInputChange} 
                      className={styles.formInput}
                    >
                      <option value="HDB Flat">HDB Flat</option>
                      <option value="Condominium">Condominium</option>
                      <option value="Landed Property">Landed Property</option>
                      <option value="Commercial Space">Commercial Space</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="message">Project Description & Scope</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      required 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      className={styles.formInput} 
                      placeholder="Briefly describe your space, timeline, and layout expectations..."
                    />
                  </div>

                  <button type="submit" className={styles.formSubmitBtn}>Request Callback</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerAbout}>
            <a href="#" className={styles.logoArea}>
              <Image 
                src="/logo.jpg" 
                alt="XIII Renovation & Design Logo" 
                width={36} 
                height={36} 
                className={styles.logoImage}
              />
              <div className={styles.logoText}>
                <span className={styles.logoTextMain}>XIII</span>
                <span className={styles.logoTextSub}>Renovation & Design</span>
              </div>
            </a>
            <p className={styles.footerAboutDesc}>
              Transforming spaces into premium, functional, and structurally compliant environments. Crafting luxury interiors tailored to your personality.
            </p>
            <span className={styles.footerUen}>UEN Registration: 53485510E</span>
          </div>

          <div>
            <h4 className={styles.footerLinksTitle}>Quick Navigation</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#about">About Our Heritage</a></li>
              <li><a href="#services">Our Design Services</a></li>
              <li><a href="#portfolio">Bespoke Portfolio</a></li>
              <li><a href="#why-us">Why Partner With Us</a></li>
              <li><a href="#contact">Book Consultation</a></li>
            </ul>
          </div>

          <div className={styles.footerContact}>
            <h4 className={styles.footerLinksTitle}>Headquarters</h4>
            <p className={styles.footerContactText}>
              304A Anchorvale Link, #06-150,<br />
              Singapore 541304
            </p>
            <p className={styles.footerContactText}>
              Phone: +65 8723 1313<br />
              Email: sales.xiii.reno@gmail.com
            </p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} XIII Renovation & Design. All rights reserved.
          </p>
          <div className={styles.footerLegalLinks}>
            <a href="https://www.facebook.com/XIIIRND" target="_blank" rel="noopener noreferrer">Facebook Page</a>
            <a href="https://www.instagram.com/xiii_renovation_design/" target="_blank" rel="noopener noreferrer">Instagram Profile</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
