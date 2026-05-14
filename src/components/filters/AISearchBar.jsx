import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function AISearchBar() {
  const { filters, dispatchFilters } = useAppContext();
  const [isTyping, setIsTyping] = useState(false);

  // Simple debounce for the pulse animation effect
  useEffect(() => {
    if (filters.searchQuery) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [filters.searchQuery]);

  return (
    <div className="ai-search-container">
      <Sparkles 
        className="ai-search-icon" 
        size={24} 
      />
      <input
        type="text"
        className={`ai-search-input ${isTyping ? 'searching' : ''}`}
        placeholder="Search with AI: Red-themed Ramadan billboards..."
        value={filters.searchQuery}
        onChange={(e) => dispatchFilters({ type: 'SET_SEARCH', payload: e.target.value })}
      />
    </div>
  );
}
