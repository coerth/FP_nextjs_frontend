'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeckCardList from '@/components/deckComponents/DeckCardList';
import ManaBar from '@/components/deckComponents/ManaBar';
import DeckStats from '@/components/deckComponents/DeckStats';
import DeckCMCStats from '@/components/deckComponents/DeckCMCStats';
import DrawCards from '@/components/deckComponents/DrawCards';
import { useUser } from '@/context/UserContext';
import { useDecks } from '@/context/DecksContext';

const DeckPage: React.FC = () => {
  const { user } = useUser();
  const { addCardToDeck, removeCardFromDeck, setSelectedDeck, selectedDeck, drawProbabilities, updateSelectedDeck } = useDecks();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(searchParams.get('showStats') === 'true'); 

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;
      setLoading(true);
      setError(null);
      try {
        await setSelectedDeck(deckId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (showStats) {
      queryParams.set('showStats', 'true');
    } else {
      queryParams.delete('showStats');
    }
    router.replace(`${window.location.pathname}?${queryParams.toString()}`);
  }, [showStats, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedDeck || !selectedDeck.deckStats) return <p>No deck found</p>;


  const handleManaBarClick = () => {
    setShowStats(true); 
  };

  const handleHistogramClick = () => {
    setShowStats(false); 
  };

  const handleIncreaseCardCount = async (cardId: string) => {
    if (!selectedDeck) return;
    try {
      await addCardToDeck(selectedDeck.id, cardId, 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDecreaseCardCount = async (cardId: string) => {
    if (!selectedDeck) return;
    try {
      await removeCardFromDeck(selectedDeck.id, cardId, 1);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4 underline">{selectedDeck.name}</h1>
      <p>Legality: {selectedDeck.legality}</p>
      {!showStats && <ManaBar manaDistribution={selectedDeck.deckStats.totalManaSymbols} onClick={handleManaBarClick} />}
      {showStats && (
        <>
          <DeckStats deckStats={selectedDeck.deckStats} onHistogramClick={handleHistogramClick} drawProbabilities={drawProbabilities} />
          <DeckCMCStats cards={selectedDeck.cards} />
        </>
      )}
      <DrawCards cards={selectedDeck.cards} />
      <DeckCardList 
        cards={selectedDeck.cards} 
        isOwner={user && user.id === selectedDeck.userId} 
        onIncreaseCardCount={handleIncreaseCardCount} 
        onDecreaseCardCount={handleDecreaseCardCount} 
      />
    </div>
  );
};

export default DeckPage;