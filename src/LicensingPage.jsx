import { useState } from 'react';
import './HuzalinkMarketplace.css';
import { PRODUCTS, SunIcon, MoonIcon, ArrowRightIcon } from './HuzalinkMarketplace';

const DEPLOYMENT_OPTIONS = ['On-Premise', 'SaaS', 'Government Portal'];

export default function LicensingPage({ product, onNavigateHome }) {
  const [theme, setTheme] = useState('light');
  const logo = theme === 'dark' ? '/huzalabs-assets/Logo-white.png' : '/huzalabs-assets/Logo-black.png';
  const matched = product ? PRODUCTS.find((p) => p.title === product) : null;

  const mailSubject = encodeURIComponent(matched ? `Access request: ${matched.title}` : 'Access request');
  const mailHref = `mailto:info@huzalabs.com?subject=${mailSubject}`;

  const handleHome = (e) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    }
  };

  return (
    <div className="hz-marketplace" data-theme={theme}>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="logo" onClick={handleHome}>
            <img src={logo} alt="Huzalink" className="logo-img" />
          </a>
          <ul className="nav-links">
            <li><a href="https://huzalink.com/home">Home</a></li>
            <li><a href="/" onClick={handleHome}>Marketplace</a></li>
            <li><a href="/licensing" className="active">Licensing</a></li>
            <li><a href="https://huzalink.com/home#faqs">FAQs</a></li>
            <li><a href="https://huzalink.com/home#contact">Contact</a></li>
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              className="theme-toggle"
              aria-label="Toggle light and dark mode"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="https://huzalink.com/auth/login" className="btn btn-green">
              Login <ArrowRightIcon />
            </a>
          </div>
        </div>
      </nav>

      {/* LICENSING CARD */}
      <section className="license-hero">
        <div className="license-card">
          <span className="sec-eyebrow">Licensing</span>
          <h1 className="license-h1">
            {matched ? `Get access to ${matched.title}` : 'Get access to a Huzalabs product'}
          </h1>
          <p className="license-sub">
            {matched ? matched.desc : "Tell us what you need — we'll handle licensing, onboarding, and deployment."}
          </p>
          <div className="license-options">
            {DEPLOYMENT_OPTIONS.map((o) => (
              <span className="license-chip" key={o}>{o}</span>
            ))}
          </div>
          <a href={mailHref} className="btn btn-green license-cta">Request Access &rarr;</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot">
          <a href="/" className="logo" onClick={handleHome}>
            <img src={logo} alt="Huzalink" className="logo-img" />
          </a>
          <p className="foot-copy">&copy; 2026 Huzalink Marketplace · Kigali, Rwanda</p>
          <div className="foot-links">
            <a href="https://huzalink.com" target="_blank" rel="noopener noreferrer">Huzalink</a>
            <a href="mailto:info@huzalabs.com">info@huzalabs.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
