import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation, animate } from 'framer-motion';

/* ─────────────────────────────────────────
   BRAND TOKENS (Modernized Navy Blue & Golden Orange)
───────────────────────────────────────── */
const C = {
  primary:    '#1B4671', // Deep Navy Blue
  mid:        '#183F66', // Mid Blue
  light:      '#287BBE', // Lighter Blue
  pale:       '#E2EEF8', // Pale Blue
  lt:         '#F1F5F9', // Lightest slate for borders/bg
  dark:       '#0B1E36', // Darkest Blue
  darkMid:    '#1D4671',
  heading:    '#0F172A', // Crisp slate for headings
  text:       '#334155', // Modern slate gray for readability
  muted:      '#64748B', // Muted text
  accent:     '#F5A623', // Golden Orange
  accentLight:'#FBD38D', // Light Orange
  bg:         '#FAFAFA', // Ultra-light modern background
  white:      '#FFFFFF',
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const OFFERINGS = [
  {
    icon: '🏢',
    title: 'Incubation Center',
    desc: 'Our Startup Incubation Center offers resources, mentorship, and a collaborative space to turn visionary ideas into successful ventures.',
    tags: ['Co-Working Space', 'Resources', 'Mentorship'],
    gradient: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
    shadow: 'rgba(27, 70, 113, 0.25)',
  },
  {
    icon: '🤝',
    title: 'Mentorship & Investor Connect',
    desc: 'Our program links startups with experienced mentors and potential investors, driving growth and strategic direction.',
    tags: ['Expert Mentors', 'Investor Access', 'Growth Strategy'],
    gradient: `linear-gradient(135deg, ${C.accent}, #F7B733)`,
    shadow: 'rgba(245, 166, 35, 0.25)',
  },
  {
    icon: '📱',
    title: 'Digital Marketing Training',
    desc: 'Equips entrepreneurs with the latest tools and strategies to enhance online visibility and drive exponential business growth.',
    tags: ['SEO & SEM', 'Social Media', 'Content Strategy'],
    gradient: `linear-gradient(135deg, ${C.mid}, ${C.light})`,
    shadow: 'rgba(40, 123, 190, 0.22)',
  },
  {
    icon: '🛒',
    title: 'Online Selling Platform',
    desc: 'Empowers businesses to showcase and easily sell their products to a global audience through a streamlined digital storefront.',
    tags: ['Global Reach', 'Easy Listing', 'Revenue Growth'],
    gradient: `linear-gradient(135deg, ${C.primary}, ${C.mid})`,
    shadow: 'rgba(27, 70, 113, 0.25)',
  },
  {
    icon: '🌸',
    title: 'Self-help Group Support',
    desc: 'Fosters collaboration by providing essential resources and guidance for collective growth and lasting financial independence.',
    tags: ['Collaboration', 'Independence', 'Group Resources'],
    gradient: `linear-gradient(135deg, ${C.accent}, #F7B733)`,
    shadow: 'rgba(245, 166, 35, 0.25)',
  },
  {
    icon: '📋',
    title: 'Policy Awareness',
    desc: 'Keeps entrepreneurs updated on the latest regulations, ensuring strict compliance and informed, data-driven decision-making.',
    tags: ['Govt. Schemes', 'Compliance', 'Regulatory Updates'],
    gradient: `linear-gradient(135deg, ${C.light}, #4BA3E3)`,
    shadow: 'rgba(40, 123, 190, 0.22)',
  },
];

const STATS = [
  { num: '6',   suffix: '',  label: 'Programs\nOffered' },
  { num: '200', suffix: '+', label: 'Women\nEmpowered' },
  { num: '50',  suffix: '+', label: 'Expert\nMentors' },
  { num: '10',  suffix: '+', label: 'Strategic\nPartners' },
];

/* ─────────────────────────────────────────
   REUSABLE HELPERS
───────────────────────────────────────── */
const Orb = ({ style, anim, dur = 11 }) => (
  <motion.div
    animate={anim}
    transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
    style={{ position: 'absolute', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)', ...style }}
  />
);

const Reveal = ({ children, delay = 0, y = 30, style = {}, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const useCounter = (target, inView, duration = 2) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setVal(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, target, duration]);
  return val;
};

/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */
const StatCard = ({ num, suffix, label, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count = useCounter(parseInt(num), inView);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: C.white,
        border: `1px solid ${C.pale}`,
        borderRadius: 20, 
        padding: '28px 16px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(11, 30, 54, 0.04)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 900, color: C.primary, lineHeight: 1, marginBottom: 8 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 13, color: C.muted, fontWeight: 600, lineHeight: 1.4, whiteSpace: 'pre-line' }}>
        {label}
      </div>
    </motion.div>
  );
};

const OfferingCard = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: C.white,
        border: `1px solid ${hovered ? 'transparent' : C.lt}`,
        borderRadius: 24, 
        padding: '32px 28px',
        position: 'relative', 
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: hovered ? `0 24px 48px ${item.shadow}, 0 0 0 1px ${item.shadow}` : '0 12px 32px rgba(11, 30, 54, 0.03)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: item.gradient, transformOrigin: 'left' }}
      />

      <motion.div
        animate={hovered ? { opacity: 1, x: 0, y: 0, rotate: 0 } : { opacity: 0, x: 10, y: -10, rotate: -45 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: 24, right: 24, width: 32, height: 32, borderRadius: '50%',
          background: C.lt, display: 'flex', alignItems: 'center', justifyContent: 'center', 
          fontSize: 14, color: C.primary, fontWeight: 800,
        }}
      >
        ↗
      </motion.div>

      <motion.div
        animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: 64, height: 64, borderRadius: 18, background: item.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, marginBottom: 24, boxShadow: `0 8px 24px ${item.shadow}`,
        }}
      >
        {item.icon}
      </motion.div>

      <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 800, color: C.heading, lineHeight: 1.3 }}>
        {item.title}
      </h3>
      <p style={{ margin: '0 0 24px', fontSize: 15, color: C.text, lineHeight: 1.7, flexGrow: 1 }}>
        {item.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
        {item.tags.map((tag, i) => (
          <span
            key={i}
            style={{
              background: C.bg, color: C.text, border: `1px solid ${C.lt}`,
              borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 600,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const JoinForm = () => {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', location: '', idea: '' });
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const inputStyle = {
    width: '100%', padding: '14px 18px', boxSizing: 'border-box',
    borderRadius: 14, border: `1.5px solid ${C.pale}`,
    fontSize: 15, color: C.heading, background: '#F8FAFC', outline: 'none',
    fontFamily: 'inherit', transition: 'all 0.25s ease',
  };

  const handleFocus = e => {
    e.target.style.borderColor = C.primary;
    e.target.style.background = C.white;
    e.target.style.boxShadow = `0 0 0 4px rgba(27, 70, 113, 0.1)`;
  };
  const handleBlur = e => {
    e.target.style.borderColor = C.pale;
    e.target.style.background = '#F8FAFC';
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: C.white, borderRadius: 28,
        padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 48px)',
        boxShadow: '0 24px 64px rgba(11, 30, 54, 0.15)',
        maxWidth: 720, margin: '0 auto', position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: -100, right: -100, width: 250, height: 250, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 166, 35, 0.08) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      {submitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '48px 0' }}>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: C.white, margin: '0 auto 24px',
              boxShadow: '0 12px 32px rgba(27, 70, 113, 0.3)',
            }}
          >
            ✓
          </motion.div>
          <h3 style={{ fontSize: 26, fontWeight: 900, color: C.heading, marginBottom: 12 }}>Application Submitted!</h3>
          <p style={{ color: C.text, fontSize: 16, lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
            Thank you for joining Yashashwani. Our team will reach out to you within 2–3 business days.
          </p>
        </motion.div>
      ) : (
        <>
          <h3 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 900, color: C.heading, marginBottom: 8, letterSpacing: '-0.5px' }}>
            Join GWEDC
          </h3>
          <p style={{ color: C.muted, fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
            Take the first step towards your entrepreneurial journey.
          </p>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: C.heading, display: 'block', marginBottom: 8 }}>Your Name *</label>
                <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Priya Sharma" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: C.heading, display: 'block', marginBottom: 8 }}>Email ID *</label>
                <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="priya@example.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: C.heading, display: 'block', marginBottom: 8 }}>Mobile No. *</label>
                <input required type="tel" value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))}
                  placeholder="9876543210" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: C.heading, display: 'block', marginBottom: 8 }}>Location *</label>
                <input required value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                  placeholder="Gwalior, MP" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: C.heading, display: 'block', marginBottom: 8 }}>Describe your startup idea *</label>
              <textarea required rows={4} value={form.idea} onChange={e => setForm(p => ({ ...p, idea: e.target.value }))}
                placeholder="Tell us about your business idea, the problem it solves..."
                style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(245, 166, 35, 0.35)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', padding: '18px 32px', borderRadius: 14, border: 'none',
                background: C.accent, color: C.dark, fontWeight: 800, fontSize: 16,
                fontFamily: 'inherit', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(245, 166, 35, 0.25)', transition: 'background 0.3s'
              }}
            >
              Submit Application ↗
            </motion.button>
          </form>
        </>
      )}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
const GWEDCPage = () => (
  <section style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: C.heading, overflowX: 'hidden' }}>
    
    {/* ══ HERO ══ */}
    <div style={{
      position: 'relative',
      background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkMid} 100%)`,
      padding: 'clamp(80px, 12vw, 120px) 24px clamp(100px, 15vw, 160px)',
      overflow: 'hidden', textAlign: 'center',
    }}>
      <Orb style={{ top: -100, left: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(40, 123, 190, 0.25) 0%, transparent 70%)' }} anim={{ y: [0, 30, 0] }} dur={12} />
      <Orb style={{ bottom: -150, right: '5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(245, 166, 35, 0.15) 0%, transparent 70%)' }} anim={{ y: [0, -40, 0] }} dur={15} />

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24, position: 'relative', zIndex: 2 }}
      >
        <div style={{ height: 2, width: 40, background: `linear-gradient(90deg, transparent, ${C.accent})` }} />
        <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent }}>GWEDC</span>
        <div style={{ height: 2, width: 40, background: `linear-gradient(90deg, ${C.accent}, transparent)` }} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ margin: '0 auto 16px', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, color: C.white, letterSpacing: '-1.5px', lineHeight: 1.1, position: 'relative', zIndex: 2, maxWidth: 900 }}
      >
        Yashashwani
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ margin: '0 auto 40px', fontSize: 'clamp(16px, 3vw, 20px)', color: '#CBD5E1', fontWeight: 400, position: 'relative', zIndex: 2, maxWidth: 700, lineHeight: 1.6 }}
      >
        Women Entrepreneur Cell at Gwalior Incubation Center. Inspiring, empowering, and providing the tools needed to excel as business leaders.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', position: 'relative', zIndex: 2 }}
      >
        {['🌸 Women-First', '🚀 Startup Ready', '🏛️ Govt. Backed'].map((b, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 100, padding: '10px 20px', fontSize: 14, fontWeight: 600, color: C.white,
          }}>
            {b}
          </span>
        ))}
      </motion.div>
    </div>

    {/* ══ ABOUT SECTION ══ */}
    <div style={{ background: C.bg, padding: 'clamp(64px, 10vw, 96px) clamp(20px, 5vw, 32px)', marginTop: '-40px', position: 'relative', zIndex: 3 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
        <Reveal delay={0}>
          <div style={{ background: C.white, borderRadius: 28, padding: 'clamp(32px, 5vw, 48px)', border: `1px solid ${C.lt}`, boxShadow: '0 20px 40px rgba(11, 30, 54, 0.04)', height: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.pale, color: C.primary, borderRadius: 100, padding: '6px 16px', marginBottom: 24, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              🌟 About Yashashwani
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 900, color: C.heading, marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
              A Beacon of Opportunity
            </h2>
            <p style={{ fontSize: 16, color: C.text, lineHeight: 1.8, margin: 0 }}>
              Established to inspire, empower, and support women entrepreneurs. We foster a nurturing environment where women can access the resources, guidance, and cutting-edge training needed to develop and rapidly scale their business ideas.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.mid} 100%)`, borderRadius: 28, padding: 'clamp(32px, 5vw, 48px)', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(27, 70, 113, 0.2)', height: '100%', boxSizing: 'border-box' }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 166, 35, 0.2) 0%, transparent 70%)' }} />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245, 166, 35, 0.15)', color: C.accent, borderRadius: 100, padding: '6px 16px', marginBottom: 24, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              🎯 Our Mission
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 900, color: C.white, marginBottom: 16, lineHeight: 1.2, letterSpacing: '-0.5px', position: 'relative', zIndex: 1 }}>
              Removing Barriers
            </h2>
            <p style={{ fontSize: 16, color: '#E2EEF8', lineHeight: 1.8, margin: 0, position: 'relative', zIndex: 1 }}>
              We aim to eliminate obstacles women face in entrepreneurship, enabling them to control their economic futures. By providing essential tools, skills, and confidence, we help women excel as business leaders and shape a stronger local economy.
            </p>
          </div>
        </Reveal>
      </div>
    </div>

    {/* ══ STATS ══ */}
    <div style={{ background: C.white, padding: 'clamp(40px, 5vw, 64px) clamp(20px, 5vw, 32px)', borderTop: `1px solid ${C.lt}`, borderBottom: `1px solid ${C.lt}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, maxWidth: 1200, margin: '0 auto' }}>
        {STATS.map((s, i) => <StatCard key={i} {...s} delay={i * 0.1} />)}
      </div>
    </div>

    {/* ══ WHAT WE OFFER ══ */}
    <div style={{ background: C.bg, padding: 'clamp(80px, 12vw, 120px) clamp(20px, 5vw, 32px)' }}>
      <Reveal style={{ textAlign: 'center', marginBottom: 64, maxWidth: 680, margin: '0 auto 64px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ height: 2, width: 40, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.primary }}>Services</span>
          <div style={{ height: 2, width: 40, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
        </div>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: C.heading, letterSpacing: '-1px', lineHeight: 1.1, margin: '0 0 20px' }}>
          Programs to Power Your Journey
        </h2>
        <p style={{ fontSize: 18, color: C.text, lineHeight: 1.6, margin: 0 }}>
          Comprehensive, world-class support tailored specifically for women entrepreneurs at every stage of their business.
        </p>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, maxWidth: 1200, margin: '0 auto' }}>
        {OFFERINGS.map((item, i) => <OfferingCard key={i} item={item} index={i} />)}
      </div>
    </div>

    {/* ══ JOIN FORM SECTION ══ */}
    <div style={{
      background: `linear-gradient(180deg, ${C.dark} 0%, ${C.darkMid} 100%)`,
      padding: 'clamp(80px, 12vw, 120px) clamp(20px, 5vw, 32px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <Orb style={{ top: -100, left: -50, width: 400, height: 400, background: 'radial-gradient(circle, rgba(40, 123, 190, 0.2) 0%, transparent 70%)' }} anim={{ x: [0, 30, 0] }} dur={10} />
      <Orb style={{ bottom: -100, right: -50, width: 400, height: 400, background: 'radial-gradient(circle, rgba(245, 166, 35, 0.15) 0%, transparent 70%)' }} anim={{ y: [0, -30, 0] }} dur={14} />

      <div style={{ textAlign: 'center', marginBottom: 56, position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent, margin: '0 0 12px' }}>
            Join the Movement
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: C.white, letterSpacing: '-1px', margin: '0 0 16px', lineHeight: 1.1 }}>
            Start Your Journey
          </h2>
          <p style={{ color: '#E2EEF8', fontSize: 18, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
            Fill in your details below and our expert team will connect with you to guide your next big steps.
          </p>
        </motion.div>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <JoinForm />
      </div>
    </div>

    {/* ══ BOTTOM CTA ══ */}
    <div style={{ background: C.white, padding: 'clamp(64px, 10vw, 96px) clamp(20px, 5vw, 32px)' }}>
      <Reveal style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          background: C.bg, border: `1px solid ${C.lt}`, borderRadius: 32,
          padding: 'clamp(48px, 8vw, 80px) clamp(24px, 6vw, 64px)', textAlign: 'center',
          boxShadow: '0 24px 48px rgba(11, 30, 54, 0.05)',
        }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, color: C.heading, letterSpacing: '-1px', lineHeight: 1.1 }}>
            Be the Change You Wish to See
          </h2>
          <p style={{ margin: '0 auto 40px', maxWidth: 600, fontSize: 18, color: C.text, lineHeight: 1.7 }}>
            Yashashwani is more than a program — it's a movement. Join thousands of visionary women building a brighter, stronger tomorrow.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <motion.a href="#join" whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(27, 70, 113, 0.25)' }} whileTap={{ scale: 0.96 }}
              style={{ display: 'inline-flex', alignItems: 'center', background: C.primary, color: C.white, textDecoration: 'none', fontWeight: 800, fontSize: 16, padding: '16px 36px', borderRadius: 100, transition: 'background 0.3s' }}>
              Apply Now ↗
            </motion.a>
            <motion.a href="https://gincube.org/gwedc" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, background: C.lt }} whileTap={{ scale: 0.96 }}
              style={{ display: 'inline-flex', alignItems: 'center', background: C.white, border: `2px solid ${C.pale}`, color: C.heading, textDecoration: 'none', fontWeight: 800, fontSize: 16, padding: '14px 36px', borderRadius: 100, transition: 'all 0.3s' }}>
              Learn More
            </motion.a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default GWEDCPage;