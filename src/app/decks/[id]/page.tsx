'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MtGDeck } from '@/types/mtgDeck';
import { fetchDeckById } from '@/utils/fetchDeckById';
import { fetchJWTToken } from '@/utils/fetchJWTToken';
import DeckCardList from '@/components/deckComponents/DeckCardList';
import ManaBar from '@/components/deckComponents/ManaBar';

const DeckPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const deckId = params.id;
  const [deck, setDeck] = useState<MtGDeck | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;
      setLoading(true);
      setError(null);
      try {
        const token = await fetchJWTToken();
        const fetchedDeck = await fetchDeckById(deckId as string, token);
        setDeck(fetchedDeck);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!deck) return <p>No deck found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{deck.name}</h1>
      <p>Legality: {deck.legality}</p>
      <ManaBar manaDistribution={deck.deckStats.totalManaSymbols} />
      <DeckCardList cards={deck.cards} />
    </div>
  );
};

export default DeckPage;