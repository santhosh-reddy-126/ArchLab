import { motion } from 'framer-motion';
import { BoltIcon, CodeIcon, KeyIcon, LayersIcon, ShieldIcon, SparkIcon } from './Icons.jsx';

const features = [
  {
    icon: LayersIcon,
    title: 'Draw at the speed of thought',
    text: 'Drop services, databases, caches and queues onto a canvas and connect them in seconds.',
    tone: 'violet',
  },
  {
    icon: BoltIcon,
    title: 'Simulate real traffic',
    text: 'Ramp load through your design and watch requests travel across every edge in real time.',
    tone: 'blue',
  },
  {
    icon: ShieldIcon,
    title: 'Spot the breaking point',
    text: 'See the first component that saturates, then follow the cascade downstream.',
    tone: 'mint',
  },
  {
    icon: SparkIcon,
    title: 'Understand the why',
    text: 'Plain-language findings explain missing replicas, hot caches and retry storms.',
    tone: 'amber',
  },
  {
    icon: CodeIcon,
    title: 'Review as a team',
    text: 'Share the plan and its simulation report so design reviews start with evidence.',
    tone: 'pink',
  },
  {
    icon: KeyIcon,
    title: 'Workspaces you control',
    text: 'Sign in to keep your designs in a protected workspace with familiar auth.',
    tone: 'violet',
  },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const card = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="section-head">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Made for system design
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
        >
          Design reviews,
          <br />
          minus the guesswork.
        </motion.h2>
        <motion.p
          className="section-lead"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
        >
          Everything you need to sketch a high-level design and prove where it fails.
        </motion.p>
      </div>

      <motion.div
        className="feature-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.article
              className={`feature-card tone-${feature.tone}`}
              key={feature.title}
              variants={card}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <motion.div className="feature-icon" whileHover={{ rotate: -10, scale: 1.1 }}>
                <Icon />
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <span className="feature-glow" />
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
