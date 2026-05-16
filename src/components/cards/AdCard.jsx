import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function AdCard({ ad }) {
  const { setSelectedAd, userImages, uploadUserImage } = useAppContext();
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef(null);

  // Check if we have a user-uploaded version of this ad
  const displayImage = userImages[ad.id] || ad.thumbnailUrl;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadUserImage(ad.id, reader.result);
        setImgError(false); // Reset error state on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      className="ad-card-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <div className="ad-card">
        <div className="ad-card__image-container" style={{ background: ad.dominantColor || 'var(--bg-tertiary)' }}>
          {!imgError ? (
            <img 
              src={displayImage} 
              alt={ad.campaign} 
              className="ad-card__image"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="ad-placeholder">
              <div className="ad-placeholder__content">
                <span className="ad-placeholder__brand">{ad.brand}</span>
                <span className="ad-placeholder__campaign">{ad.campaign}</span>
              </div>
              <div className="ad-placeholder__glow" style={{ background: ad.dominantColor }} />
            </div>
          )}
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
        

      </div>
    </motion.div>
  );
}
