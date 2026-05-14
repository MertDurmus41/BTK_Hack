import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function Header() {
  const { currentPage, setCurrentPage } = useAppContext();

  return (
    <motion.header 
      className="glass"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-md) var(--space-xl)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}
        onClick={() => setCurrentPage('landing')}
      >
        <Sparkles size={20} color="var(--accent-purple)" />
        <span style={{ fontWeight: 600, fontSize: 'var(--text-lg)' }}>AdRemix</span>
      </div>
      
      <nav style={{ display: 'flex', gap: 'var(--space-xl)' }}>
        <a href="#features" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); }} style={{ color: currentPage === 'landing' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Features</a>
        <a href="#archive" onClick={(e) => { e.preventDefault(); setCurrentPage('archive'); }} style={{ color: currentPage === 'archive' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Archive</a>
        <a href="#pricing" style={{ color: 'var(--text-secondary)' }}>Pricing</a>
      </nav>

      <button 
        className="btn btn-primary"
        onClick={() => setCurrentPage('archive')}
      >
        Open App
      </button>
    </motion.header>
  );
}
