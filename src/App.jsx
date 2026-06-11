import { useState, useEffect } from 'react';

// Reusable Image Comparison Slider Component
function ImageCompare({ before, after, alt, beforeLabel = "Before", afterLabel = "After" }) {
  const [pos, setPos] = useState(50);
  
  return (
    <div className="image-compare" style={{ '--compare-pos': `${pos}%` }}>
      <input
        type="range"
        min="2"
        max="98"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="image-compare-range"
        aria-label={`${alt} slider`}
      />
      <div className="image-compare-after">
        <img src={after} className="image-compare-img" alt={`${alt} - After`} />
      </div>
      <div className="image-compare-before">
        <img src={before} className="image-compare-img" alt={`${alt} - Before`} />
      </div>
      <div className="image-compare-handle">
        <div className="image-compare-handle-line"></div>
        <div className="image-compare-handle-circle">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="image-compare-arrow-icon">
            <path d="M5 4L2 8L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M11 4L14 8L11 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
      <div className="image-compare-label image-compare-label-before">{beforeLabel}</div>
      <div className="image-compare-label image-compare-label-after">{afterLabel}</div>
    </div>
  );
}

// Reusable Phone Frame Mockup Component
function PhoneMockup({ children }) {
  return (
    <div className="phone-mockup">
      <div className="phone-screen">
        {children}
      </div>
      <img
        src="/iphone-bezel.png"
        className="phone-bezel-overlay"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}

// Header Navigation Component
function Header({ view, onNavigate, mobileMenuOpen, setMobileMenuOpen }) {
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (view !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky-header">
      <div className="nav-wrapper">
        <a href="#" className="brand-link" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <img src="/app-icon.png" alt="Sneakyguy AI logo" className="brand-icon" />
          <span>Sneakyguy AI</span>
        </a>
        
        <nav className="nav-links">
          <li><a href="#features" onClick={(e) => handleAnchorClick(e, 'features')} className="nav-link">Features</a></li>
          <li><a href="#how-it-works" onClick={(e) => handleAnchorClick(e, 'how-it-works')} className="nav-link">How It Works</a></li>
          <li><a href="#download" onClick={(e) => handleAnchorClick(e, 'download')} className="nav-link">Pricing</a></li>
          <li><a href="mailto:sneakyguysaas@gmail.com" className="nav-link">Support</a></li>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a href="#download" onClick={(e) => handleAnchorClick(e, 'download')} className="header-cta">Get the App</a>
          <button 
            type="button" 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu">
          <a href="#features" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, 'features')}>Features</a>
          <a href="#how-it-works" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, 'how-it-works')}>How It Works</a>
          <a href="#download" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, 'download')}>Pricing</a>
          <a href="mailto:sneakyguysaas@gmail.com" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Support</a>
          <a href="#download" className="mobile-nav-cta" onClick={(e) => handleAnchorClick(e, 'download')}>Get the App</a>
        </div>
      )}
    </header>
  );
}

// Deck of Cards Slideshow Component
function CardDeckSlideshow({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="card-deck-container">
      {images.map((src, index) => {
        // Calculate relative position (0 is active, 1 is next, etc.)
        // Handle wrapping around the end of the array
        let relativeIndex = (index - activeIndex + images.length) % images.length;
        
        let positionClass = 'card-hidden';
        if (relativeIndex === 0) positionClass = 'card-active';
        else if (relativeIndex === 1) positionClass = 'card-next-1';
        else if (relativeIndex === 2) positionClass = 'card-next-2';
        // The card that just swiped away
        else if (relativeIndex === images.length - 1) positionClass = 'card-exit';

        return (
          <img
            key={src}
            src={src}
            className={`deck-card ${positionClass}`}
            alt="AI Transformation Variation"
          />
        );
      })}
    </div>
  );
}

// Landing Page View Component
function HomeView() {
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">Photo editing, as easy as texting.</h1>
            <p className="hero-subtitle">Just upload a picture and type what you want to change. Get stunning, photorealistic results instantly.</p>
            
            <div className="download-actions-row">
              <a href="#download" onClick={(e) => handleAnchorClick(e, 'download')} className="app-store-badge-link" aria-label="Download on the App Store">
                <img src="/download-black.svg" alt="Download Sneakyguy AI on the App Store" className="app-store-badge-img" />
              </a>
              <span className="platform-notes">Android coming soon</span>
            </div>
          </div>

          <div className="hero-mockup-wrapper">
            <PhoneMockup>
              <CardDeckSlideshow 
                images={[
                  "/card-1.jpg",
                  "/card-2.png",
                  "/card-3.png",
                  "/card-4.png",
                  "/card-5.png",
                  "/card-6.png",
                  "/card-7.png",
                  "/card-8.png"
                ]} 
              />
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <p className="section-tag">How it works</p>
        <h2 className="section-title">Three steps. No learning curve.</h2>
        
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <h3 className="step-title">Upload any photo</h3>
            <p className="step-desc">Selfie, product shot, room photo. Whatever you've got.</p>
          </div>
          <div className="step-card">
            <span className="step-number">02</span>
            <h3 className="step-title">Describe the change</h3>
            <p className="step-desc">Type what you want. New outfit, different hair, better background.</p>
          </div>
          <div className="step-card">
            <span className="step-number">03</span>
            <h3 className="step-title">Get your result</h3>
            <p className="step-desc">AI handles masking, lighting, and blending. Download and post.</p>
          </div>
        </div>
      </section>

      {/* Features Slider Section */}
      <section id="features" className="features-section">
        <div className="features-wrapper">
          <p className="section-tag">What you can do</p>
          <h2 className="section-title">One app. Endless transformations.</h2>
          
          <div className="features-list">
            {/* Feature 1: Outfit Swap */}
            <div className="feature-item" id="outfitSwap">
              <div className="feature-mockup-container">
                <PhoneMockup>
                  <ImageCompare 
                    before="/feature-outfit-before.jpg" 
                    after="/feature-outfit-after.jpg" 
                    alt="Change your outfit" 
                  />
                </PhoneMockup>
              </div>
              <div className="feature-info">
                <h3 className="feature-title">Change your outfit</h3>
                <p className="feature-description">Try on anything without leaving your couch. Same you, completely new look.</p>
              </div>
            </div>

            {/* Feature 2: Hair Style */}
            <div className="feature-item" id="hairChange">
              <div className="feature-mockup-container">
                <PhoneMockup>
                  <ImageCompare 
                    before="/feature-hair-before.jpg" 
                    after="/feature-hair-after.jpg" 
                    alt="New hair, same you" 
                  />
                </PhoneMockup>
              </div>
              <div className="feature-info">
                <h3 className="feature-title">New hair, same you</h3>
                <p className="feature-description">Test drive a new style before you commit. No appointment needed.</p>
              </div>
            </div>

            {/* Feature 3: Space Redesign */}
            <div className="feature-item" id="spaceRedesign">
              <div className="feature-mockup-container">
                <PhoneMockup>
                  <ImageCompare 
                    before="/feature-room-before.jpg" 
                    after="/feature-room-after.jpg" 
                    alt="Redesign any space" 
                  />
                </PhoneMockup>
              </div>
              <div className="feature-info">
                <h3 className="feature-title">Redesign any space</h3>
                <p className="feature-description">See your room with new furniture, colors, or layouts. Instant.</p>
              </div>
            </div>

            {/* Feature 4: AI Headshots */}
            <div className="feature-item" id="aiHeadshots">
              <div className="feature-mockup-container">
                <PhoneMockup>
                  <ImageCompare 
                    before="/feature-headshot-before.jpg" 
                    after="/feature-headshot-after.jpg" 
                    alt="AI headshots" 
                  />
                </PhoneMockup>
              </div>
              <div className="feature-info">
                <h3 className="feature-title">AI headshots</h3>
                <p className="feature-description">Turn any selfie into a professional headshot. Studio quality, no studio.</p>
              </div>
            </div>

            {/* Feature 5: Restore Old Photos */}
            <div className="feature-item" id="photoRestore">
              <div className="feature-mockup-container">
                <PhoneMockup>
                  <ImageCompare 
                    before="/feature-restore-before.jpg" 
                    after="/feature-restore-after.jpg" 
                    alt="Restore old photos" 
                  />
                </PhoneMockup>
              </div>
              <div className="feature-info">
                <h3 className="feature-title">Restore old photos</h3>
                <p className="feature-description">Fix scratches, fading, and damage. Bring old memories back to life.</p>
              </div>
            </div>

            {/* Feature 6: Clean Up Backgrounds */}
            <div className="feature-item" id="backgroundEditor">
              <div className="feature-mockup-container">
                <PhoneMockup>
                  <ImageCompare 
                    before="/feature-bg-before.jpg" 
                    after="/feature-bg-after.jpg" 
                    alt="Clean up backgrounds" 
                  />
                </PhoneMockup>
              </div>
              <div className="feature-info">
                <h3 className="feature-title">Clean up backgrounds</h3>
                <p className="feature-description">Remove people, objects, or distractions. Keep the subject, lose the mess.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Download Banner */}
      <section id="download" className="cta-section">
        <div className="cta-wrapper">
          <h2 className="cta-title">Ready to try it?</h2>
          <p className="cta-subtitle">Download Sneakyguy AI and transform your first photo in under a minute.</p>
          
          <div className="cta-actions">
            <a href="#download" onClick={(e) => handleAnchorClick(e, 'download')} className="app-store-badge-link" aria-label="Download on the App Store">
              <img src="/download-white.svg" alt="Download Sneakyguy AI on the App Store" className="app-store-badge-img" />
            </a>
            <span className="platform-notes" style={{ color: 'rgba(255,255,255,0.8)' }}>Android coming soon</span>
          </div>
          
          <p className="cta-notes">Free to start. No account required.</p>
        </div>
      </section>
    </>
  );
}

// Branded Privacy Policy Component
function PrivacyPolicy() {
  return (
    <article className="legal-page">
      <header className="legal-header">
        <p className="legal-updated">Last updated: June 4, 2026</p>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-subtitle">This Privacy Policy details how Sneakyguy AI collects, uses, and safeguards your personal data when using our photo editing tools.</p>
      </header>
      <div className="legal-content">
        <p>At Sneakyguy AI, we value your privacy and trust. We design and run our AI photo editor services with privacy at the core. This document outlines the types of information we process and your rights concerning your personal data.</p>
        <p>If you disagree with this Privacy Policy, please discontinue using our App or services.</p>
        
        <h2>1. Information We Collect</h2>
        
        <h3>1.1 Account & Profile Data</h3>
        <p>When creating or configuring an account on Sneakyguy AI, we collect email addresses, name details, and login credentials. If you authenticate through external platforms (like Apple or Google), we receive standard public profile identifiers authorized by those providers.</p>
        
        <h3>1.2 Media & Creative Inputs</h3>
        <p>To perform AI transformations, we process photos, prompts, and instructions you submit to the app. We retain these files in secure storage to make editing, history retrieval, and workspace organization available to you.</p>
        
        <h3>1.3 Technical & Device Usage Logs</h3>
        <p>We automatically log device information, operating system versions, IP addresses, app crashes, and usage interaction events when you use Sneakyguy AI. This details performance metrics and helps troubleshoot problems.</p>
        
        <h2>2. How We Use Information</h2>
        <p>Your data is processed to:</p>
        <ul>
          <li>Deploy, personalize, and keep our services secure.</li>
          <li>Run AI processes that transform your reference photos and return edited results.</li>
          <li>Handle subcription models, renewals, and payments.</li>
          <li>Communicate system updates, support responses, and security alerts.</li>
          <li>Safeguard the platform against fraud, security risks, or unauthorized actions.</li>
        </ul>
        <p>We do not train our generative models on your personal uploaded pictures without your explicit permission.</p>
        
        <h2>3. Data Sharing and Transfers</h2>
        <p>We do not sell your personal data. We only share information with trusted third-party providers (such as secure cloud servers, analytic platforms, and payment gateways) strictly necessary to run the app. These service providers are bound to safeguard your data and cannot use it for other purposes.</p>
        <p>We may share minimal data if required by legal authorities to comply with applicable laws, safety standards, or regulations.</p>
        
        <h2>4. Data Retention and Erasure</h2>
        <p>We retain personal information as long as your account is active or needed to provide you with services. When information is no longer needed, we safely delete or anonymize it. You can request full deletion of your account and files at any time by contacting us at <strong>sneakyguysaas@gmail.com</strong>.</p>
        
        <h2>5. Your Choices & Privacy Rights</h2>
        <p>Depending on your country or state (such as the GDPR in Europe or CCPA in California), you may hold rights to access, download, correct, or delete personal data. To exercise these rights, send a request to <strong>sneakyguysaas@gmail.com</strong>.</p>
        
        <h2>6. Updates to This Policy</h2>
        <p>We may modify this Privacy Policy from time to time to align with legal updates or new product features. If we make major edits, we will display an update notice inside the app. Continued use of our service after changes go live constitutes acceptance of the new terms.</p>
        
        <h2>7. Contact Us</h2>
        <p>If you have any questions about our privacy practices, please contact us at:</p>
        <p><strong>Sneakyguy AI Support Team</strong><br/>Email: <strong>sneakyguysaas@gmail.com</strong></p>
      </div>
    </article>
  );
}

// Branded Terms of Service Component
function TermsOfService() {
  return (
    <article className="legal-page">
      <header className="legal-header">
        <p className="legal-updated">Last updated: June 4, 2026</p>
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-subtitle">These Terms of Service govern your access to and use of the Sneakyguy AI photo editing app and services.</p>
      </header>
      <div className="legal-content">
        <h2>1. Agreement to Terms</h2>
        <p>By downloading, installing, or using Sneakyguy AI, you agree to be bound by these Terms of Service. If you do not agree, please do not use the app.</p>
        
        <h2>2. Eligibility and Account</h2>
        <p>You must be at least 13 years of age (or the legal minimum in your jurisdiction) to use our services. You are responsible for keeping your credentials secure and are liable for all actions taken under your account.</p>
        
        <h2>3. Services & AI Output Generation</h2>
        <p>Sneakyguy AI provides machine learning photo editing tools. To use the app, you upload photographs ("Inputs") and describe edits to generate modified versions ("Outputs").</p>
        
        <h3>3.1 Content Rights</h3>
        <p>You retain all intellectual property ownership of the Inputs you upload. Sneakyguy AI does not claim ownership of your photographs. We grant you a full, worldwide, royalty-free, transferable license to use, download, copy, share, and commercialize all generated Outputs, provided you comply with these Terms.</p>
        
        <h3>3.2 Quality and Accuracy</h3>
        <p>AI-generated media can sometimes contain artifacts, inaccuracies, or unexpected results. We provide our services on an "as is" and "as available" basis without warranties of any kind regarding accuracy or quality.</p>
        
        <h2>4. Subscriptions, Payments & Cancellations</h2>
        <p>Sneakyguy AI offers subscriptions and purchases. All transactions, billing cycles, renewals, and cancellations are handled securely through the Apple App Store billing system. Subscriptions renew automatically unless turned off in your iTunes account settings at least 24 hours before the current period ends.</p>
        <p>Refunds are governed by Apple's subscription policies. To request a refund, please contact Apple support directly.</p>
        
        <h2>5. Acceptable Conduct & Prohibited Content</h2>
        <p>You agree not to use the app to upload, generate, or share any content that:</p>
        <ul>
          <li>Is illegal, hateful, harassing, defamatory, or promotes violence.</li>
          <li>Infringes on copyrights, trademarks, or personal privacy of any third party.</li>
          <li>Attempts to spoof, extract, or reverse-engineer our machine learning models.</li>
          <li>Simulates explicit sexual material or creates non-consensual modifications of people.</li>
        </ul>
        <p>We reserve the right to suspend or block accounts that violate these rules.</p>
        
        <h2>6. Disclaimers & Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, Sneakyguy AI, its creators, and affiliates will not be liable for any indirect, special, incidental, or consequential damages arising out of your use or inability to use the app, including loss of data or business interruptions.</p>
        
        <h2>7. Governing Law</h2>
        <p>These terms are governed by and construed in accordance with the laws of the State of California and the United States of America, without regard to conflict of law principles.</p>
        
        <h2>8. Contact Information</h2>
        <p>For any legal inquiries, support requests, or questions regarding these terms, please contact us at <strong>sneakyguysaas@gmail.com</strong>.</p>
      </div>
    </article>
  );
}

// Footer Component
function Footer({ onNavigate }) {
  const handleLogoClick = (e) => {
    e.preventDefault();
    onNavigate('home');
  };

  const handleLinkClick = (e, viewName) => {
    e.preventDefault();
    onNavigate(viewName);
  };

  return (
    <footer className="site-footer">
      <div className="footer-wrapper">
        <div className="footer-columns">
          
          {/* Logo/Info Col */}
          <div className="footer-brand-column">
            <a href="#" className="footer-logo-row" onClick={handleLogoClick}>
              <img src="/app-icon.png" alt="Sneakyguy AI logo" className="brand-icon" />
              <span>Sneakyguy AI</span>
            </a>
            <p className="footer-tagline">Transform any photo in seconds using advanced artificial intelligence.</p>
            
            <div className="footer-social-row">
              <a href="https://x.com/prthpdev" target="_blank" rel="noreferrer" className="social-link-btn" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Link Column */}
          <div>
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-links-list">
              <li><a href="#privacy" className="footer-link" onClick={(e) => handleLinkClick(e, 'privacy')}>Privacy Policy</a></li>
              <li><a href="#terms" className="footer-link" onClick={(e) => handleLinkClick(e, 'terms')}>Terms of Service</a></li>
              <li><a href="mailto:sneakyguysaas@gmail.com" className="footer-link">Contact Us</a></li>
            </ul>
          </div>

          {/* Resources Link Column */}
          <div>
            <h4 className="footer-column-title">Resources</h4>
            <ul className="footer-links-list">
              <li><a href="#" className="footer-link" onClick={handleLogoClick}>Home</a></li>
              <li><a href="mailto:sneakyguysaas@gmail.com" className="footer-link">Help Center</a></li>
              <li><a href="mailto:sneakyguysaas@gmail.com" className="footer-link">Support Desk</a></li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <p className="copyright-text">© 2026 Sneakyguy AI. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy" className="footer-bottom-link" onClick={(e) => handleLinkClick(e, 'privacy')}>Privacy Policy</a>
            <a href="#terms" className="footer-bottom-link" onClick={(e) => handleLinkClick(e, 'terms')}>Terms of Service</a>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--muted-foreground)', cursor: 'pointer' }}>
              <span>English (US)</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [view, setView] = useState(() => {
    const path = window.location.pathname;
    if (path === '/privacy') return 'privacy';
    if (path === '/terms') return 'terms';
    return 'home';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/privacy') setView('privacy');
      else if (path === '/terms') setView('terms');
      else setView('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newView) => {
    setView(newView);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const newPath = newView === 'home' ? '/' : `/${newView}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  return (
    <div className="app-container">
      {/* Sticky Header Nav */}
      <Header 
        view={view} 
        onNavigate={navigateTo} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      <main className="main-content">
        {view === 'home' && <HomeView />}
        {view === 'privacy' && <PrivacyPolicy />}
        {view === 'terms' && <TermsOfService />}
      </main>

      {/* Footer Section */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
