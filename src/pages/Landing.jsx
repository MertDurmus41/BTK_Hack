import { motion } from 'framer-motion';
import { HeroSection } from '../components/landing/HeroSection';
import { FeatureCards } from '../components/landing/FeatureCards';
import { BrandMarquee } from '../components/landing/BrandMarquee';
import '../styles/landing.css';

const pageVariants = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.3 } },
  exit:     { opacity: 0, transition: { duration: 0.2 } },
};

export function Landing() {
  return (
    <motion.main
      className="landing-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <FeatureCards />
      <BrandMarquee />
      
      <footer className="landing-footer">
        <p className="landing-footer__text">
          © {new Date().getFullYear()} AdRemix. For demonstration purposes.
        </p>
      </footer>
    </motion.main>
  );
}
