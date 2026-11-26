import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowIcon, BoltIcon, CheckIcon, LayersIcon, ShieldIcon, SparkIcon } from './Icons.jsx';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ onAuth }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), {
    stiffness: 130,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-11, 11]), {
    stiffness: 130,
    damping: 18,
  });

  function handlePointerMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section className="hero" id="top" ref={heroRef}>
      <motion.div
        className="hero-inner"
        style={{ y: heroY, opacity: heroOpacity }}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetPointer}
      >
        <motion.div className="hero-copy" variants={container} initial="hidden" animate="visible">
          <motion.div className="hero-badge" variants={item}>
            <span className="pulse-dot" />
            ArchLab Studio preview is live
            <ArrowIcon className="badge-arrow" />
          </motion.div>

          <motion.h1 variants={item}>
            Draw the plan.
            <br />
            <span className="gradient-text">Break it safely.</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={item}>
            Map your high-level design, run a traffic simulation and see exactly where the
            system gives up — before your users find out for you.
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            <motion.button
              className="button button-primary button-large"
              onClick={() => onAuth('signup')}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Start designing
              <ArrowIcon className="button-icon" />
            </motion.button>
          </motion.div>

          <motion.div className="hero-proof" variants={item}>
            {[
              { icon: <LayersIcon />, label: 'Drag-and-drop canvas' },
              { icon: <BoltIcon />, label: 'Live simulation' },
              { icon: <ShieldIcon />, label: 'Failure insights' },
            ].map((proof) => (
              <span key={proof.label}>
                {proof.icon}
                {proof.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual-wrap"
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="hero-card card-failure"
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
          >
            <div className="card-topbar">
              <span className="window-dots"><i /><i /><i /></span>
              <span className="card-path">simulation / checkout-flow.hld</span>
              <span className="card-status"><span /> BREAK POINT</span>
            </div>

            <div className="card-body">
              <motion.div
                className="code-line"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="code-key">traffic</span>
                <span className="code-muted">:</span>
                <span className="code-value">"12,000 req/min"</span>
              </motion.div>
              <motion.div
                className="code-line"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.72 }}
              >
                <span className="code-key">duration</span>
                <span className="code-muted">:</span>
                <span className="code-value">"90s ramp"</span>
              </motion.div>

              <div className="card-divider" />

              <motion.div
                className="token-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="token-label">
                  <SparkIcon />
                  First failure at 00:47
                </div>
                <div className="token-string">
                  <span>orders-db → connection pool exhausted</span>
                  <motion.span
                    className="token-sweep"
                    animate={{ x: ['-120%', '320%'] }}
                    transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>

              <div className="card-checks">
                {['No read replica', 'Cache miss storm', 'Retry avalanche'].map((label, index) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.12 }}
                  >
                    <CheckIcon />
                    {label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="float-chip chip-one"
            animate={{ y: [0, -14, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <LayersIcon />
            Drag nodes freely
          </motion.div>
          <motion.div
            className="float-chip chip-two"
            animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BoltIcon />
            Simulate in one click
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  );
}
