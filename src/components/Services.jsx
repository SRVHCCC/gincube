import { useRef, useEffect, useState } from 'react';
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
  text:       '#334155', // Modern slate gray
  muted:      '#64748B', // Muted text
  accent:     '#F5A623', // Golden Orange
  accentLight:'#FBD38D', // Light Orange
  bg:         '#FAFAFA', // Ultra-light modern background
  white:      '#FFFFFF',
};

/* ── Services data ── */
const SERVICES = [
  {
    icon: '🏢',
    title: 'Co-Working Space',
    desc: 'Collaborate, innovate, and thrive in a vibrant community. Our co-working spaces offer the perfect blend of flexibility and inspiration.',
    tags: ['Flexible Desks', 'Meeting Rooms', 'High-Speed WiFi'],
    gradient: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
    shadow: 'rgba(27, 70, 113, 0.25)',
  },
  {
    icon: '🤝',
    title: 'Mentorship Support',
    desc: 'Guidance from industry experts can turn your vision into reality. Our mentors provide invaluable insights to help you navigate the startup landscape.',
    tags: ['1-on-1 Sessions', 'Industry Experts', 'Network Access'],
    gradient: `linear-gradient(135deg, ${C.accent}, #F7B733)`,
    shadow: 'rgba(245, 166, 35, 0.25)',
  },
  {
    icon: '💰',
    title: 'Funding Support',
    desc: 'Access the capital you need to fuel your growth journey. Our funding support connects you with investors who believe in your vision.',
    tags: ['Investor Connect', 'Grant Access', 'Pitch Prep'],
    gradient: `linear-gradient(135deg, ${C.light}, #4BA3E3)`,
    shadow: 'rgba(40, 123, 190, 0.22)',
  },
  {
    icon: '⚡',
    title: 'Technology Support',
    desc: 'Leverage cutting-edge tools and resources to bring your ideas to life. Our technology support helps you stay ahead in a fast-paced digital world.',
    tags: ['Tech Stack', 'Cloud Access', 'Dev Tools'],
    gradient: `linear-gradient(135deg, ${C.primary}, ${C.mid})`,
    shadow: 'rgba(27, 70, 113, 0.25)',
  },
  {
    icon: '📣',
    title: 'Marketing Support',
    desc: 'Craft a compelling brand story that resonates with your audience. Our marketing support equips you with strategies to amplify your reach and impact.',
    tags: ['Brand Strategy', 'Digital Growth', 'Content'],
    gradient: `linear-gradient(135deg, ${C.accent}, #F7B733)`,
    shadow: 'rgba(245, 166, 35, 0.25)',
  },
  {
    icon: '⚖️',
    title: 'Legal Support',
    desc: "Navigate the complexities of startup law with confidence. Our legal support ensures you're protected, compliant, and ready to scale safely.",
    tags: ['Compliance', 'IP Protection', 'Contracts'],
    gradient: `linear-gradient(135deg, ${C.mid}, ${C.light})`,
    shadow: 'rgba(40, 123, 190, 0.22)',
  },
];

/* ── Animated counter hook ── */
const useCounter = (target, inView, duration = 1.8) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);
  return value;
};

/* ── Stat card with animated counter ── */
const StatCard = ({ num, label, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isPlus = num.endsWith('+');
  const target = parseInt(num.replace('+', ''));
  const count = useCounter(target, inView);

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
        {count}{isPlus ? '+' : ''}
      </div>
      <div style={{ fontSize: 13, color: C.muted, fontWeight: 600, lineHeight: 1.4 }}>
        {label}
      </div>
    </motion.div>
  );
};

/* ── Scroll-reveal wrapper ── */
const Reveal = ({ children, delay = 0, y = 32, x = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/* ── Animated ambient orb ── */
const Orb = ({ style, animate: anim, transition }) => (
  <motion.div
    animate={anim}
    transition={transition}
    style={{
      position: 'absolute',
      borderRadius: '50%',
      pointerEvents: 'none',
      filter: 'blur(40px)',
      ...style,
    }}
  />
);

/* ── Single service card ── */
const ServiceCard = ({ service, index }) => {
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
        boxShadow: hovered 
          ? `0 24px 48px ${service.shadow}, 0 0 0 1px ${service.shadow}` 
          : '0 12px 32px rgba(11, 30, 54, 0.03)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: service.gradient, transformOrigin: 'left' }}
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
          width: 64, height: 64, borderRadius: 18, background: service.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, marginBottom: 24, boxShadow: `0 8px 24px ${service.shadow}`,
          color: C.white,
        }}
      >
        {service.icon}
      </motion.div>

      <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 800, color: C.heading, lineHeight: 1.3 }}>
        {service.title}
      </h3>
      <p style={{ margin: '0 0 24px', fontSize: 15, color: C.text, lineHeight: 1.7, flexGrow: 1 }}>
        {service.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
        {service.tags.map((tag, i) => (
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

/* ══════════════════════════════
   MAIN PAGE
══════════════════════════════ */
const ServicesPage = () => {
  return (
    <section style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: C.heading, overflowX: 'hidden' }}>
      
      {/* ── HERO ── */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkMid} 100%)`,
        padding: 'clamp(80px, 12vw, 120px) 24px clamp(100px, 15vw, 140px)',
        overflow: 'hidden', textAlign: 'center',
      }}>
        <Orb
          style={{ top: -100, left: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(40, 123, 190, 0.25) 0%, transparent 70%)' }}
          animate={{ y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Orb
          style={{ bottom: -150, right: '5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(245, 166, 35, 0.15) 0%, transparent 70%)' }}
          animate={{ y: [0, -40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24, position: 'relative', zIndex: 2 }}
        >
          <div style={{ height: 2, width: 40, background: `linear-gradient(90deg, transparent, ${C.accent})` }} />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent }}>What We Offer</span>
          <div style={{ height: 2, width: 40, background: `linear-gradient(90deg, ${C.accent}, transparent)` }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ margin: '0 auto 16px', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, color: C.white, letterSpacing: '-1.5px', lineHeight: 1.1, position: 'relative', zIndex: 2, maxWidth: 900 }}
        >
          Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ margin: '0 auto 40px', fontSize: 'clamp(16px, 3vw, 20px)', color: '#CBD5E1', fontWeight: 400, position: 'relative', zIndex: 2, maxWidth: 700, lineHeight: 1.6 }}
        >
          We bring real solutions to each client's problems through a deep understanding of their market, product, and ultimate vision.
        </motion.p>
      </div>

      {/* ── MAIN CONTENT BLOCK (Overlaps Hero) ── */}
      <div style={{ background: C.bg, padding: '0 clamp(20px, 5vw, 32px) clamp(80px, 12vw, 120px)' }}>
        
        {/* CARDS GRID */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32,
          maxWidth: 1200, margin: '0 auto', marginTop: '-60px', position: 'relative', zIndex: 3
        }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* STATS ROW */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20,
          maxWidth: 1200, margin: '80px auto 0',
        }}>
          {[
            { num: '6',    label: 'Core Services',  delay: 0.0 },
            { num: '50+',  label: 'Startups Helped', delay: 0.1 },
            { num: '100+', label: 'Expert Mentors',  delay: 0.2 },
            { num: '5+',   label: 'Years Active',    delay: 0.3 },
          ].map((s, i) => (
            <StatCard key={i} num={s.num} label={s.label} delay={s.delay} />
          ))}
        </div>

        {/* BOTTOM CTA */}
        <Reveal delay={0.15} style={{ maxWidth: 1000, margin: '80px auto 0' }}>
          <div style={{
            background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkMid} 100%)`,
            borderRadius: 32, padding: 'clamp(48px, 8vw, 80px) clamp(24px, 6vw, 64px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            boxShadow: '0 24px 48px rgba(11, 30, 54, 0.15)',
          }}>
            <Orb
              style={{ top: -100, left: -50, width: 400, height: 400, background: 'radial-gradient(circle, rgba(40, 123, 190, 0.25) 0%, transparent 70%)' }}
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Orb
              style={{ bottom: -100, right: -50, width: 300, height: 300, background: 'radial-gradient(circle, rgba(245, 166, 35, 0.15) 0%, transparent 70%)' }}
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />

            <p style={{ margin: '0 0 12px', position: 'relative', zIndex: 2, fontSize: 13, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.accent }}>
              Start your journey
            </p>

            <h2 style={{ margin: '0 0 20px', position: 'relative', zIndex: 2, fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, color: C.white, letterSpacing: '-1px', lineHeight: 1.1 }}>
              Ready to Build Something Great?
            </h2>

            <p style={{ margin: '0 auto 40px', maxWidth: 540, fontSize: 18, color: '#E2EEF8', lineHeight: 1.6, position: 'relative', zIndex: 2 }}>
              Join G.Incube and get access to all the services and mentorship designed specifically to take your startup from a simple idea to a massive scale.
            </p>

            <motion.a
              href="#startup"
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(245, 166, 35, 0.35)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center',
                background: C.accent, color: C.dark, textDecoration: 'none',
                fontWeight: 800, fontSize: 16, padding: '16px 36px', borderRadius: 100,
                boxShadow: `0 8px 24px rgba(245, 166, 35, 0.25)`, transition: 'background 0.3s'
              }}
            >
              Apply for Incubation ↗
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesPage;