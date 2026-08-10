import { useEffect, useMemo, useRef, useState } from 'react';
import './HuzalinkMarketplace.css';

export const PRODUCTS = [
  {
    url: 'lms.huzalabs.com',
    link: 'https://ncsa-lms.vercel.app/',
    img: '/huzalabs-assets/ncsa-lms-catalogue.png',
    alt: 'LMS',
    tag: 'EdTech · Cybersecurity',
    category: 'EdTech',
    deployment: 'On-Premise',
    status: 'Live',
    title: 'LMS (Learning Management System)',
    desc: 'A cybersecurity learning platform — career-path courses, live sandboxed labs, and in-browser virtual environments for building job-ready security skills.',
  },
  {
    url: 'emergency.huzalabs.com',
    img: '/huzalabs-assets/DispatcherDashboard.png',
    alt: 'Emergency Response',
    tag: 'Public Safety',
    category: 'Public Safety',
    deployment: 'On-Premise',
    status: 'Live',
    title: 'Emergency Response',
    desc: 'Real-time emergency dispatch — live incident tracking, dispatcher dashboard, and field unit coordination across active zones.',
  },
  {
    url: 'ivr.huzalabs.com',
    img: '/huzalabs-assets/IVR Landing Page.png',
    alt: 'IVR Platform',
    tag: 'Telecoms',
    category: 'Telecoms',
    deployment: 'SaaS',
    status: 'Live',
    title: 'IVR Platform',
    desc: 'Build and manage IVR call trees without technical overhead — a complete voice interaction platform for businesses of any size.',
  },
  {
    url: 'huzanetics.com',
    link: 'https://huzanetics.com/',
    img: '/huzalabs-assets/huzanetics-dashboard.png',
    alt: 'Huzanetics',
    tag: 'Intelligence · Security',
    category: 'Intelligence & Security',
    deployment: 'On-Premise',
    status: 'Live',
    title: 'Huzanetics',
    desc: 'Citizen mobility monitoring for national security and public health — counter-terrorism intelligence, contact tracing, and outbreak monitoring.',
  },
  {
    url: 'huzalx.com',
    iframeUrl: 'https://huzalx.com/',
    alt: 'Huzalx',
    tag: 'EdTech · Operations',
    category: 'EdTech',
    deployment: 'SaaS',
    status: 'Live',
    title: 'Huzalx',
    desc: 'A complete school management ecosystem — parent portals, attendance, school fees payment, academic records, and staff management in one platform.',
  },
  {
    url: 'services.mifotra.gov.rw',
    iframeUrl: 'https://psrp-redbranded.vercel.app/',
    alt: 'PSRP',
    tag: 'Government · Public Service',
    category: 'Government',
    deployment: 'Government Portal',
    status: 'Live',
    title: 'PSRP',
    desc: 'A public service portal for workforce records, recruitment, and public service management.',
  },
  {
    url: 'nss.uat.minijust.gov.rw',
    iframeUrl: 'https://nss.uat.minijust.gov.rw/',
    alt: 'eNotary and Stamping System',
    tag: 'Government · Legal Services',
    category: 'Government',
    deployment: 'Government Portal',
    status: 'Beta',
    title: 'eNotary and Stamping System',
    desc: 'A digital notarization and stamping platform — legalize, verify, and stamp official documents online, currently in UAT.',
  },
  {
    url: 'huza-mis.vercel.app',
    iframeUrl: 'https://huza-mis.vercel.app/',
    alt: 'MIS',
    tag: 'EdTech · Administration',
    category: 'EdTech',
    deployment: 'SaaS',
    status: 'Live',
    title: 'MIS (Management Information System)',
    desc: 'A management information system for institutions — centralizing records, reporting, and day-to-day administration in one platform.',
  },
  {
    url: 'pre-enrollment.sdid.nida.gov.rw',
    iframeUrl: 'https://pre-enrollment.sdid.nida.gov.rw/authentication/login',
    alt: 'SID Pre-Enrollment',
    tag: 'Government · Identity Services',
    category: 'Government',
    deployment: 'Government Portal',
    status: 'Live',
    title: 'SID Pre-Enrollment',
    desc: 'A pre-enrollment platform for national digital identity — schedule and prepare your enrollment online ahead of your appointment.',
  },
  {
    url: 'eservices.huzalabs.com',
    tag: 'Government · Public Services',
    category: 'Government',
    deployment: 'Government Portal',
    status: 'Live',
    title: 'e-Services',
    desc: 'A unified digital services portal — apply for permits, certificates, and government services online, all from a single citizen-facing platform.',
  },
  {
    url: 'cloud.huzalabs.com',
    iframeUrl: 'https://unified-datacenter-and-cloud-mngmt.vercel.app/',
    tag: 'Infrastructure · Cloud',
    category: 'Infrastructure',
    deployment: 'On-Premise',
    status: 'Live',
    title: 'Data Center & Cloud Management',
    desc: 'Centralized infrastructure management — provision, monitor, and scale servers, storage, and cloud resources from one control plane.',
  },
  {
    url: 'land.huzalabs.com',
    iframeUrl: 'https://huza-land-quu2bmuyh-huzalabs1.vercel.app/',
    tag: 'Government · Land Administration',
    category: 'Government',
    deployment: 'Government Portal',
    status: 'Live',
    title: 'Land Management System',
    desc: 'Digital land registry and administration — parcel mapping, ownership records, and transfer workflows for national land authorities.',
  },
  {
    url: 'logistics.huzalabs.com',
    tag: 'Logistics · Supply Chain',
    category: 'Logistics',
    deployment: 'SaaS',
    status: 'Live',
    title: 'e-Logistics',
    desc: 'End-to-end supply chain visibility — shipment tracking, fleet coordination, and warehouse management for goods on the move.',
  },
  {
    url: 'parliament.huzalabs.com',
    iframeUrl: 'https://e-parliament-lovat.vercel.app/',
    tag: 'Government · Legislative',
    category: 'Government',
    deployment: 'Government Portal',
    status: 'Beta',
    title: 'e-Parliament',
    desc: 'A digital legislative workspace — bill tracking, member voting, and session management for parliamentary bodies.',
  },
  {
    url: 'bloodbank.huzalabs.com',
    iframeUrl: 'https://bbms-lilac.vercel.app/',
    tag: 'Healthcare · Public Health',
    category: 'Healthcare',
    deployment: 'On-Premise',
    status: 'Live',
    title: 'Blood Bank Management System',
    desc: 'Donor and inventory management for blood banks — track stock levels, match donors, and coordinate cold-chain logistics.',
  },
];

const CATEGORIES = ['All Categories', ...new Set(PRODUCTS.map((p) => p.category))];
const DEPLOYMENTS = ['All Deployments', ...new Set(PRODUCTS.map((p) => p.deployment))];
const STATUSES = ['Any Status', ...new Set(PRODUCTS.map((p) => p.status))];

function BrowserDots() {
  return (
    <div className="ss-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18 8 4.5a1 1 0 0 1 0 1.74l-8 4.5a2 2 0 0 1-1.66 0l-8-4.5a1 1 0 0 1 0-1.74l8-4.5a2 2 0 0 1 1.66 0Z" />
      <path d="m4 12 8 4.5 8-4.5M4 17.5l8 4.5 8-4.5" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="7" rx="1.5" />
      <rect x="2" y="14" width="20" height="7" rx="1.5" />
      <path d="M6 6.5h.01M6 17.5h.01" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8v8a2 2 0 0 1-1 1.73l-6 3.46a2 2 0 0 1-2 0l-6-3.46A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l6-3.46a2 2 0 0 1 2 0l6 3.46A2 2 0 0 1 21 8Z" />
      <path d="M3.27 6.96 12 12l8.73-5.04M12 22.08V12" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FilterDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="filter-field filter-dropdown" ref={ref}>
      <span className="filter-label">{label}</span>
      <button
        type="button"
        className="filter-input filter-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{value}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <ul className="filter-menu" role="listbox">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className={opt === value ? 'active' : ''}
                role="option"
                aria-selected={opt === value}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {opt}
                {opt === value && <CheckIcon />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProductVisual({ product }) {
  if (product.iframeUrl) {
    return (
      <div className="pcard-frame">
        <iframe src={product.iframeUrl} title={product.alt} loading="lazy" tabIndex={-1} />
      </div>
    );
  }
  if (product.img) {
    return <img src={product.img} alt={product.alt} loading="lazy" />;
  }
  return (
    <div className="pcard-placeholder">
      <span className="pcard-placeholder-icon"><BoxIcon /></span>
      <span className="pcard-placeholder-text">Preview coming soon</span>
    </div>
  );
}

export default function HuzalinkMarketplace() {
  const [theme, setTheme] = useState('light');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [deployment, setDeployment] = useState('All Deployments');
  const [status, setStatus] = useState('Any Status');
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );

    const sections = root.querySelectorAll('.products, .how, .cta');
    const cards = root.querySelectorAll('.pcard, .how-item');

    sections.forEach((s) => {
      s.classList.add('reveal');
      observer.observe(s);
    });
    cards.forEach((c) => {
      c.classList.add('reveal');
      observer.observe(c);
    });

    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) return false;
      if (category !== 'All Categories' && p.category !== category) return false;
      if (deployment !== 'All Deployments' && p.deployment !== deployment) return false;
      if (status !== 'Any Status' && p.status !== status) return false;
      return true;
    });
  }, [search, category, deployment, status]);

  const logo = theme === 'dark' ? '/huzalabs-assets/Logo-white.png' : '/huzalabs-assets/Logo-black.png';

  return (
    <div className="hz-marketplace" data-theme={theme} ref={rootRef}>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="https://huzalink.com/" className="logo">
            <img src={logo} alt="Huzalink" className="logo-img" />
          </a>
          <ul className="nav-links">
            <li><a href="https://huzalink.com/home">Home</a></li>
            <li><a href="https://huzalink.com/home#about">About</a></li>
            <li><a href="https://huzalink.com/home#services">Services</a></li>
            <li><a href="https://huzalink.com/opportunities">Opportunities</a></li>
            <li><a href="#products" className="active">Marketplace</a></li>
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

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <img src="/huzalabs-assets/hero-section.png" alt="" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-inner">
          <div>
            <h1>Explore. License.<br /><span className="g">Deploy.</span></h1>
            <div className="hero-accent-bar"></div>
            <p className="hero-sub">Enterprise software products built in-house by Huzalabs — ready to license and deploy across government, healthcare, telecoms, and education.</p>
            <div className="hero-btns">
              <a href="#products" className="btn btn-green">Browse Products</a>
              <a href="/licensing" className="btn btn-outline">Get Access &rarr;</a>
            </div>
          </div>

          {/* Hero product visual */}
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-device">
            <div className="laptop">
              <div className="laptop-screen">
                <div className="laptop-cam"></div>
                <div className="skel-topbar">
                  <span className="skel-dot"></span>
                  <span className="skel-dot"></span>
                  <span className="skel-dot"></span>
                  <div className="skel-bar skel-bar-title"></div>
                </div>
                <div className="skel-body">
                  <div className="skel-sidebar">
                    <div className="skel-nav-item active"><span className="skel-nav-icon"></span><div className="skel-line"></div></div>
                    <div className="skel-nav-item"><span className="skel-nav-icon"></span><div className="skel-line"></div></div>
                    <div className="skel-nav-item"><span className="skel-nav-icon"></span><div className="skel-line"></div></div>
                    <div className="skel-nav-item"><span className="skel-nav-icon"></span><div className="skel-line short"></div></div>
                  </div>
                  <div className="skel-main">
                    <div className="skel-stat-row">
                      <div className="skel-stat">
                        <div className="skel-stat-num">{PRODUCTS.length}+</div>
                        <div className="skel-stat-label"></div>
                      </div>
                      <div className="skel-stat">
                        <div className="skel-stat-num">{CATEGORIES.length - 1}</div>
                        <div className="skel-stat-label"></div>
                      </div>
                      <div className="skel-stat">
                        <div className="skel-stat-num">20+</div>
                        <div className="skel-stat-label"></div>
                      </div>
                    </div>
                    <div className="skel-charts">
                      <div className="skel-line-chart">
                        <svg viewBox="0 0 120 50" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="skelLineFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2EC143" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#2EC143" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,38 C7.5,38 7.5,30 15,30 C22.5,30 22.5,34 30,34 C37.5,34 37.5,18 45,18 C52.5,18 52.5,24 60,24 C67.5,24 67.5,10 75,10 C82.5,10 82.5,16 90,16 C97.5,16 97.5,6 105,6 C112.5,6 112.5,12 120,12 L120,50 L0,50 Z"
                            fill="url(#skelLineFill)"
                          />
                          <path
                            d="M0,38 C7.5,38 7.5,30 15,30 C22.5,30 22.5,34 30,34 C37.5,34 37.5,18 45,18 C52.5,18 52.5,24 60,24 C67.5,24 67.5,10 75,10 C82.5,10 82.5,16 90,16 C97.5,16 97.5,6 105,6 C112.5,6 112.5,12 120,12"
                            fill="none" stroke="#2EC143" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="skel-pie-chart">
                        <div className="skel-donut">
                          <div className="skel-donut-hole">
                            <span className="skel-donut-num">{CATEGORIES.length - 1}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="skel-loader">
                  <span className="skel-spinner"></span>
                  Loading products…
                </div>
                <div className="skel-shimmer"></div>
              </div>
              <div className="laptop-base"></div>
            </div>

            <div className="visual-chip chip-1">
              <span className="chip-icon"><LayersIcon /></span>
              {CATEGORIES.length - 1} industries served
            </div>
            <div className="visual-chip chip-2">
              <span className="chip-icon"><ServerIcon /></span>
              {DEPLOYMENTS.length - 1} deployment types
            </div>

            <div className="visual-stat">
              <div className="visual-stat-top">
                <span className="visual-stat-icon"><BoxIcon /></span>
                <div className="visual-stat-eyebrow">HUZALINK MARKETPLACE</div>
              </div>
              <div className="visual-stat-value">{PRODUCTS.length}<b>+</b></div>
              <div className="visual-stat-sub">Products shipped</div>
            </div>

            <div className="visual-product">
              <div className="visual-product-thumb"><GlobeIcon /></div>
              <div>
                <div className="visual-product-name">Built Across Sectors</div>
                <div className="visual-product-tag">
                  <span className="visual-product-dot"></span>
                  {CATEGORIES.slice(1, 4).join(' · ')} +{CATEGORIES.length - 4} more
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="filter-wrap">
        <div className="filter-bar">
          <div className="filter-field filter-search">
            <span className="filter-label">Search Product</span>
            <div className="filter-input">
              <SearchIcon />
              <input
                type="text"
                placeholder="Product title or name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <FilterDropdown label="Category" value={category} options={CATEGORIES} onChange={setCategory} />
          <FilterDropdown label="Deployment" value={deployment} options={DEPLOYMENTS} onChange={setDeployment} />
          <FilterDropdown label="Status" value={status} options={STATUSES} onChange={setStatus} />
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="products" id="products">
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

          <div className="sec-top">
            <div>
              <span className="sec-eyebrow">The Marketplace</span>
              <h2 className="sec-h">Built. Deployed.<br />Ready to license.</h2>
            </div>
            <p className="sec-note">Real products designed and developed in-house — each solving a specific problem, in production and running.</p>
          </div>

          {/* PRODUCT GRID */}
          {filtered.length === 0 ? (
            <p className="pempty">No products match those filters.</p>
          ) : (
            <div className="pgrid">
              {filtered.map((p) => (
                <div className="pcard" key={p.title}>
                  <div className="pcard-chrome">
                    <BrowserDots />
                    <div className="pcard-url">{p.url}</div>
                  </div>
                  <div className="pcard-img">
                    <ProductVisual product={p} />
                  </div>
                  <div className="pcard-body">
                    <span className="ptag">{p.tag}</span>
                    <h3 className="ptitle">{p.title}</h3>
                    <p className="pdesc">{p.desc}</p>
                    <div className="pactions">
                      <a href={p.link || p.iframeUrl || '#'} target={(p.link || p.iframeUrl) ? '_blank' : undefined} rel="noopener noreferrer" className="btn btn-green">View Product &rarr;</a>
                      <a href={`/licensing?product=${encodeURIComponent(p.title)}`} className="btn btn-outline">Get Access</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div className="sec-top" style={{ marginBottom: '32px' }}>
            <div>
              <span className="sec-eyebrow">How It Works</span>
              <h2 className="sec-h">Discover. License. Deploy.</h2>
            </div>
          </div>
          <div className="how-grid">
            <div className="how-item">
              <div className="how-step">Discover</div>
              <div className="how-h">Browse the marketplace</div>
              <p className="how-p">Explore products already built and running in production — across public safety, education, telecoms, and intelligence.</p>
            </div>
            <div className="how-item">
              <div className="how-step">License</div>
              <div className="how-h">Get access, fast</div>
              <p className="how-p">Reach out through Huzalink and our team sets up access, onboarding, and support for the product you need.</p>
            </div>
            <div className="how-item">
              <div className="how-step">Deploy</div>
              <div className="how-h">Live in your environment</div>
              <p className="how-p">We help you stand it up in your environment, tested and supported — not a static demo, a running product.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="contact">
        <div className="cta-inner">
          <span className="sec-eyebrow">Get Access</span>
          <h2>Need a product<br /><em>already built?</em></h2>
          <p>Huzalink Marketplace connects you directly to Huzalabs' in-house products. Tell us what you need and we'll get you set up.</p>
          <a href="mailto:info@huzalabs.com" className="btn btn-green">Start a Conversation &rarr;</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot">
          <a href="https://huzalink.com/" className="logo">
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
