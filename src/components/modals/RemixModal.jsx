import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useRemix } from '../../hooks/useRemix';
import '../../styles/remix.css';

const QUICK_ACTIONS = [
  "Change color theme to neon cyberpunk",
  "Make it a minimalist layout",
  "Switch the background to a beach scene",
  "Make it look like a 3D render",
];

export function RemixModal() {
  const { selectedAd, setSelectedAd } = useAppContext();
  const { generateRemix, isGenerating, resultImage, error, loadingState } = useRemix();
  const [prompt, setPrompt] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedAd(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedAd]);

  if (!selectedAd) return null;

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generateRemix(selectedAd, prompt);
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={() => setSelectedAd(null)}>
        <motion.div 
          className="remix-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="remix-modal__close" onClick={() => setSelectedAd(null)}>
            <X size={18} />
          </button>

          {/* Left Column: Original */}
          <div className="remix-modal__left">
            <h3 className="remix-modal__section-title">Original Inspiration</h3>
            <img 
              src={selectedAd.originalUrl} 
              alt="Original" 
              className="remix-modal__original-image" 
            />
            
            <div className="remix-modal__metadata">
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>{selectedAd.campaign}</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Brand: <strong style={{ color: 'var(--text-primary)' }}>{selectedAd.brand}</strong></p>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                {selectedAd.tags.map(t => (
                  <span key={t} className="ad-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Canvas */}
          <div className="remix-modal__right">
            <h3 className="remix-modal__section-title">AI Canvas</h3>
            
            <div className="ai-canvas">
              {isGenerating ? (
                <div className="ai-loader">
                  <Loader2 className="spin" size={32} />
                  <span>{loadingState}</span>
                </div>
              ) : resultImage ? (
                <img src={resultImage} alt="Generated Remix" className="ai-canvas__result" />
              ) : (
                <div className="ai-canvas__placeholder">
                  <ImageIcon size={48} opacity={0.5} />
                  <p>Your generated ad will appear here</p>
                </div>
              )}
            </div>

            {error && (
              <div style={{ color: 'var(--error)', fontSize: 'var(--text-sm)', padding: '8px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }}>
                {error}
              </div>
            )}

            <div className="prompt-box">
              <textarea 
                className="prompt-textarea"
                placeholder="Describe how you want to remix this ad..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
              />
              
              <div className="quick-actions">
                {QUICK_ACTIONS.map(action => (
                  <button 
                    key={action}
                    className="quick-action-chip"
                    onClick={() => setPrompt(action)}
                    disabled={isGenerating}
                  >
                    {action}
                  </button>
                ))}
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px' }}
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? 'Processing...' : 'Generate Remix'} <Sparkles size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
