import { motion } from 'framer-motion';
import { Sparkles, Menu } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      className="header glass"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="header__inner">
        {/* Logo */}
        <a href="/" className="header__logo">
          <div className="header__logo-icon">
            <Sparkles size={18} color="#fff" />
          </div>
          <span className="header__logo-text">
            Ad<span className="gradient-text">Remix</span>
          </span>
        </a>

        {/* Navigation */}
        <nav className="header__nav">
          <a href="#features" className="header__link">Features</a>
          <a href="#brands" className="header__link">Brands</a>
          <a href="#archive" className="header__link">Archive</a>
        </nav>

        {/* CTA */}
        <div className="header__actions">
          <button className="header__btn header__btn--ghost">Sign In</button>
          <button className="header__btn header__btn--primary">
            Get Started
          </button>
        </div>
      </div>
    </motion.header>
  );
}
