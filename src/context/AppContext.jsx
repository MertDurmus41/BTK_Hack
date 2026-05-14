import { createContext, useContext, useReducer, useState } from 'react';

const AppContext = createContext();

const initialFilters = {
  searchQuery: '',
  brand: [],
  dominantColor: [],
  sector: [],
  contentType: [],
  specialSeason: [],
  format: [],
};

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_FILTER':
      const { category, value } = action.payload;
      const currentValues = state[category] || [];
      const isSelected = currentValues.includes(value);
      
      return {
        ...state,
        [category]: isSelected
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    case 'CLEAR_FILTERS':
      return initialFilters;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedAd, setSelectedAd] = useState(null);
  const [filters, dispatchFilters] = useReducer(filterReducer, initialFilters);

  return (
    <AppContext.Provider value={{ 
      currentPage, 
      setCurrentPage, 
      selectedAd,
      setSelectedAd,
      filters, 
      dispatchFilters 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
