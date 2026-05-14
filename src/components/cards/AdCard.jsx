import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function AdCard({ ad }) {
  const { setSelectedAd } = useAppContext();

  return (
    <motion.div 
      className="ad-card-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <div className="ad-card">
        <div className="ad-card__image-container">
          <img 
            src={ad.thumbnailUrl} 
            alt={ad.campaign} 
            className="ad-card__image"
            loading="lazy"
          />
          <div className="ad-card__overlay">
            <button 
              className="btn btn-primary"
              onClick={() => setSelectedAd(ad)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Remix <Sparkles size={16} />
            </button>
          </div>
        </div>
        
        <div className="ad-card__metadata">
          <span className="ad-card__brand">{ad.brand}</span>
          <h4 className="ad-card__campaign">{ad.campaign}</h4>
          
          <div className="ad-card__tags">
            {ad.tags.map(tag => (
              <span key={tag} className="ad-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
