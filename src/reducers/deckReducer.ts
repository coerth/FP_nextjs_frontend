
interface DeckState {
  loading: boolean;
  error: string | null;
  showStats: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isCopyModalOpen: boolean;
}

type DeckAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SHOW_STATS'; payload: boolean }
  | { type: 'SET_EDIT_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_DELETE_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_COPY_MODAL_OPEN'; payload: boolean };

const initialState: DeckState = {
  loading: false,
  error: null,
  showStats: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  isCopyModalOpen: false,
};

const deckReducer = (state: DeckState, action: DeckAction): DeckState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SHOW_STATS':
      return { ...state, showStats: action.payload };
    case 'SET_EDIT_MODAL_OPEN':
      return { ...state, isEditModalOpen: action.payload };
    case 'SET_DELETE_MODAL_OPEN':
      return { ...state, isDeleteModalOpen: action.payload };
    case 'SET_COPY_MODAL_OPEN':
      return { ...state, isCopyModalOpen: action.payload };
    default:
      return state;
  }
};

export { deckReducer, initialState };
export type { DeckState, DeckAction };
