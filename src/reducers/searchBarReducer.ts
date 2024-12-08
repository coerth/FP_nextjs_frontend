interface SearchBarState {
  color: string;
  name: string;
  type: string;
  legalities: { [key: string]: string }; 
  activeFilters: { [key: string]: string };
  setId: string;
}

type SearchBarAction =
  | { type: 'SET_COLOR'; payload: string }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_TYPE'; payload: string }
  | { type: 'SET_FORMAT'; payload: { format: string, value: string } } 
  | { type: 'SET_ACTIVE_FILTERS'; payload: { [key: string]: string } }
  | { type: 'REMOVE_FILTER'; payload: string }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_SET_ID'; payload: string };

const initialState: SearchBarState = {
  color: '',
  name: '',
  type: '',
  legalities: {}, 
  activeFilters: {},
  setId: '',
};

const searchBarReducer = (state: SearchBarState, action: SearchBarAction): SearchBarState => {
  switch (action.type) {
    case 'SET_COLOR':
      return { ...state, color: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_TYPE':
      return { ...state, type: action.payload };
    case 'SET_FORMAT': 
      return { ...state, legalities: { ...state.legalities, [action.payload.format]: action.payload.value } };
    case 'SET_ACTIVE_FILTERS':
      return { ...state, activeFilters: action.payload };
    case 'REMOVE_FILTER':
      const newFilters = { ...state.activeFilters };
      delete newFilters[action.payload];
      return { ...state, activeFilters: newFilters };
    case 'RESET_FILTERS':
      return initialState;
    case 'SET_SET_ID': // Handle setting setId
      return { ...state, setId: action.payload };
    default:
      return state;
  }
};

export { searchBarReducer, initialState, SearchBarState, SearchBarAction };