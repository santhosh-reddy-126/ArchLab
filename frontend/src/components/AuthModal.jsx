import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { login, signUp } from '../lib/api.js';
import { EyeIcon, EyeOffIcon, KeyIcon, ShieldIcon } from './Icons.jsx';

export default function AuthModal({ mode, onClose, onModeChange, onAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef(null);
  const isSignUp = mode === 'signup';

  useEffect(() => {
    setUsername('');
    setPassword('');
    setError('');
    setShowPassword(false);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 280);
    return () => window.clearTimeout(timer);
  }, [mode]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function handleKey(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.');
      setAttempts((value) => value + 1);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setAttempts((value) => value + 1);
      return;
    }

    setBusy(true);
    try {
      const result = isSignUp
        ? await signUp(username.trim(), password)
        : await login(username.trim(), password);
      onAuthenticated(result, mode);
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong. Please try again.');
      setAttempts((value) => value + 1);
    } finally {
      setBusy(false);
    }
  }

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-label={isSignUp ? 'Create an account' : 'Sign in'}
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">
          <span />
          <span />
        </button>

        <motion.div
          className="auth-icon"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ShieldIcon />
        </motion.div>

        <h2>{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
        <p className="auth-subtitle">
          {isSignUp
            ? 'Create a workspace for your HLD plans.'
            : 'Sign in to open your saved designs.'}
        </p>

        <div className="auth-switch" role="tablist" aria-label="Authentication mode">
          {['login', 'signup'].map((value) => (
            <button
              key={value}
              role="tab"
              aria-selected={mode === value}
              className={mode === value ? 'active' : ''}
              onClick={() => onModeChange(value)}
            >
              {mode === value && (
                <motion.span className="auth-switch-pill" layoutId="auth-switch-pill" />
              )}
              <span className="auth-switch-label">{value === 'login' ? 'Sign in' : 'Sign up'}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              className="auth-fields"
              initial={{ opacity: 0, x: isSignUp ? 28 : -28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignUp ? -28 : 28 }}
              transition={{ duration: 0.25 }}
            >
              <label className="field">
                <span>Username</span>
                <motion.input
                  ref={inputRef}
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="your-username"
                  autoComplete="username"
                  whileFocus={{ scale: 1.01 }}
                />
              </label>

              <label className="field">
                <span>Password</span>
                <div className="password-field">
                  <motion.input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="at least 6 characters"
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    whileTap={{ scale: 0.85 }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </motion.button>
                </div>
              </label>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                key={`${error}-${attempts}`}
                className="auth-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, x: [0, -7, 7, -4, 4, 0], y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="button button-primary auth-submit"
            type="submit"
            disabled={busy}
            whileHover={busy ? {} : { y: -2 }}
            whileTap={busy ? {} : { scale: 0.98 }}
          >
            {busy ? (
              <>
                <motion.span
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                {isSignUp ? 'Creating account...' : 'Signing in...'}
              </>
            ) : (
              <>
                <KeyIcon className="button-icon" />
                {isSignUp ? 'Create account' : 'Sign in'}
              </>
            )}
          </motion.button>
        </form>

        <p className="auth-note">
          <ShieldIcon />
          Your design workspace is protected with BCrypt and signed JWT sessions.
        </p>
      </motion.div>
    </motion.div>
  );
}
