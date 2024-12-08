'use client';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { addCardToDeck as addCardToDeckAPI, fetchDecksByUser, createDeck as createDeckAPI, fetchAllDecks as OtherDecksAPI, removeCardFromDeck as removeCardFromDeckAPI, fetchDeckByIdAndProbabilities, fetchDeckById } from '@/services/deckService';
import { MtGDeck, DrawProbabilities } from '@/types/mtgDeck';

interface DecksContextProps {
  userDecks: MtGDeck[];
  otherDecks: MtGDeck[];
  selectedDeck: MtGDeck | null;
  drawProbabilities: DrawProbabilities | null;
  loading: boolean;
  error: string | null;
  refreshUserDecks: () => void;
  addCardToDeck: (deckId: string, cardId: string, count: number) => Promise<void>;
  removeCardFromDeck: (deckId: string, cardId: string, count: number) => Promise<void>;
  createDeck: (legality: string, name: string) => Promise<void>;
  fetchOtherDecks: (page: number, limit: number) => Promise<void>;
  setSelectedDeck: (deckId: string) => Promise<void>;
  updateSelectedDeck: () => Promise<void>;
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

  const [otherDecks, setOtherDecks] = useState<MtGDeck[]>([]);
  const [selectedDeck, setSelectedDeckState] = useState<MtGDeck | null>(null);
  const [drawProbabilities, setDrawProbabilities] = useState<DrawProbabilities | null>(null);
  const [loadingOtherDecks, setLoadingOtherDecks] = useState(false);
  const [errorOtherDecks, setErrorOtherDecks] = useState<string | null>(null);

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

  const removeCardMutation = useMutation(removeCardFromDeckAPI, {
    onSuccess: () => queryClient.invalidateQueries('userDecks'),
  });

  const createDeckMutation = useMutation(createDeckAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries('userDecks');
    },
  });

  const addCardToDeck = async (deckId: string, cardId: string, count: number) => {
    await addCardMutation.mutateAsync({ deckId, cardId, count });
    await updateSelectedDeck();
  };

  const removeCardFromDeck = async (deckId: string, cardId: string, count: number) => {
    await removeCardMutation.mutateAsync({ deckId, cardId, count });
    await updateSelectedDeck();
  };

  const createDeck = async (legality: string, name: string) => {
    await createDeckMutation.mutateAsync({ legality, name });
  };

  const setSelectedDeck = async (deckId: string) => {
    const {deck, drawProbabilities} = await fetchDeckByIdAndProbabilities({ deckId: deckId, drawCount: 7 });
    setSelectedDeckState(deck);
    setDrawProbabilities(drawProbabilities);
  };

  const updateSelectedDeck = async () => {
    if (!selectedDeck) return;
    const { deck, drawProbabilities } = await fetchDeckByIdAndProbabilities({ deckId: selectedDeck.id, drawCount: 7 });
    setSelectedDeckState(deck);
    setDrawProbabilities(drawProbabilities);
  };

  return (
    <DecksContext.Provider
      value={{
        userDecks: userDecks || [],
        otherDecks,
        selectedDeck,
        drawProbabilities,
        loading: userDecksLoading || loadingOtherDecks,
        error: userDecksError?.message || errorOtherDecks,
        refreshUserDecks,
        fetchOtherDecks,
        addCardToDeck,
        removeCardFromDeck,
        createDeck,
        setSelectedDeck,
        updateSelectedDeck,
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