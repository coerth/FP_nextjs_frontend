'use client';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import React, { createContext, useContext, ReactNode } from 'react';
import { addCardToDeck as addCardToDeckAPI , fetchDecksByUser, createDeck as createDeckAPI, fetchAllDecks as OtherDecksAPI } from '@/services/deckService';
import { MtGDeck } from '@/types/mtgDeck';

interface DecksContextProps {
  userDecks: MtGDeck[];
  otherDecks: MtGDeck[];
  loading: boolean;
  error: string | null;
  refreshUserDecks: () => void;
  addCardToDeck: (deckId: string, cardId: string, count: number) => Promise<void>;
  createDeck: (legality: string, name: string) => Promise<void>;
  fetchOtherDecks: (page: number, limit: number) => Promise<void>;
}

const DecksContext = createContext<DecksContextProps | undefined>(undefined);

export const DecksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

 
  const {
    data: userDecks,
    isLoading: userDecksLoading,
    error: userDecksError,
    refetch: refreshUserDecks,
  } = useQuery<MtGDeck[], Error>('userDecks', fetchDecksByUser);

  
  const [otherDecks, setOtherDecks] = React.useState<MtGDeck[]>([]);
  const [loadingOtherDecks, setLoadingOtherDecks] = React.useState(false);
  const [errorOtherDecks, setErrorOtherDecks] = React.useState<string | null>(null);

  const fetchOtherDecks = async (page: number, limit: number) => {
    setLoadingOtherDecks(true);
    try {
      const fetchedOtherDecks = await OtherDecksAPI({ limit, skip: (page - 1) * limit });
      setOtherDecks((prev) => [
        ...prev,
        ...fetchedOtherDecks.filter((deck) => !prev.some((d) => d.id === deck.id)),
      ]);
    } catch (error: any) {
      setErrorOtherDecks(error.message);
    } finally {
      setLoadingOtherDecks(false);
    }
  };

  // Mutations
  const addCardMutation = useMutation(addCardToDeckAPI, {
    onSuccess: () => queryClient.invalidateQueries('userDecks'),
  });

  const createDeckMutation = useMutation(createDeckAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries('userDecks');
    },
  });

  const addCardToDeck = async (deckId: string, cardId: string, count: number) => {
    await addCardMutation.mutateAsync({ deckId, cardId, count });
  };

  const createDeck = async (legality: string, name: string) => {
    await createDeckMutation.mutateAsync({ legality, name });
  };

  return (
    <DecksContext.Provider
      value={{
        userDecks: userDecks || [],
        otherDecks,
        loading: userDecksLoading || loadingOtherDecks,
        error: userDecksError?.message || errorOtherDecks,
        refreshUserDecks,
        fetchOtherDecks,
        addCardToDeck,
        createDeck,
      }}
    >
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