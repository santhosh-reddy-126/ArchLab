import { motion } from 'framer-motion';
import { ArrowIcon, CheckIcon } from './Icons.jsx';

export default function CallToAction({ user, onAuth }) {
  return (
    <section className="section cta-section">
      <motion.div
        className="cta-card"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="cta-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <div className="cta-content">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready when you are
          </motion.span>
          <h2>Stop guessing where your system breaks.</h2>
          <p>Draw your next high-level design and let the simulation find the weak link for you.</p>
          <motion.button
            className="button button-light button-large"
            onClick={() => onAuth(user ? null : 'signup')}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {user ? <CheckIcon className="button-icon" /> : <ArrowIcon className="button-icon" />}
            {user ? `Signed in as ${user.name}` : 'Create your workspace'}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
