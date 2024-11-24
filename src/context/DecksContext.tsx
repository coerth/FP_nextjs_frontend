'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchDecksByUser } from '@/utils/Graphql/decks/fetchDecksByUser';
import { fetchJWTToken } from '@/utils/fetchJWTToken';
import { addCardToDeck as addCardToDeckAPI } from '@/utils/addCardToDeck';
import { MtGDeck } from '@/types/mtgDeck';
import { MtGCard } from '@/types/mtgCard';

interface DecksContextProps {
  decks: MtGDeck[];
  loading: boolean;
  error: string | null;
  refreshDecks: () => void;
  addCardToDeck: (deckId: string, cardId: string, count: number) => Promise<void>;
}

const DecksContext = createContext<DecksContextProps | undefined>(undefined);

export const DecksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [decks, setDecks] = useState<MtGDeck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDecks = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await fetchJWTToken();
      const fetchedDecks = await fetchDecksByUser(token);
      setDecks(fetchedDecks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCardToDeck = async (deckId: string, cardId: string, count: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = await fetchJWTToken();
      const updatedDeck = await addCardToDeckAPI(deckId, cardId, count, token);
      setDecks((prevDecks) =>
        prevDecks.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDecks();
  }, []);

  return (
    <DecksContext.Provider value={{ decks, loading, error, refreshDecks: fetchUserDecks, addCardToDeck }}>
      {children}
    </DecksContext.Provider>
  );
};

export const useDecks = (): DecksContextProps => {
  const context = useContext(DecksContext);
  if (!context) {
    throw new Error('useDecks must be used within a DecksProvider');
  }
  return context;
};