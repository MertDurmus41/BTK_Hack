import { useReducer, useCallback } from 'react';

const initialFilterState = {
  brands:       [],
  colors:       [],
  sectors:      [],
  contentTypes: [],
  periods:      [],
  formats:      [],
  mediums:      [],
  searchQuery:  '',
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BRAND':    return { ...state, brands: action.payload };
    case 'SET_COLOR':    return { ...state, colors: action.payload };
    case 'SET_SECTOR':   return { ...state, sectors: action.payload };
    case 'SET_CONTENT':  return { ...state, contentTypes: action.payload };
    case 'SET_PERIOD':   return { ...state, periods: action.payload };
    case 'SET_FORMAT':   return { ...state, formats: action.payload };
    case 'SET_MEDIUM':   return { ...state, mediums: action.payload };
    case 'SET_SEARCH':   return { ...state, searchQuery: action.payload };
    case 'RESET':        return initialFilterState;
    default:             return state;
  }
};

/**
 * Hook for managing archive filter state
 */
export function useFilters() {
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);

  const setBrand   = useCallback((v) => dispatch({ type: 'SET_BRAND', payload: v }), []);
  const setColor   = useCallback((v) => dispatch({ type: 'SET_COLOR', payload: v }), []);
  const setSector  = useCallback((v) => dispatch({ type: 'SET_SECTOR', payload: v }), []);
  const setContent = useCallback((v) => dispatch({ type: 'SET_CONTENT', payload: v }), []);
  const setPeriod  = useCallback((v) => dispatch({ type: 'SET_PERIOD', payload: v }), []);
  const setFormat  = useCallback((v) => dispatch({ type: 'SET_FORMAT', payload: v }), []);
  const setMedium  = useCallback((v) => dispatch({ type: 'SET_MEDIUM', payload: v }), []);
  const setSearch  = useCallback((v) => dispatch({ type: 'SET_SEARCH', payload: v }), []);
  const reset      = useCallback(()  => dispatch({ type: 'RESET' }), []);

  return {
    filters,
    setBrand, setColor, setSector, setContent,
    setPeriod, setFormat, setMedium, setSearch, reset,
  };
}
