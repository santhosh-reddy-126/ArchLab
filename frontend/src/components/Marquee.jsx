const stack = [
  'System design',
  'Canvas editor',
  'Simulation engine',
  'Failure insights',
  'React',
  'Vite',
  'Framer Motion',
  'Dropwizard',
];

export default function Marquee() {
  return (
    <section className="marquee-section" aria-label="Platform building blocks">
      <p className="marquee-caption">BUILT FOR DESIGN THAT HOLDS UP</p>
      <div className="marquee">
        <div className="marquee-track">
          {[...stack, ...stack, ...stack].map((name, index) => (
            <span key={`${name}-${index}`}>
              <i className="marquee-dot" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
