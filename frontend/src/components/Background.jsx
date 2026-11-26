import { motion, useScroll, useTransform } from 'framer-motion';

export default function Background() {
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], ['0px', '260px']);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <div className="site-background" aria-hidden="true">
      <motion.div className="bg-grid" style={{ backgroundPositionY: gridY }} />
      <motion.div className="bg-glow" style={{ y: glowY }} />
      <motion.div
        className="orb orb-one"
        animate={{ x: [0, 90, 20, 0], y: [0, -60, 40, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb orb-two"
        animate={{ x: [0, -70, 30, 0], y: [0, 70, -30, 0], scale: [1, 0.9, 1.2, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb orb-three"
        animate={{ x: [0, 40, -60, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
