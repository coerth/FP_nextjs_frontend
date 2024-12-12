import { useReducer, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { deckReducer, initialState } from '@/reducers/deckReducer';
import { useDecks } from '@/context/DecksContext';

const useDeckReducer = () => {
  const [state, dispatch] = useReducer(deckReducer, initialState);
  const { setSelectedDeck } = useDecks();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = params && Array.isArray(params.id) ? params.id[0] : params?.id;

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      try {
        if (typeof deckId === 'string') {
          await setSelectedDeck(deckId);
        } else {
          throw new Error('Invalid deck ID');
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch({ type: 'SET_ERROR', payload: err.message });
        } else {
          dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchDeck();
  }, [deckId]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (state.showStats) {
      queryParams.set('showStats', 'true');
    } else {
      queryParams.delete('showStats');
    }
    router.replace(`${window.location.pathname}?${queryParams.toString()}`);
  }, [state.showStats, router]);

  return { state, dispatch };
};

export default useDeckReducer;