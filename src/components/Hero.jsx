import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════
   BRAND TOKENS (Modern Navy Blue & Golden Orange)
═══════════════════════════════════════════════════ */
const C = {
  primary:   '#15436B', // Deep Navy Blue
  mid:       '#1C5A8F', // Mid Blue
  light:     '#287BBE', // Lighter Blue
  pale:      '#D0E2F2', // Pale Blue for borders/accents
  lt:        '#F0F6FB', // Lightest tint for backgrounds
  dark:      '#0A2236', // Darkest Blue
  darkMid:   '#0E2E4A',
  heading:   '#0D1F2D', // Near black slate for headings
  text:      '#475569', // Modern slate gray for readability
  muted:     '#64748B', // Muted text
  accent:    '#EA9F24', // Golden Orange
  accentLight:'#F3C57B', // Light Orange
  accentPale: '#FDF5E8', // Very light orange background
  bg:        '#F8FAFC', // Ultra-light modern background
  white:     '#FFFFFF',
};

/* ═══════════════════════════════════════════════════
   TYPEWRITER HOOK  (fixed, no stale-closure bugs)
═══════════════════════════════════════════════════ */
const WORDS = ['Entrepreneurs', 'Innovators', 'Startups', 'Changemakers', 'Visionaries'];

const useTypewriter = (words = WORDS, speed = 72, pause = 2000) => {
  const [display, setDisplay] = useState('');
  const state = useRef({ wordIdx: 0, charIdx: 0, deleting: false, paused: false });

  useEffect(() => {
    let raf;
    let lastTime = 0;

    const tick = (now) => {
      const s = state.current;
      const delay = s.paused ? pause : s.deleting ? speed * 0.45 : speed;
      if (now - lastTime < delay) { raf = requestAnimationFrame(tick); return; }
      lastTime = now;

      const word = words[s.wordIdx];

      if (s.paused) {
        s.paused = false;
        s.deleting = true;
        raf = requestAnimationFrame(tick);
        return;
      }

      if (!s.deleting) {
        s.charIdx = Math.min(s.charIdx + 1, word.length);
        setDisplay(word.slice(0, s.charIdx));
        if (s.charIdx === word.length) s.paused = true;
      } else {
        s.charIdx = Math.max(s.charIdx - 1, 0);
        setDisplay(word.slice(0, s.charIdx));
        if (s.charIdx === 0) {
          s.deleting = false;
          s.wordIdx = (s.wordIdx + 1) % words.length;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [words, speed, pause]);

  return display;
};

/* ═══════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════ */
const Counter = ({ to, suffix = '', duration = 2.2, delay = 0.8 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          const c = animate(0, to, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: v => setVal(Math.round(v)),
          });
          return () => c.stop();
        }, delay * 1000);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, delay]);

  return <span ref={ref}>{val}{suffix}</span>;
};

/* ═══════════════════════════════════════════════════
   FLOATING PARTICLE
═══════════════════════════════════════════════════ */
const Particle = ({ x, y, size, color, delay, duration }) => (
  <motion.div
    style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: size, height: size,
      background: color, borderRadius: '50%',
      pointerEvents: 'none', zIndex: 1,
    }}
    animate={{ y: [0, -28, 0], opacity: [0.35, 0.85, 0.35], scale: [1, 1.25, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

/* ═══════════════════════════════════════════════════
   SHIMMER BUTTON
═══════════════════════════════════════════════════ */
const ShimmerBtn = ({ children, href, onClick, secondary = false, style = {} }) => {
  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      href={href}
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '15px 34px', borderRadius: 100,
        fontWeight: 700, fontSize: 15,
        fontFamily: 'inherit', cursor: 'pointer',
        textDecoration: 'none', border: 'none',
        letterSpacing: '0.01em',
        ...(secondary ? {
          background: C.white,
          border: `1.5px solid rgba(234, 159, 36, 0.4)`,
          color: C.primary,
          boxShadow: '0 4px 14px rgba(21, 67, 107, 0.05)',
        } : {
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.light} 100%)`,
          color: C.white,
          boxShadow: `0 10px 32px rgba(21, 67, 107, 0.35)`,
        }),
        ...style,
      }}
    >
      {/* shimmer sweep — only on primary */}
      {!secondary && (
        <motion.span
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)',
            transform: 'translateX(-100%)',
          }}
          animate={{ transform: ['translateX(-100%)', 'translateX(200%)'] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        {children}
      </span>
    </Tag>
  );
};

/* ═══════════════════════════════════════════════════
   FLOATING BADGE CARD
═══════════════════════════════════════════════════ */
const FloatingCard = ({ icon, title, sub, side, mouseX, mouseY, delay }) => {
  const factor = side === 'left' ? -0.28 : 0.28;
  const tx = useTransform(mouseX, v => v * factor);
  const ty = useTransform(mouseY, v => v * -0.18);

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -44 : 44, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: side === 'left' ? '30%' : '22%',
        [side]: 'clamp(12px, 4vw, 64px)',
        display: 'none', // overridden below via className logic
        zIndex: 10,
        x: tx, y: ty,
      }}
      className="floating-badge"
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${C.lt}`,
          borderRadius: 18, padding: '14px 18px',
          boxShadow: '0 12px 36px rgba(21, 67, 107, 0.08)',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: 26 }}>{icon}</span>
        <div>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: C.heading, lineHeight: 1.2 }}>{title}</p>
          <p style={{ margin: '3px 0 0', fontSize: 12, color: C.accent, fontWeight: 700 }}>{sub}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════
   WAVY SVG UNDERLINE (Updated to Orange)
═══════════════════════════════════════════════════ */
const WavyUnderline = () => (
  <motion.svg
    width="100%" height="10" viewBox="0 0 320 10"
    preserveAspectRatio="none"
    style={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    <motion.path
      d="M0 6 Q40 1 80 6 Q120 11 160 6 Q200 1 240 6 Q280 11 320 6"
      stroke={`rgba(234, 159, 36, 0.7)`}
      strokeWidth="3.5"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
    />
  </motion.svg>
);

/* ═══════════════════════════════════════════════════
   STAT ITEM
═══════════════════════════════════════════════════ */
const StatItem = ({ value, suffix, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ textAlign: 'center', minWidth: 80 }}
  >
    <p style={{ margin: 0, fontSize: 'clamp(28px,4vw,40px)', fontWeight: 900, color: C.heading, lineHeight: 1 }}>
      <Counter to={value} suffix={suffix} delay={delay} />
    </p>
    <p style={{ margin: '6px 0 0', fontSize: 13, color: C.muted, fontWeight: 600, lineHeight: 1.4 }}>
      {label}
    </p>
  </motion.div>
);

/* ═══════════════════════════════════════════════════
   PARTICLES CONFIG (Mixed Blue & Orange)
═══════════════════════════════════════════════════ */
const PARTICLES = [
  { x: 7,  y: 18, size: 10, color: 'rgba(21, 67, 107, 0.15)', delay: 0,   duration: 4.2 },
  { x: 91, y: 13, size: 13, color: 'rgba(234, 159, 36, 0.25)', delay: 0.6, duration: 5.1 }, // Orange
  { x: 13, y: 78, size: 8,  color: 'rgba(40, 123, 190, 0.2)', delay: 1.1, duration: 3.7 },
  { x: 86, y: 72, size: 11, color: 'rgba(21, 67, 107, 0.12)', delay: 0.9, duration: 4.6 },
  { x: 48, y: 88, size: 6,  color: 'rgba(234, 159, 36, 0.3)',  delay: 1.6, duration: 3.1 }, // Orange
  { x: 72, y: 28, size: 9,  color: 'rgba(28, 90, 143, 0.18)', delay: 0.4, duration: 4.9 },
  { x: 28, y: 45, size: 7,  color: 'rgba(21, 67, 107, 0.1)',  delay: 1.3, duration: 3.4 },
  { x: 60, y: 10, size: 5,  color: 'rgba(234, 159, 36, 0.2)',  delay: 0.2, duration: 5.5 }, // Orange
];

/* ═══════════════════════════════════════════════════
   MAIN HERO COMPONENT
═══════════════════════════════════════════════════ */
const Hero = () => {
  const typed = useTypewriter(WORDS);
  const heroRef = useRef(null);

  /* Spring-smoothed mouse parallax */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 18 };
  const mouseX = useSpring(rawX, springConfig);
  const mouseY = useSpring(rawY, springConfig);

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 24);
    rawY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 24);
  }, [rawX, rawY]);

  /* Stagger variants */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <>
      <style>{`
        @media (min-width: 1024px) { .floating-badge { display: block !important; } }
        .hero-stat-divider { display: none; }
        @media (min-width: 640px) { .hero-stat-divider { display: block; } }
      `}</style>

      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{
          position: 'relative',
          minHeight: '100vh',
          paddingTop: 'clamp(96px, 12vw, 148px)',
          paddingBottom: 'clamp(72px, 9vw, 120px)',
          overflow: 'hidden',
          background: C.bg,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >

        {/* Radial glow from top */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 72% 48% at 50% 0%, rgba(21, 67, 107, 0.04) 0%, transparent 70%)',
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: `linear-gradient(to top, ${C.bg}, transparent)`,
          zIndex: 10, pointerEvents: 'none',
        }} />

        {/* ── Floating orbs (parallax) ── */}
        <motion.div
          style={{
            position: 'absolute', top: -100, left: -120,
            width: 440, height: 440, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(21, 67, 107, 0.08) 0%, transparent 70%)`,
            pointerEvents: 'none', zIndex: 0,
            x: useTransform(mouseX, v => v * -0.5),
            y: useTransform(mouseY, v => v * -0.5),
          }}
        />
        <motion.div
          style={{
            position: 'absolute', bottom: -80, right: -100,
            width: 380, height: 380, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(234, 159, 36, 0.06) 0%, transparent 70%)`, // Orange Glow
            pointerEvents: 'none', zIndex: 0,
            x: useTransform(mouseX, v => v * 0.4),
            y: useTransform(mouseY, v => v * 0.4),
          }}
        />

        {/* Slowly rotating large blobs */}
        <motion.div
          style={{
            position: 'absolute', top: -140, left: -140,
            width: 420, height: 420, borderRadius: '50%',
            background: C.primary, opacity: 0.03,
            filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
          }}
          animate={{ scale: [1, 1.12, 1], rotate: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute', bottom: -100, right: -100,
            width: 360, height: 360, borderRadius: '50%',
            background: C.accent, opacity: 0.04, // Orange Blob
            filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
          }}
          animate={{ scale: [1, 1.18, 1], rotate: [0, -22, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* ── Particles ── */}
        {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

        {/* ── Floating badge cards ── */}
        <FloatingCard icon="🏆" title="Top Incubator" sub="MP Govt. Recognized" side="left"  mouseX={mouseX} mouseY={mouseY} delay={1.3} />
        <FloatingCard icon="💡" title="₹2Cr+ Funding" sub="Raised by our cohort" side="right" mouseX={mouseX} mouseY={mouseY} delay={1.5} />

        {/* ── MAIN CONTENT ── */}
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 32px)',
          position: 'relative', zIndex: 5,
        }}>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto' }}
          >
            {/* Eyebrow pill */}
            <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
              <motion.span
                animate={{ boxShadow: [`0 0 0 0px rgba(21, 67, 107, 0.0)`, `0 0 0 6px rgba(21, 67, 107, 0.08)`, `0 0 0 0px rgba(21, 67, 107, 0.0)`] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: C.white,
                  border: `1px solid ${C.pale}`,
                  borderRadius: 100, padding: '8px 20px',
                  fontSize: 12.5, fontWeight: 700,
                  color: C.primary, letterSpacing: '0.06em',
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent, display: 'inline-block' }}
                />
                Gwalior Smart City Initiative
              </motion.span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(36px, 7vw, 72px)',
                fontWeight: 900, color: C.heading,
                letterSpacing: '-1.5px', lineHeight: 1.07,
                margin: '0 0 6px',
              }}
            >
              Empowering
            </motion.h1>

            {/* Typewriter line */}
            <motion.div
              variants={fadeUp}
              style={{ position: 'relative', display: 'inline-block', marginBottom: 6 }}
            >
              <h1 style={{
                fontSize: 'clamp(36px, 7vw, 72px)',
                fontWeight: 900, color: C.accent, // Now uses the Orange accent color
                letterSpacing: '-1.5px', lineHeight: 1.07,
                margin: 0, minHeight: '1.1em',
                position: 'relative',
              }}>
                {typed}
                {/* blinking cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.75, repeat: Infinity }}
                  style={{
                    display: 'inline-block', width: 3,
                    height: '0.82em', background: C.accent,
                    marginLeft: 3, verticalAlign: 'text-bottom',
                    borderRadius: 2,
                  }}
                />
                <WavyUnderline />
              </h1>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(36px, 7vw, 72px)',
                fontWeight: 900, color: C.heading,
                letterSpacing: '-1.5px', lineHeight: 1.07,
                margin: '0 0 24px',
              }}
            >
              to Build Tomorrow
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(15px, 2.2vw, 19px)',
                color: C.text, lineHeight: 1.82,
                maxWidth: 640, margin: '0 auto 40px',
                fontWeight: 400,
              }}
            >
              G.Incube the Gwalior Smart City Incubation Center - provides resources,
              mentorship, and a launchpad to turn your boldest ideas into thriving ventures.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex', flexWrap: 'wrap',
                justifyContent: 'center', gap: 14,
                marginBottom: 56,
              }}
            >
              <ShimmerBtn href="https://gincube.org/startup-registration">
                Apply for Incubation
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </ShimmerBtn>

              <ShimmerBtn secondary>
                <span style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: C.accentPale,
                  color: C.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13,
                }}>
                  ▶
                </span>
                Watch Demo
              </ShimmerBtn>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex', flexWrap: 'wrap',
                justifyContent: 'center', alignItems: 'center',
                gap: 'clamp(20px, 5vw, 52px)',
              }}
            >
              <StatItem value={120} suffix="+"  label="Startups Incubated" delay={0.9} />

              <div className="hero-stat-divider" style={{
                width: 1, height: 44,
                background: `linear-gradient(to bottom, transparent, ${C.pale}, transparent)`,
              }} />

              <StatItem value={85}  suffix="%" label="Success Rate"        delay={1.0} />

              <div className="hero-stat-divider" style={{
                width: 1, height: 44,
                background: `linear-gradient(to bottom, transparent, ${C.pale}, transparent)`,
              }} />

              <StatItem value={50}  suffix="+" label="Expert Mentors"      delay={1.1} />

              <div className="hero-stat-divider" style={{
                width: 1, height: 44,
                background: `linear-gradient(to bottom, transparent, ${C.pale}, transparent)`,
              }} />

              <StatItem value={5}   suffix="+" label="Years of Impact"     delay={1.2} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            style={{
              marginTop: 'clamp(48px, 6vw, 64px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8,
            }}
          >
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;