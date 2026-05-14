import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import adsData from '../data/ads.json';

export function Sidebar() {
  const { filters, dispatchFilters } = useAppContext();

  // Extract unique values from ads.json
  const extractUnique = (key) => {
    const values = adsData.map((ad) => ad[key]);
    return [...new Set(values)].filter(Boolean);
  };

  const brands = extractUnique('brand');
  const sectors = extractUnique('sector');
  const contentTypes = extractUnique('contentType');
  const periods = extractUnique('period');
  const formats = extractUnique('format');
  const dominantColors = extractUnique('dominantColor');

  const handleToggle = (category, value) => {
    dispatchFilters({ type: 'TOGGLE_FILTER', payload: { category, value } });
  };

  const renderCheckboxList = (title, category, items) => (
    <div className="filter-section">
      <h3 className="filter-section__title">{title}</h3>
      <div className="filter-list">
        {items.map((item) => (
          <label key={item} className="filter-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={filters[category]?.includes(item) || false}
              onChange={() => handleToggle(category, item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="archive-sidebar glass">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Filters</h2>
        {(filters.brand.length > 0 || filters.sector.length > 0 || filters.searchQuery) && (
          <button 
            className="btn" 
            style={{ padding: '4px 8px', fontSize: '12px' }}
            onClick={() => dispatchFilters({ type: 'CLEAR_FILTERS' })}
          >
            Clear All
          </button>
        )}
      </div>

      {renderCheckboxList('Brand', 'brand', brands)}
      
      <div className="filter-section">
        <h3 className="filter-section__title">Dominant Color</h3>
        <div className="color-swatches">
          {dominantColors.map((color) => (
            <div
              key={color}
              className={`color-swatch ${filters.dominantColor?.includes(color) ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleToggle('dominantColor', color)}
              title={color}
            />
          ))}
        </div>
      </div>

      {renderCheckboxList('Sector', 'sector', sectors)}
      {renderCheckboxList('Content Type', 'contentType', contentTypes)}
      {renderCheckboxList('Special Seasons', 'specialSeason', periods)}
      {renderCheckboxList('Format', 'format', formats)}
    </aside>
  );
}
