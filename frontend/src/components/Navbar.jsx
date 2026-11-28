import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowIcon, KeyIcon, ShieldIcon } from './Icons.jsx';

export default function Navbar({ user, onAuth, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner">
        <a
          className="brand"
          href="#top"
          onClick={() => setMenuOpen(false)}
          aria-label="ArchLab home"
        >
          <motion.span
            className="brand-mark"
            whileHover={{ rotate: 90, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          >
            <span className="brand-mark-inner" />
          </motion.span>
          <span className="brand-name">Arch<span>Lab</span></span>
        </a>

        <div className="nav-actions">
          {user ? (
            <>
              <a className="nav-link" href="#graphs">Workspace</a>
              <motion.span
                className="user-pill"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <ShieldIcon className="user-pill-icon" />
                {user.name}
              </motion.span>
              <motion.button
                className="button button-ghost button-small"
                onClick={onLogout}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Sign out
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                className="nav-link nav-signin"
                onClick={() => onAuth('login')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Sign in
              </motion.button>
              <motion.button
                className="button button-primary button-small"
                onClick={() => onAuth('signup')}
                whileHover={{ y: -2, boxShadow: '0 12px 30px -10px rgba(110, 122, 255, 0.85)' }}
                whileTap={{ scale: 0.96 }}
              >
                Get started
                <KeyIcon className="button-icon" />
              </motion.button>
            </>
          )}
        </div>

        <motion.button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} />
          <motion.span animate={menuOpen ? { opacity: 0, x: -12 } : { opacity: 1, x: 0 }} />
          <motion.span animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} />
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {!user && (
              <motion.button
                className="button button-primary"
                onClick={() => {
                  setMenuOpen(false);
                  onAuth('signup');
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                Get started
                <ArrowIcon className="button-icon" />
              </motion.button>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
