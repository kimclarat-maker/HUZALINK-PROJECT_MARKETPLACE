import { useState } from 'react';
import './HuzalinkMarketplace.css';
import { PRODUCTS, SunIcon, MoonIcon, ArrowRightIcon } from './HuzalinkMarketplace';

const DEPLOYMENT_PLANS = [
  {
    step: 'On-Premise',
    h: 'Runs inside your infrastructure',
    p: 'Deployed and hosted within your own servers or data center, with full data residency and control — typical for government and public-safety products.',
  },
  {
    step: 'SaaS',
    h: 'Hosted and managed for you',
    p: 'We host and maintain the product; you get an account and start using it immediately, with updates and support handled on our side.',
  },
  {
    step: 'Government Portal',
    h: 'Integrated with public infrastructure',
    p: 'Configured to connect with existing government systems and citizen-facing services, deployed under the relevant institution.',
  },
];

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

      {/* PAGE HEADER */}
      <section className="products" style={{ paddingTop: '160px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div className="sec-top">
            <div>
              <span className="sec-eyebrow">Licensing</span>
              <h2 className="sec-h">
                {matched ? (
                  <>Get access to<br />{matched.title}</>
                ) : (
                  <>Get access to<br />a Huzalabs product</>
                )}
              </h2>
            </div>
            <p className="sec-note">
              {matched
                ? matched.desc
                : 'Tell us which product you need and how you plan to deploy it. Our team sets up licensing, onboarding, and support.'}
            </p>
          </div>

          {matched && (
            <div className="pgrid" style={{ gridTemplateColumns: '1fr', marginBottom: '8px' }}>
              <div className="pcard" style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '640px' }}>
                <div className="pcard-body" style={{ flexDirection: 'row', alignItems: 'center', gap: '20px', padding: '24px 28px' }}>
                  <div style={{ flex: 1 }}>
                    <span className="ptag">{matched.tag}</span>
                    <h3 className="ptitle">{matched.title}</h3>
                    <p className="pdesc" style={{ marginBottom: '8px' }}>{matched.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS */}
      <section className="how">
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div className="sec-top" style={{ marginBottom: '32px' }}>
            <div>
              <span className="sec-eyebrow">Deployment Options</span>
              <h2 className="sec-h">Licensed the way you need it.</h2>
            </div>
          </div>
          <div className="how-grid">
            {DEPLOYMENT_PLANS.map((d) => (
              <div className="how-item" key={d.step}>
                <div className="how-step">{d.step}</div>
                <div className="how-h">{d.h}</div>
                <p className="how-p">{d.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <span className="sec-eyebrow">Start Licensing</span>
          <h2>Ready to get<br /><em>set up?</em></h2>
          <p>
            {matched
              ? `Reach out and we'll walk you through licensing and deploying ${matched.title}.`
              : "Reach out and our team will confirm the right product and deployment model for you."}
          </p>
          <a href={mailHref} className="btn btn-green">Start a Conversation &rarr;</a>
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
