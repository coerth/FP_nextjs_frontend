import { useReducer } from 'react';
import { searchBarReducer, initialState, SearchBarState, SearchBarAction } from '@/reducers/searchBarReducer';

const useSearchBar = () => {
  const [state, dispatch] = useReducer<React.Reducer<SearchBarState, SearchBarAction>>(searchBarReducer, initialState);

  const setColor = (color: string) => dispatch({ type: 'SET_COLOR', payload: color });
  const setName = (name: string) => dispatch({ type: 'SET_NAME', payload: name });
  const setType = (type: string) => dispatch({ type: 'SET_TYPE', payload: type });
  const setActiveFilters = (filtersUpdater: (prevFilters: { [key: string]: string }) => { [key: string]: string }) => {
    dispatch({ type: 'SET_ACTIVE_FILTERS', payload: filtersUpdater(state.activeFilters) });
  };
  const removeFilter = (key: string) => dispatch({ type: 'REMOVE_FILTER', payload: key });
  const resetFilters = () => dispatch({ type: 'RESET_FILTERS' });

  return {
    state,
    setColor,
    setName,
    setType,
    setActiveFilters,
    removeFilter,
    resetFilters,
  };
};

export default useSearchBar;