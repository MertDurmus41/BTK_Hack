import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { SpringButton } from '../ui/SpringButton';

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroSection() {
  return (
    <section className="hero">
      {/* Background glow effects */}
      <div className="hero__glow hero__glow--left" />
      <div className="hero__glow hero__glow--right" />
      <div className="hero__grid-overlay" />

      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="hero__badge glass">
          <span className="hero__badge-dot" />
          AI-Powered Ad Archive
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={itemVariants} className="hero__title">
          Find ad inspiration
          <br />
          <span className="gradient-text">within</span>{' '}
          <span className="gradient-text">seconds</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="hero__subtitle">
          Analyze competitor layouts from top brands, discover winning patterns
          with AI, and adapt them to your brand identity — instantly.
        </motion.p>

        <motion.div variants={itemVariants} className="hero__ctas">
          <SpringButton className="hero__btn hero__btn--primary" onClick={() => setCurrentPage('archive')}>
            Enter Archive
            <ArrowRight size={18} />
          </SpringButton>
          <SpringButton className="hero__btn hero__btn--secondary glass">
            <Play size={16} fill="currentColor" />
            Watch Demo
          </SpringButton>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">12,500+</span>
            <span className="hero__stat-label">Ad Visuals</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">320+</span>
            <span className="hero__stat-label">Brands</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">50K+</span>
            <span className="hero__stat-label">Remixes Created</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
