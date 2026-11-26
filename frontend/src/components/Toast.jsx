import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ShieldIcon } from './Icons.jsx';

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(onDismiss, 4500);
    return () => window.clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div className="toast-region" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <motion.span className="toast-icon" animate={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 0.6 }}>
              {toast.type === 'success' ? <CheckIcon /> : <ShieldIcon />}
            </motion.span>
            <span>{toast.message}</span>
            <motion.span
              className="toast-progress"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4.5, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
