import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { AdCard } from '../cards/AdCard';
import adsData from '../../data/ads.json';

export function AdGrid() {
  const { filters } = useAppContext();

  const filteredAds = useMemo(() => {
    return adsData.filter((ad) => {
      // Basic text search across brand, campaign, and tags
      const matchesSearch = filters.searchQuery
        ? `${ad.brand} ${ad.campaign} ${ad.tags.join(' ')}`
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        : true;

      const matchesBrand = filters.brand.length === 0 || filters.brand.includes(ad.brand);
      const matchesColor = filters.dominantColor.length === 0 || filters.dominantColor.includes(ad.dominantColor);
      const matchesSector = filters.sector.length === 0 || filters.sector.includes(ad.sector);
      const matchesType = filters.contentType.length === 0 || filters.contentType.includes(ad.contentType);
      const matchesSeason = filters.specialSeason.length === 0 || filters.specialSeason.includes(ad.period);
      const matchesFormat = filters.format.length === 0 || filters.format.includes(ad.format);

      return (
        matchesSearch &&
        matchesBrand &&
        matchesColor &&
        matchesSector &&
        matchesType &&
        matchesSeason &&
        matchesFormat
      );
    });
  }, [filters]);

  if (filteredAds.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-secondary)' }}>
        <h3>No ads found matching your criteria.</h3>
        <p>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="ad-grid">
      <AnimatePresence>
        {filteredAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </AnimatePresence>
    </div>
  );
}
