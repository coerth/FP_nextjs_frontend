import { useReducer } from 'react';
import { cardModalReducer, initialState, CardModalState, CardModalAction } from '@/reducers/cardModalReducer';

const useCardModal = () => {
  const [state, dispatch] = useReducer<React.Reducer<CardModalState, CardModalAction>>(cardModalReducer, initialState);

  const setSelectedDeckId = (selectedDeckId: string | null) =>
    dispatch({ type: 'SET_SELECTED_DECK_ID', payload: selectedDeckId });

  const setCount = (count: number) =>
    dispatch({ type: 'SET_COUNT', payload: count });

  const setLoading = (loading: boolean) =>
    dispatch({ type: 'SET_LOADING', payload: loading });

  const setError = (error: string | null) =>
    dispatch({ type: 'SET_ERROR', payload: error });

  const reset = () =>
    dispatch({ type: 'RESET' });

  return {
    state,
    setSelectedDeckId,
    setCount,
    setLoading,
    setError,
    reset,
  };
};

export default useCardModal;