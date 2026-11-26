import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BoltIcon,
  ClientIcon,
  CloudIcon,
  DatabaseIcon,
  QueueIcon,
  ServerIcon,
  ShieldIcon,
} from './Icons.jsx';

const BOARD_WIDTH = 900;
const BOARD_HEIGHT = 440;
const NODE_WIDTH = 136;
const NODE_HEIGHT = 58;

const nodeTypes = {
  client: { label: 'Client', icon: ClientIcon, tone: 'blue' },
  gateway: { label: 'Gateway', icon: CloudIcon, tone: 'violet' },
  service: { label: 'Service', icon: ServerIcon, tone: 'mint' },
  cache: { label: 'Cache', icon: BoltIcon, tone: 'amber' },
  queue: { label: 'Queue', icon: QueueIcon, tone: 'pink' },
  database: { label: 'Database', icon: DatabaseIcon, tone: 'violet' },
};

const palette = ['client', 'gateway', 'service', 'cache', 'queue', 'database'];

const initialNodes = [
  { id: 'client', type: 'client', label: 'Web client', x: 28, y: 180 },
  { id: 'gateway', type: 'gateway', label: 'API gateway', x: 210, y: 180 },
  { id: 'orders', type: 'service', label: 'Orders service', x: 400, y: 90 },
  { id: 'catalog', type: 'service', label: 'Catalog service', x: 400, y: 270 },
  { id: 'cache', type: 'cache', label: 'Redis cache', x: 590, y: 270 },
  { id: 'db', type: 'database', label: 'Orders DB', x: 590, y: 90 },
  { id: 'queue', type: 'queue', label: 'Event queue', x: 750, y: 180 },
];

const initialEdges = [
  ['client', 'gateway'],
  ['gateway', 'orders'],
  ['gateway', 'catalog'],
  ['orders', 'db'],
  ['catalog', 'cache'],
  ['orders', 'queue'],
];

const findings = [
  'Connection pool saturates before traffic reaches the queue.',
  'No read replica is available on the orders path.',
  'Retries from the gateway amplify load by 2.3x.',
];

const metrics = [
  { label: 'DB saturation', value: 94 },
  { label: 'Cache hit rate', value: 62 },
  { label: 'Failed requests', value: 18 },
];

const statusText = {
  idle: 'Design ready',
  running: 'Simulating traffic flow',
  failed: 'Break point detected',
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function edgePath(from, to) {
  if (!from || !to) return null;
  const x1 = from.x + NODE_WIDTH;
  const y1 = from.y + NODE_HEIGHT / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_HEIGHT / 2;
  const middle = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${middle} ${y1}, ${middle} ${y2}, ${x2} ${y2}`;
}

export default function Studio() {
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedId, setSelectedId] = useState(null);
  const [phase, setPhase] = useState('idle');
  const boardRef = useRef(null);
  const dragRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const nodesById = useMemo(
    () => Object.fromEntries(nodes.map((node) => [node.id, node])),
    [nodes],
  );

  const edges = initialEdges
    .map(([from, to]) => ({ from, to, path: edgePath(nodesById[from], nodesById[to]) }))
    .filter((edge) => edge.path);

  const selectedNode = nodesById[selectedId];
  const SelectedIcon = selectedNode ? nodeTypes[selectedNode.type].icon : null;

  function runSimulation() {
    window.clearTimeout(timerRef.current);
    setSelectedId(null);
    setPhase('running');
    timerRef.current = window.setTimeout(() => setPhase('failed'), 2400);
  }

  function resetDesign() {
    window.clearTimeout(timerRef.current);
    setNodes(initialNodes);
    setSelectedId(null);
    setPhase('idle');
  }

  function addNode(type) {
    const id = `${type}-${Date.now()}`;
    const index = nodes.length % 4;
    setNodes((current) => [
      ...current,
      {
        id,
        type,
        label: nodeTypes[type].label,
        x: 100 + index * 190,
        y: 360,
      },
    ]);
    setSelectedId(id);
  }

  function handlePointerDown(event, node) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const scale = boardRef.current
      ? boardRef.current.getBoundingClientRect().width / BOARD_WIDTH
      : 1;
    dragRef.current = {
      id: node.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: node.x,
      originY: node.y,
      scale,
    };
    setSelectedId(node.id);
  }

  function handlePointerMove(event) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = (event.clientX - drag.startX) / drag.scale;
    const dy = (event.clientY - drag.startY) / drag.scale;
    setNodes((current) =>
      current.map((node) =>
        node.id === drag.id
          ? {
              ...node,
              x: clamp(drag.originX + dx, 0, BOARD_WIDTH - NODE_WIDTH),
              y: clamp(drag.originY + dy, 0, BOARD_HEIGHT - NODE_HEIGHT),
            }
          : node,
      ),
    );
  }

  function handlePointerUp(event) {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  }

  return (
    <section className="section studio-section" id="studio">
      <div className="section-head">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Live studio
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The whole design,
          <br />
          on one canvas.
        </motion.h2>
        <motion.p
          className="section-lead"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Drag components into place, then run a simulation to reveal the first thing that breaks.
        </motion.p>
      </div>

      <motion.div
        className="studio-shell"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="studio-toolbar">
          <div className="studio-title">
            <span className="studio-live" />
            <strong>hld-plan.canvas</strong>
            <span className="studio-saved">autosaved</span>
          </div>
          <div className="studio-actions">
            <motion.button
              className="studio-button"
              onClick={resetDesign}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
            <motion.button
              className="studio-button studio-run"
              onClick={runSimulation}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {phase === 'running' ? (
                <motion.span
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <BoltIcon className="studio-run-icon" />
              )}
              {phase === 'running' ? 'Simulating...' : 'Run simulation'}
            </motion.button>
          </div>
        </div>

        <div className="studio-body">
          <aside className="studio-palette">
            <span className="panel-label">Components</span>
            <p>Click to add a node</p>
            {palette.map((type) => {
              const Icon = nodeTypes[type].icon;
              return (
                <motion.button
                  key={type}
                  className={`palette-item tone-${nodeTypes[type].tone}`}
                  onClick={() => addNode(type)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Icon />
                  {nodeTypes[type].label}
                </motion.button>
              );
            })}
            <div className="palette-hint">
              <BoltIcon />
              Drag any node to reshape the flow.
            </div>
          </aside>

          <div className="studio-board-scroll">
            <div
              className="studio-board"
              ref={boardRef}
              style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
            >
              <svg
                className="studio-edges"
                width={BOARD_WIDTH}
                height={BOARD_HEIGHT}
                viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
              >
                <defs>
                  <linearGradient id="edgeFlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c86ff" />
                    <stop offset="100%" stopColor="#5ee7c5" />
                  </linearGradient>
                </defs>
                {edges.map((edge) => {
                  const failed = phase === 'failed' && edge.to === 'db';
                  return (
                    <g key={`${edge.from}-${edge.to}`}>
                      <path
                        d={edge.path}
                        className={`studio-edge ${failed ? 'edge-failed' : ''}`}
                      />
                      {phase === 'running' && <path d={edge.path} className="edge-flow" />}
                      {failed && (
                        <motion.path
                          d={edge.path}
                          className="edge-alert"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.2, 1, 0.4, 1] }}
                          transition={{ duration: 1.3, repeat: Infinity }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {nodes.map((node) => {
                const Icon = nodeTypes[node.type].icon;
                const failed = phase === 'failed' && node.id === 'db';
                return (
                  <motion.div
                    key={node.id}
                    className={`studio-node tone-${nodeTypes[node.type].tone} ${
                      selectedId === node.id ? 'node-selected' : ''
                    } ${failed ? 'node-failed' : ''}`}
                    style={{ left: node.x, top: node.y }}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    whileHover={{ scale: 1.04 }}
                    onPointerDown={(event) => handlePointerDown(event, node)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                  >
                    <span className="node-icon"><Icon /></span>
                    <span className="node-text">
                      <strong>{node.label}</strong>
                      <small>{nodeTypes[node.type].label}</small>
                    </span>
                    <span className="node-port node-port-in" />
                    <span className="node-port node-port-out" />
                    {phase === 'running' && (
                      <motion.span
                        className="node-pulse"
                        animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    {failed && (
                      <motion.span
                        className="node-alert"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                        transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                      >
                        !
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <aside className="studio-inspector">
            <div className="inspector-head">
              <span>{phase === 'failed' ? 'Simulation report' : 'Inspector'}</span>
              <span className={`phase-badge phase-${phase}`}>{phase}</span>
            </div>

            <AnimatePresence mode="wait">
              {phase === 'failed' ? (
                <motion.div
                  key="report"
                  className="report"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="report-headline">
                    <span className="report-icon"><ShieldIcon /></span>
                    <div>
                      <strong>Break point found</strong>
                      <small>Orders DB · 00:47 into ramp</small>
                    </div>
                  </div>

                  {findings.map((finding, index) => (
                    <motion.div
                      className="finding"
                      key={finding}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.12 }}
                    >
                      <span>0{index + 1}</span>
                      <p>{finding}</p>
                    </motion.div>
                  ))}

                  <div className="metrics">
                    {metrics.map((metric) => (
                      <div className="metric" key={metric.label}>
                        <div className="metric-row">
                          <span>{metric.label}</span>
                          <strong>{metric.value}%</strong>
                        </div>
                        <div className="metric-track">
                          <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, delay: 0.25, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    className="studio-button studio-run report-rerun"
                    onClick={runSimulation}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Run again
                  </motion.button>
                </motion.div>
              ) : selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  className="selected-detail"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.span
                    className="selected-icon"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <SelectedIcon />
                  </motion.span>
                  <h4>{selectedNode.label}</h4>
                  <span className="selected-type">
                    {nodeTypes[selectedNode.type].label} component
                  </span>
                  <p>Drag the node to rearrange the design. Connections follow automatically.</p>
                  <div className="selected-meta">
                    <span>Status · nominal</span>
                    <span>x {Math.round(selectedNode.x)} / y {Math.round(selectedNode.y)}</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hint"
                  className="inspector-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="hint-icon"
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <BoltIcon />
                  </motion.span>
                  <h4>Ready when you are</h4>
                  <p>Select a component to inspect it, or run the simulation to find the weak link.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </div>

        <div className="studio-statusbar">
          <span>
            <span className={`status-dot status-${phase}`} />
            {statusText[phase]}
          </span>
          <span>{nodes.length} nodes · {edges.length} links</span>
          <span>Traffic profile · 12k req/min ramp</span>
        </div>
      </motion.div>
    </section>
  );
}
