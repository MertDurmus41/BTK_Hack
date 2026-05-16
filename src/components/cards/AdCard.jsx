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
            <div className="ad-placeholder" onClick={() => fileInputRef.current?.click()}>
              <div className="ad-placeholder__content">
                <span className="ad-placeholder__brand">{ad.brand}</span>
                <span className="ad-placeholder__campaign">{ad.campaign}</span>
                <div className="ad-placeholder__upload-hint">
                  <Upload size={14} /> Click to upload image
                </div>
              </div>
              <div className="ad-placeholder__glow" style={{ background: ad.dominantColor }} />
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handleFileUpload}
              />
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
