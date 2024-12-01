// DeckPage.tsx
'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MtGDeck, DrawProbabilities } from '@/types/mtgDeck';
import { FetchDeckAndProbabilities } from '@/utils/Graphql/decks/fetchDeckByIdAndProbabilities';
import { fetchJWTToken } from '@/utils/fetchJWTToken';
import DeckCardList from '@/components/deckComponents/DeckCardList';
import ManaBar from '@/components/deckComponents/ManaBar';
import DeckStats from '@/components/deckComponents/DeckStats';
import DeckCMCStats from '@/components/deckComponents/DeckCMCStats';
import DrawCards from '@/components/deckComponents/DrawCards';

const DeckPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = params.id;
  const [deck, setDeck] = useState<MtGDeck | null>(null);
  const [drawProbabilities, setDrawProbabilities] = useState<DrawProbabilities | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(searchParams.get('showStats') === 'true'); 

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;
      setLoading(true);
      setError(null);
      try {
        const token = await fetchJWTToken();
        const {deck, drawProbabilities} = await FetchDeckAndProbabilities(deckId as string, token);
        setDeck(deck);
        setDrawProbabilities(drawProbabilities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  useEffect(() => {
    // Update URL when showStats changes
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
  if (!deck) return <p>No deck found</p>;

  // Function to handle the click on a color in ManaBar
  const handleManaBarClick = () => {
    setShowStats(true); // Show stats when mana bar is clicked
  };

  // Function to handle clicking on the histogram to hide stats and show ManaBar
  const handleHistogramClick = () => {
    setShowStats(false); // Hide stats to show the mana bar again
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4 underline">{deck.name}</h1>
      <p>Legality: {deck.legality}</p>
      {!showStats && <ManaBar manaDistribution={deck.deckStats.totalManaSymbols} onClick={handleManaBarClick} />}
      {showStats && (
        <>
          <DeckStats deckStats={deck.deckStats} onHistogramClick={handleHistogramClick} drawProbabilities={drawProbabilities} />
          <DeckCMCStats cards={deck.cards} />
        </>
      )}
      <DrawCards cards={deck.cards} />
      <DeckCardList cards={deck.cards} />
    </div>
  );
};

export default DeckPage;