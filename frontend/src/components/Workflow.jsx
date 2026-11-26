import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Sketch the architecture',
    text: 'Place clients, gateways, services and storage on the canvas, then wire up the request paths.',
  },
  {
    number: '02',
    title: 'Run the simulation',
    text: 'Choose a traffic profile and watch load move through the graph until something gives way.',
  },
  {
    number: '03',
    title: 'Fix the weak link',
    text: 'Read the findings, add a replica or cache, then rerun to see the breaking point move.',
  },
];

export default function Workflow() {
  return (
    <section className="section" id="workflow">
      <div className="section-head">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How it works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          From blank canvas to broken design
          <br />
          in three steps.
        </motion.h2>
      </div>

      <div className="workflow">
        <div className="workflow-line">
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>

        {steps.map((step, index) => (
          <motion.div
            className="workflow-step"
            key={step.number}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="step-number" whileHover={{ scale: 1.15, rotate: 8 }}>
              {step.number}
            </motion.div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
