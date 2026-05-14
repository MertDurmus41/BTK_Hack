import { motion } from 'framer-motion';
import { Search, Brain, Wand2 } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Fast Search',
    description: 'Search through thousands of ad visuals instantly with powerful filters — by brand, sector, format, color, and more.',
    color: 'var(--accent-violet)',
  },
  {
    icon: Brain,
    title: 'AI Discovery',
    description: 'Let AI analyze visual patterns, compositions, and trends across the entire archive. Find what you didn\'t know you were looking for.',
    color: 'var(--accent-purple)',
  },
  {
    icon: Wand2,
    title: 'Smart Remix',
    description: 'Select any ad and remix it into your brand\'s style using generative AI. Adapt layouts, colors, and messaging in seconds.',
    color: '#ec4899',
  },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FeatureCards() {
  return (
    <section className="features" id="features">
      <motion.div
        className="features__header"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="features__label">Core Features</span>
        <h2 className="features__title">
          Everything you need to
          <br />
          <span className="gradient-text">dominate ad creative</span>
        </h2>
      </motion.div>

      <motion.div
        className="features__grid"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            className="feature-card"
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div
              className="feature-card__icon"
              style={{
                '--icon-color': feature.color,
              }}
            >
              <feature.icon size={24} />
            </div>
            <h3 className="feature-card__title">{feature.title}</h3>
            <p className="feature-card__desc">{feature.description}</p>
            <div
              className="feature-card__glow"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${feature.color}15 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
