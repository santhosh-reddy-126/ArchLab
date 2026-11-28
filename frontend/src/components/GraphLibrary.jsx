import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createGraphMeta, getGraphMeta, searchGraphMeta } from '../lib/api.js';
import { ArrowIcon, DatabaseIcon, LayersIcon, ShieldIcon } from './Icons.jsx';

export default function GraphLibrary({ user, onAuth, notify }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setResults([]);
      setSelected(null);
      return undefined;
    }

    let active = true;
    setBusy(true);
    setError('');

    searchGraphMeta('')
      .then((data) => {
        if (active) setResults(Array.isArray(data?.data) ? data.data : []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'Unable to load graphs.');
      })
      .finally(() => {
        if (active) setBusy(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  async function run(action) {
    setBusy(true);
    setError('');
    try {
      return await action();
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong. Please try again.');
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function refreshGraphs(filter = searchTitle) {
    const data = await run(() => searchGraphMeta(filter.trim()));
    if (data) setResults(Array.isArray(data?.data) ? data.data : []);
  }

  async function handleSearch(event) {
    event.preventDefault();
    setSelected(null);
    await refreshGraphs();
  }

  async function handleClear() {
    setSearchTitle('');
    setSelected(null);
    await refreshGraphs('');
  }

  async function selectGraph(graph) {
    const found = await run(() => getGraphMeta(graph.id));
    if (found) setSelected(found);
  }

  async function handleCreate(event) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are both required.');
      return;
    }

    const created = await run(() => createGraphMeta(title.trim(), description.trim()));
    if (!created) return;

    setTitle('');
    setDescription('');
    notify('success', `Graph "${created.title}" created.`);
    await refreshGraphs();
    await selectGraph(created);
  }

  return (
    <section className="library-section" id="graphs">
      {!user ? (
        <motion.div
          className="library-gate"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="library-gate-icon"><ShieldIcon /></span>
          <h3>Sign in to open your library</h3>
          <p>Graphs are private to your account. Sign in to create and browse them.</p>
          <motion.button
            className="button button-primary"
            onClick={() => onAuth('login')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Sign in
            <ArrowIcon className="button-icon" />
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="library-shell"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="library-body">
            <div className="library-panel">
              <form onSubmit={handleCreate} noValidate>
                <span className="panel-label">New graph</span>
                <label className="field">
                  <span>Title</span>
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="checkout-flow.hld"
                  />
                </label>
                <label className="field">
                  <span>Description</span>
                  <input
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="What does this design model?"
                  />
                </label>
                <motion.button
                  type="submit"
                  className="button button-primary library-submit"
                  disabled={busy}
                  whileHover={busy ? {} : { y: -2 }}
                  whileTap={busy ? {} : { scale: 0.97 }}
                >
                  {busy ? <span className="spinner" /> : <LayersIcon className="button-icon" />}
                  {busy ? 'Creating...' : 'Create graph'}
                </motion.button>
              </form>

              <AnimatePresence>
                {error && (
                  <motion.div
                    key={error}
                    className="library-error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="library-results">
              <div className="library-results-head">
                <span className="panel-label">Saved designs</span>
                <span className="library-count">{results.length} shown</span>
              </div>

              <form className="library-search" onSubmit={handleSearch}>
                <input
                  value={searchTitle}
                  onChange={(event) => setSearchTitle(event.target.value)}
                  placeholder="Filter by title"
                  aria-label="Search graphs by title"
                />
                <motion.button
                  type="submit"
                  className="studio-button"
                  disabled={busy}
                  whileHover={busy ? {} : { y: -1 }}
                  whileTap={busy ? {} : { scale: 0.97 }}
                >
                  <DatabaseIcon className="studio-run-icon" />
                  Search
                </motion.button>
                {searchTitle && (
                  <button
                    type="button"
                    className="library-clear"
                    onClick={handleClear}
                  >
                    Show all
                  </button>
                )}
              </form>

              {results.length > 0 ? (
                <div className="library-list">
                  {results.map((graph) => (
                    <motion.button
                      type="button"
                      key={graph.id}
                      className={`library-item ${selected?.id === graph.id ? 'item-selected' : ''}`}
                      onClick={() => selectGraph(graph)}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="library-item-icon"><LayersIcon /></span>
                      <span className="library-item-text">
                        <strong>{graph.title}</strong>
                        <small>{graph.description}</small>
                      </span>
                      <ArrowIcon className="library-item-arrow" />
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="library-empty">
                  <LayersIcon />
                  <p>
                    {searchTitle.trim()
                      ? 'No graphs matched that title.'
                      : 'No graphs here yet. Create your first design.'}
                  </p>
                </div>
              )}

              <AnimatePresence mode="wait">
                {selected && (
                  <motion.div
                    key="selected"
                    className="library-detail-card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="panel-label">Selected design</span>
                    <div className="library-item library-detail-item">
                      <span className="library-item-icon"><DatabaseIcon /></span>
                      <span className="library-item-text">
                        <strong>{selected.title}</strong>
                        <small>{selected.description}</small>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
