import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';

const stats = [
  { value: 8, suffix: '', label: 'Node types' },
  { value: 3, suffix: '', label: 'Failure modes' },
  { value: 1, suffix: '', label: 'Click to simulate' },
  { value: 100, suffix: '%', label: 'Designs explained' },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, {
      duration: 1.7,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="stat-value">
      {Math.round(display)}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section stats-section" id="numbers">
      <motion.div
        className="stats-panel"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="stats-intro">
          <span className="eyebrow">By the numbers</span>
          <h2>A small model that explains a big system.</h2>
          <p>Every component, every request path and every failure in one clear view.</p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              className="stat"
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
