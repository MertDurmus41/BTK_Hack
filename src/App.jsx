import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const pageVariants = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

function App() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="app-root"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 'var(--space-lg)',
          padding: 'var(--space-xl)',
        }}
      >
        {/* Logo & Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow-violet)',
            }}
          >
            <Sparkles size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 700 }}>
            Ad<span className="gradient-text">Remix</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.25 }}
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            maxWidth: 480,
          }}
        >
          Analyze competitor layouts, adapt them to your brand identity in seconds.
        </motion.p>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.2 }}
          className="glass"
          style={{
            padding: '8px 20px',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)',
            color: 'var(--text-tertiary)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--success)',
              display: 'inline-block',
            }}
          />
          Design System Active — Phase 1 Initialized
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
