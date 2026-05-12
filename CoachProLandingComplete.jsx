import React, { useState } from 'react';

export default function CoachProLanding() {
  const [lang, setLang] = useState('ar');
  const [clients, setClients] = useState(20);
  const [email, setEmail] = useState('');

  // نموذج السعر
  const BASE_MONTHLY_PRICE = 250;
  const BASE_CLIENTS = 20;
  const EXTRA_PRICE_PER_CLIENT = 20;

  const calculateMonthlyPrice = (numClients) => {
    if (numClients <= BASE_CLIENTS) return BASE_MONTHLY_PRICE;
    return BASE_MONTHLY_PRICE + ((numClients - BASE_CLIENTS) * EXTRA_PRICE_PER_CLIENT);
  };

  const monthlyPrice = calculateMonthlyPrice(clients);
  const quarterlyPrice = monthlyPrice * 3;
  const yearlyPrice = monthlyPrice * 12;

  const t = lang === 'ar' ? ar : en;

  return (
    <div style={styles.wrapper}>
      {/* ─── HEADER ──────────────────────────────────────────────── */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>⚡</span>
            <span>CoachPro</span>
          </div>
          <nav style={styles.nav}>
            <a href="#features" style={styles.navLink}>{t.features}</a>
            <a href="#pricing" style={styles.navLink}>{t.pricing}</a>
            <a href="#testimonials" style={styles.navLink}>{t.testimonials}</a>
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} style={styles.langBtn}>
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
          </nav>
        </div>
      </header>

      {/* ─── HERO SECTION ──────────────────────────────────────── */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>{t.heroTitle}</h1>
            <p style={styles.heroSubtitle}>{t.heroSubtitle}</p>
            <div style={styles.heroCta}>
              <button style={styles.btnPrimary}>{t.getStarted}</button>
              <button style={styles.btnSecondary}>{t.learnMore}</button>
            </div>
            <div style={styles.heroStats}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>500+</div>
                <div>{t.coaches}</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>10K+</div>
                <div>{t.clients}</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNumber}>95%</div>
                <div>{t.satisfaction}</div>
              </div>
            </div>
          </div>
          <div style={styles.heroImage}>
            <div style={styles.imagePlaceholder}>📱</div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ──────────────────────────────────– */}
      <section style={styles.features} id="features">
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>{t.whyChoose}</h2>
          <div style={styles.featuresGrid}>
            {[
              { icon: '👥', title: t.f1Title, desc: t.f1Desc },
              { icon: '📈', title: t.f2Title, desc: t.f2Desc },
              { icon: '⏰', title: t.f3Title, desc: t.f3Desc },
              { icon: '💪', title: t.f4Title, desc: t.f4Desc },
              { icon: '📊', title: t.f5Title, desc: t.f5Desc },
              { icon: '🎯', title: t.f6Title, desc: t.f6Desc },
            ].map((f, i) => (
              <div key={i} style={styles.featureCard}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING SECTION ──────────────────────────────────── */}
      <section style={styles.pricing} id="pricing">
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>{t.pricing}</h2>
          <p style={styles.pricingSubtitle}>{t.flexiblePricing}</p>

          {/* Pricing Model Explanation */}
          <div style={styles.modelBox}>
            <h3 style={styles.modelTitle}>{t.howItWorks}</h3>
            <div style={styles.modelGrid}>
              <div style={styles.modelCard}>
                <div style={styles.modelValue}>250</div>
                <div style={styles.modelUnit}>{t.currency}/{t.month}</div>
                <div style={styles.modelDesc}>{t.upTo} 20 {t.clients}</div>
              </div>
              <div style={styles.plus}>+</div>
              <div style={styles.modelCard}>
                <div style={styles.modelValue}>20</div>
                <div style={styles.modelUnit}>{t.currency}/{t.client}/{t.month}</div>
                <div style={styles.modelDesc}>{t.clientsOver} 20</div>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div style={styles.calculator}>
            <h3 style={styles.calcTitle}>{t.calculatePrice}</h3>
            
            <div style={styles.calcContent}>
              {/* Slider */}
              <div style={styles.sliderSection}>
                <label style={styles.label}>{t.numClients}: {clients}</label>
                <input
                  type="range"
                  min="1"
                  max="150"
                  value={clients}
                  onChange={(e) => setClients(parseInt(e.target.value))}
                  style={styles.slider}
                />
                <input
                  type="number"
                  min="1"
                  value={clients}
                  onChange={(e) => setClients(Math.max(1, parseInt(e.target.value) || 0))}
                  style={styles.numberInput}
                />
              </div>

              {/* Results */}
              <div style={styles.resultsGrid}>
                <div style={styles.resultBox}>
                  <div style={styles.resultLabel}>{t.monthly}</div>
                  <div style={styles.resultValue}>{monthlyPrice}</div>
                  <div style={styles.resultCurrency}>{t.currency}</div>
                </div>

                <div style={styles.resultBox}>
                  <div style={styles.resultLabel}>{t.quarterly}</div>
                  <div style={styles.resultValue}>{quarterlyPrice}</div>
                  <div style={styles.resultCurrency}>{t.currency}</div>
                </div>

                <div style={styles.resultBox}>
                  <div style={styles.resultLabel}>{t.yearly}</div>
                  <div style={styles.resultValue}>{yearlyPrice}</div>
                  <div style={styles.resultCurrency}>{t.currency}</div>
                </div>

                <div style={styles.resultBox}>
                  <div style={styles.resultLabel}>{t.perClient}</div>
                  <div style={styles.resultValue}>{(monthlyPrice / clients).toFixed(2)}</div>
                  <div style={styles.resultCurrency}>{t.currency}</div>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div style={styles.breakdown}>
              <div style={styles.breakdownLine}>
                <span>{t.basePackage}</span>
                <span>250 {t.currency}</span>
              </div>
              {clients > BASE_CLIENTS && (
                <div style={styles.breakdownLine}>
                  <span>{clients - BASE_CLIENTS} × 20</span>
                  <span>{(clients - BASE_CLIENTS) * EXTRA_PRICE_PER_CLIENT} {t.currency}</span>
                </div>
              )}
              <div style={{ ...styles.breakdownLine, ...styles.breakdownTotal }}>
                <span>{t.totalPerMonth}</span>
                <span>{monthlyPrice} {t.currency}</span>
              </div>
            </div>
          </div>

          {/* Price Examples Table */}
          <div style={styles.examplesTable}>
            <h3 style={styles.tableTitle}>{t.examples}</h3>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>{t.clients}</th>
                  <th style={styles.th}>{t.monthly}</th>
                  <th style={styles.th}>{t.quarterly}</th>
                  <th style={styles.th}>{t.yearly}</th>
                </tr>
              </thead>
              <tbody>
                {[10, 15, 20, 25, 30, 40, 50].map((num, i) => {
                  const m = calculateMonthlyPrice(num);
                  return (
                    <tr key={i} style={{ ...styles.tr, ...(num === 20 ? styles.trActive : {}) }}>
                      <td style={styles.td}>{num}</td>
                      <td style={styles.td}>{m}</td>
                      <td style={styles.td}>{m * 3}</td>
                      <td style={styles.td}>{m * 12}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ──────────────────────────────– */}
      <section style={styles.testimonials} id="testimonials">
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>{t.testimonials}</h2>
          <div style={styles.testimonialsGrid}>
            {[
              { name: t.t1Name, role: t.t1Role, text: t.t1Text, emoji: '👨‍🏫' },
              { name: t.t2Name, role: t.t2Role, text: t.t2Text, emoji: '👩‍💼' },
              { name: t.t3Name, role: t.t3Role, text: t.t3Text, emoji: '👨‍💻' },
            ].map((item, i) => (
              <div key={i} style={styles.testimonialCard}>
                <div style={styles.testimonialHeader}>
                  <span style={styles.testimonialEmoji}>{item.emoji}</span>
                  <div>
                    <p style={styles.testimonialName}>{item.name}</p>
                    <p style={styles.testimonialRole}>{item.role}</p>
                  </div>
                </div>
                <p style={styles.testimonialText}>"{item.text}"</p>
                <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────── */}
      <section style={styles.cta}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>{t.ctaTitle}</h2>
          <p style={styles.ctaSubtitle}>{t.ctaSubtitle}</p>
          <button style={styles.btnLarge}>{t.startFree}</button>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────── */}
      <section style={styles.newsletter}>
        <div style={styles.container}>
          <h2 style={styles.newsTitle}>{t.newsletter}</h2>
          <div style={styles.newsForm}>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.emailInput}
            />
            <button style={styles.btnSubmit}>{t.subscribe}</button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div>
              <h4 style={styles.footerTitle}>⚡ CoachPro</h4>
              <p style={styles.footerText}>{t.footerText}</p>
            </div>
            <div>
              <h4 style={styles.footerTitle}>{t.links}</h4>
              <ul style={styles.footerList}>
                <li><a href="#" style={styles.footerLink}>{t.about}</a></li>
                <li><a href="#" style={styles.footerLink}>{t.contact}</a></li>
                <li><a href="#" style={styles.footerLink}>{t.privacy}</a></li>
              </ul>
            </div>
            <div>
              <h4 style={styles.footerTitle}>{t.follow}</h4>
              <div style={styles.socialLinks}>
                <a href="#" style={styles.socialLink}>Facebook</a>
                <a href="#" style={styles.socialLink}>Instagram</a>
                <a href="#" style={styles.socialLink}>Twitter</a>
              </div>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── STYLES ────────────────────────────────────────────────────────
const styles = {
  wrapper: {
    fontFamily: "'Cairo', 'Inter', sans-serif",
    background: '#f8f9fb',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },

  // HEADER
  header: {
    background: 'white',
    borderBottom: '1px solid #eee',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea',
  },
  logoIcon: {
    fontSize: '28px',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  langBtn: {
    padding: '8px 16px',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },

  // HERO
  hero: {
    padding: '4rem 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '1rem',
    lineHeight: '1.2',
    margin: '0 0 1rem',
  },
  heroSubtitle: {
    fontSize: '18px',
    opacity: 0.95,
    marginBottom: '2rem',
    margin: '0 0 2rem',
  },
  heroCta: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
  },
  btnPrimary: {
    padding: '14px 32px',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
  },
  btnSecondary: {
    padding: '14px 32px',
    background: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
  },
  heroStats: {
    display: 'flex',
    gap: '3rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '4px',
  },
  heroImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '300px',
    height: '300px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '80px',
  },

  // FEATURES
  features: {
    padding: '4rem 0',
    background: '#f8f9fb',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#222',
    margin: '0 0 3rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #eee',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#222',
    margin: '0 0 0.5rem',
  },
  featureDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    margin: 0,
  },

  // PRICING
  pricing: {
    padding: '4rem 0',
    background: 'white',
  },
  pricingSubtitle: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
    marginBottom: '3rem',
    margin: '0 0 3rem',
  },

  // Model Box
  modelBox: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '3rem 2rem',
    borderRadius: '16px',
    marginBottom: '3rem',
  },
  modelTitle: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 2rem',
  },
  modelGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
  },
  modelCard: {
    background: 'rgba(255,255,255,0.1)',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    flex: 1,
    maxWidth: '250px',
  },
  modelValue: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  modelUnit: {
    fontSize: '14px',
    opacity: 0.9,
    marginBottom: '0.5rem',
  },
  modelDesc: {
    fontSize: '12px',
    opacity: 0.8,
  },
  plus: {
    fontSize: '32px',
    fontWeight: '700',
    opacity: 0.8,
  },

  // Calculator
  calculator: {
    background: 'white',
    padding: '3rem',
    borderRadius: '12px',
    marginBottom: '3rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  calcTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '2rem',
    color: '#222',
    margin: '0 0 2rem',
  },
  calcContent: {
    marginBottom: '2rem',
  },
  sliderSection: {
    marginBottom: '2rem',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#222',
  },
  slider: {
    width: '100%',
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  numberInput: {
    padding: '12px',
    border: '1.5px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    maxWidth: '150px',
    fontFamily: 'inherit',
  },

  // Results
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  resultBox: {
    background: '#f8f9fb',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #eee',
  },
  resultLabel: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  resultValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#667eea',
    marginBottom: '0.25rem',
  },
  resultCurrency: {
    fontSize: '12px',
    color: '#999',
  },

  // Breakdown
  breakdown: {
    background: '#f8f9fb',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #eee',
  },
  breakdownLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#666',
    padding: '8px 0',
  },
  breakdownTotal: {
    borderTop: '2px solid #ddd',
    paddingTop: '8px',
    marginTop: '8px',
    fontWeight: '700',
    color: '#667eea',
  },

  // Examples Table
  examplesTable: {
    marginTop: '3rem',
  },
  tableTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#222',
    margin: '0 0 1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  tableHeader: {
    background: '#667eea',
    color: 'white',
  },
  th: {
    padding: '1rem',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '14px',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  trActive: {
    background: '#f0f4ff',
    fontWeight: '600',
  },
  td: {
    padding: '1rem',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  },

  // TESTIMONIALS
  testimonials: {
    padding: '4rem 0',
    background: '#f8f9fb',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  testimonialCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #eee',
  },
  testimonialHeader: {
    display: 'flex',
    gap: '12px',
    marginBottom: '1rem',
  },
  testimonialEmoji: {
    fontSize: '40px',
  },
  testimonialName: {
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 4px',
    color: '#222',
  },
  testimonialRole: {
    fontSize: '12px',
    color: '#666',
    margin: 0,
  },
  testimonialText: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1rem',
    fontStyle: 'italic',
    margin: '0 0 1rem',
  },
  stars: {
    fontSize: '14px',
  },

  // CTA
  cta: {
    padding: '4rem 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '1rem',
    margin: '0 0 1rem',
  },
  ctaSubtitle: {
    fontSize: '18px',
    marginBottom: '2rem',
    opacity: 0.95,
    margin: '0 0 2rem',
  },
  btnLarge: {
    padding: '16px 48px',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },

  // NEWSLETTER
  newsletter: {
    padding: '3rem 0',
    background: 'white',
    borderTop: '1px solid #eee',
  },
  newsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#222',
    margin: '0 0 1.5rem',
  },
  newsForm: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '500px',
    margin: '0 auto',
  },
  emailInput: {
    flex: 1,
    padding: '12px 16px',
    border: '1.5px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  btnSubmit: {
    padding: '12px 32px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },

  // FOOTER
  footer: {
    background: '#1a1a1a',
    color: 'white',
    padding: '4rem 0 1rem',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  footerTitle: {
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '1rem',
    color: 'white',
    margin: '0 0 1rem',
  },
  footerText: {
    fontSize: '14px',
    opacity: 0.7,
    lineHeight: '1.6',
    margin: 0,
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLink: {
    fontSize: '14px',
    color: '#999',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '8px',
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  socialLink: {
    fontSize: '14px',
    color: '#999',
    textDecoration: 'none',
  },
  footerBottom: {
    borderTop: '1px solid #333',
    padding: '1.5rem 0',
    textAlign: 'center',
    fontSize: '13px',
    opacity: 0.6,
  },
};

// ─── TRANSLATIONS ──────────────────────────────────────────────────
const ar = {
  features: 'المميزات',
  pricing: 'الأسعار',
  testimonials: 'التقييمات',
  heroTitle: 'منصة تدريب رقمية احترافية',
  heroSubtitle: 'إدارة عملائك وخطط التمرين بكل سهولة',
  getStarted: 'ابدأ الآن',
  learnMore: 'تعرف أكتر',
  coaches: 'كوتش نشط',
  clients: 'عميل مسجل',
  satisfaction: 'رضا العملاء',
  
  whyChoose: 'لماذا تختار CoachPro؟',
  f1Title: 'إدارة سهلة',
  f1Desc: 'تابع جميع عملائك في مكان واحد',
  f2Title: 'قياس النتائج',
  f2Desc: 'رسوم بيانية وإحصائيات دقيقة',
  f3Title: 'توفير الوقت',
  f3Desc: 'أتمتة العمليات المتكررة',
  f4Title: 'خطط مخصصة',
  f4Desc: 'أنشئ خطط فريدة لكل عميل',
  f5Title: 'تتبع الأداء',
  f5Desc: 'مراقبة مستمرة للتقدم',
  f6Title: 'دعم متقدم',
  f6Desc: 'فريق دعم متاح دائماً',

  flexiblePricing: 'نموذج سعر مرن يناسب جميع الأحجام',
  howItWorks: 'كيف يعمل النموذج؟',
  currency: 'ج.م',
  month: 'شهر',
  client: 'عميل',
  upTo: 'حتى',
  clientsOver: 'العملاء فوق',
  calculatePrice: 'احسب سعرك',
  numClients: 'عدد العملاء',
  monthly: 'شهري',
  quarterly: 'ربع سنة',
  yearly: 'سنوي',
  perClient: 'لكل عميل',
  basePackage: 'الباقة الأساسية',
  totalPerMonth: 'الإجمالي/شهر',
  examples: 'أمثلة الأسعار',

  testimonials: 'آراء عملائنا',
  t1Name: 'أحمد محمد',
  t1Role: 'مدرب كمال أجسام',
  t1Text: 'غيرت طريقة عملي تماماً! الآن لدي وقت أكتر للتدريب',
  t2Name: 'فاطمة علي',
  t2Role: 'مدربة يوجا',
  t2Text: 'الأداة رائعة والدعم متميز جداً',
  t3Name: 'محمود إبراهيم',
  t3Role: 'مدرب شخصي',
  t3Text: 'زادت إيرادتي بـ 40% بعد الاستخدام',

  ctaTitle: 'ابدأ مجاناً اليوم',
  ctaSubtitle: 'لا تحتاج بطاقة ائتمان',
  startFree: 'ابدأ النسخة المجانية',

  newsletter: 'اشترك في النشرة البريدية',
  emailPlaceholder: 'أدخل بريدك الإلكتروني',
  subscribe: 'اشترك',

  links: 'روابط سريعة',
  about: 'عن المنصة',
  contact: 'اتصل بنا',
  follow: 'تابعنا',
  privacy: 'سياسة الخصوصية',
  footerText: 'منصة تدريب رقمية متطورة لإدارة عملائك بكفاءة',
  copyright: '© 2024 CoachPro. جميع الحقوق محفوظة',
};

const en = {
  features: 'Features',
  pricing: 'Pricing',
  testimonials: 'Testimonials',
  heroTitle: 'Professional Coaching Platform',
  heroSubtitle: 'Manage your clients and workout plans easily',
  getStarted: 'Get Started',
  learnMore: 'Learn More',
  coaches: 'Active Coaches',
  clients: 'Registered Clients',
  satisfaction: 'Satisfaction',

  whyChoose: 'Why Choose CoachPro?',
  f1Title: 'Easy Management',
  f1Desc: 'Track all your clients in one place',
  f2Title: 'Track Results',
  f2Desc: 'Detailed analytics and statistics',
  f3Title: 'Save Time',
  f3Desc: 'Automate repetitive workflows',
  f4Title: 'Custom Plans',
  f4Desc: 'Create unique plans for each client',
  f5Title: 'Monitor Performance',
  f5Desc: 'Continuous progress tracking',
  f6Title: 'Advanced Support',
  f6Desc: 'Support team always available',

  flexiblePricing: 'Flexible pricing that suits all sizes',
  howItWorks: 'How it works',
  currency: 'EGP',
  month: 'month',
  client: 'client',
  upTo: 'Up to',
  clientsOver: 'Clients over',
  calculatePrice: 'Calculate your price',
  numClients: 'Number of clients',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
  perClient: 'Per client',
  basePackage: 'Base package',
  totalPerMonth: 'Total/month',
  examples: 'Price examples',

  testimonials: 'What Our Clients Say',
  t1Name: 'Ahmed Mohammed',
  t1Role: 'Bodybuilding Coach',
  t1Text: 'Completely changed my workflow! Now I have more time to train',
  t2Name: 'Fatima Ali',
  t2Role: 'Yoga Instructor',
  t2Text: 'Amazing tool and excellent support',
  t3Name: 'Mahmoud Ibrahim',
  t3Role: 'Personal Trainer',
  t3Text: 'My revenue increased by 40% after using it',

  ctaTitle: 'Start Free Today',
  ctaSubtitle: 'No credit card required',
  startFree: 'Start Free Trial',

  newsletter: 'Subscribe to our newsletter',
  emailPlaceholder: 'Enter your email',
  subscribe: 'Subscribe',

  links: 'Quick Links',
  about: 'About Us',
  contact: 'Contact',
  follow: 'Follow Us',
  privacy: 'Privacy Policy',
  footerText: 'Professional coaching platform for efficient client management',
  copyright: '© 2024 CoachPro. All rights reserved',
};
