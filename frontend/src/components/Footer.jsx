import { motion } from 'framer-motion';
import { ArrowUpIcon, ShieldIcon } from './Icons.jsx';

const groups = [
  { title: 'Product', links: ['Studio', 'Features', 'How it works'] },
  { title: 'Resources', links: ['Node guide', 'Simulation modes', 'API reference'] },
  { title: 'Company', links: ['About', 'Contact', 'Privacy'] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand">
            <motion.span className="brand-mark" whileHover={{ rotate: 90 }}>
              <span className="brand-mark-inner" />
            </motion.span>
            <span className="brand-name">Arch<span>Lab</span></span>
          </div>
          <p>Draw it. Simulate it. Fix it before production.</p>
          <span className="footer-status"><span className="pulse-dot" /> Simulation engine ready</span>
        </div>

        <div className="footer-groups">
          {groups.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              {group.links.map((link) => (
                <motion.a key={link} href="#top" whileHover={{ x: 4 }}>
                  {link}
                </motion.a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ArchLab. Design with evidence.</span>
        <span className="footer-secure"><ShieldIcon /> JWT &amp; BCrypt protected</span>
        <motion.a
          href="#top"
          className="footer-top"
          whileHover={{ y: -4 }}
          aria-label="Back to top"
        >
          <ArrowUpIcon />
        </motion.a>
      </div>
    </footer>
  );
}
