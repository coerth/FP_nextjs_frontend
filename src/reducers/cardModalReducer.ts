interface CardModalState {
    selectedDeckId: string | null;
    count: number;
    loading: boolean;
    error: string | null;
  }
  
  type CardModalAction =
    | { type: 'SET_SELECTED_DECK_ID'; payload: string | null }
    | { type: 'SET_COUNT'; payload: number }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'RESET' };
  
  const initialState: CardModalState = {
    selectedDeckId: null,
    count: 1,
    loading: false,
    error: null,
  };
  
  const cardModalReducer = (state: CardModalState, action: CardModalAction): CardModalState => {
    switch (action.type) {
      case 'SET_SELECTED_DECK_ID':
        return { ...state, selectedDeckId: action.payload };
      case 'SET_COUNT':
        return { ...state, count: action.payload };
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };
  
  export { cardModalReducer, initialState, CardModalState, CardModalAction };