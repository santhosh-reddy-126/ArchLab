import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthModal from './components/AuthModal.jsx';
import Background from './components/Background.jsx';
import GraphLibrary from './components/GraphLibrary.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Toast from './components/Toast.jsx';
import { SESSION_KEY } from './lib/api.js';

function readSession() {
  try {
    const stored = window.localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState(readSession);
  const [authMode, setAuthMode] = useState('login');
  const [authOpen, setAuthOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const notify = useCallback((type, message) => {
    setToast({ id: Date.now(), type, message });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!user) return;
    window.requestAnimationFrame(() => {
      document.getElementById('graphs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [user]);

  function openAuth(mode) {
    if (!mode) {
      notify('info', 'You are already signed in.');
      return;
    }
    setAuthMode(mode);
    setAuthOpen(true);
  }

  function handleAuthenticated(data, mode) {
    if (mode === 'login') {
      const session = { name: data.name, token: data.jwtToken };
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(session);
      setAuthOpen(false);
      notify('success', `Welcome back, ${session.name}. You are signed in.`);
      return;
    }
    setAuthMode('login');
    notify('success', `Account created for ${data.username}. Sign in to continue.`);
  }

  function handleLogout() {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    notify('info', 'You have been signed out.');
  }

  return (
    <>
      <Background />

      <Navbar user={user} onAuth={openAuth} onLogout={handleLogout} />

      <main>
        {!user && <Hero onAuth={openAuth} />}
        <GraphLibrary user={user} onAuth={openAuth} notify={notify} />
      </main>

      <AnimatePresence>
        {authOpen && (
          <AuthModal
            mode={authMode}
            onClose={closeAuth}
            onModeChange={setAuthMode}
            onAuthenticated={handleAuthenticated}
          />
        )}
      </AnimatePresence>

      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  );
}
