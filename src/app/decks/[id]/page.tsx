'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeckCardList from '@/components/deckComponents/DeckCardList';
import ManaBar from '@/components/deckComponents/ManaBar';
import DeckStats from '@/components/deckComponents/DeckStats';
import DeckCMCStats from '@/components/deckComponents/DeckCMCStats';
import DrawCards from '@/components/deckComponents/DrawCards';
import EditDeckModal from '@/components/deckComponents/EditDeckModal';
import DeleteDeckModal from '@/components/deckComponents/DeleteDeckModal';
import CopyDeckModal from '@/components/deckComponents/CopyDeckModal';
import { useUser } from '@/context/UserContext';
import { useDecks } from '@/context/DecksContext';
import { MtGDeck } from '@/types/mtgDeck';

const DeckPage: React.FC = () => {
  const { user } = useUser();
  const { addCardToDeck, removeCardFromDeck, setSelectedDeck, selectedDeck, drawProbabilities, copyDeck } = useDecks();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = params && Array.isArray(params.id) ? params.id[0] : params?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStats, setShowStats] = useState<boolean>(searchParams?.get('showStats') === 'true' || false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);


  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;
      setLoading(true);
      setError(null);
      try {
        if (typeof deckId === 'string') {
          await setSelectedDeck(deckId);
        } else {
          throw new Error('Invalid deck ID');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleDecreaseCardCount = async (cardId: string) => {
    if (!selectedDeck) return;
    try {
      await removeCardFromDeck(selectedDeck.id, cardId, 1);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleEditDeck = (updatedDeck: MtGDeck) => {
    setSelectedDeck(updatedDeck.id);
  };

  const handleDeleteDeck = () => {
    router.push('/decks');
  };

  const handleCopyDeck = async (newName: string) => {
    try {
      const newDeck = await copyDeck(selectedDeck.id, newName);
      router.push(`/decks/${newDeck.id}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const isOwner = !!user && user.id === selectedDeck.userId;

  return (
    <div className="container">
       <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-4 underline">{selectedDeck.name}</h1>
      <div className="flex space-x-2">
      {isOwner && (
        <>
          <button className='editButton mr-2' onClick={() => setIsEditModalOpen(true)}>Edit Deck</button>
          <button className='deleteButton mr-2' onClick={() => setIsDeleteModalOpen(true)}>Delete Deck</button>
        </>
      )}
      {user && user.id  && (
        
      <button className='copyButton mr-2' onClick={() => setIsCopyModalOpen(true)}>Copy Deck</button>
      )}
       </div>
       </div>
      <p>Legality: {selectedDeck.legality}</p>
      {!showStats && <ManaBar manaDistribution={selectedDeck.deckStats.totalManaSymbols} onClick={handleManaBarClick} />}
      {showStats && (
        <>
          {drawProbabilities && (
            <DeckStats deckStats={selectedDeck.deckStats} onHistogramClick={handleHistogramClick} drawProbabilities={drawProbabilities} />
          )}
          <DeckCMCStats cards={selectedDeck.cards} />
        </>
      )}
      <DrawCards cards={selectedDeck.cards} />
      <DeckCardList 
        cards={selectedDeck.cards} 
        isOwner={isOwner} 
        onIncreaseCardCount={handleIncreaseCardCount} 
        onDecreaseCardCount={handleDecreaseCardCount} 
      />
      <EditDeckModal
        deck={selectedDeck}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEditDeck}
      />
      <DeleteDeckModal
      deck={selectedDeck}
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      onDelete={handleDeleteDeck}
      />
      <CopyDeckModal
        deck={selectedDeck}
        isOpen={isCopyModalOpen}
        onClose={() => setIsCopyModalOpen(false)}
        onCopy={handleCopyDeck}
      />
    </div>
  );
};

export default DeckPage;