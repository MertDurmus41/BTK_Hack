import { motion } from 'framer-motion';
import { Sidebar } from '../layout/Sidebar';
import { AISearchBar } from '../components/filters/AISearchBar';
import { AdGrid } from '../components/archive/AdGrid';
import '../styles/archive.css';

const pageVariants = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.3 } },
  exit:     { opacity: 0, transition: { duration: 0.2 } },
};

export function Archive() {
  return (
    <motion.main
      className="archive-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Sidebar />
      <div className="archive-content">
        <AISearchBar />
        <AdGrid />
      </div>
    </motion.main>
  );
}
