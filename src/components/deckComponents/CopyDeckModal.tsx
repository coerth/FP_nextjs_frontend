import React, { useState } from 'react';
import { useDecks } from '@/context/DecksContext';
import { MtGDeck } from '@/types/mtgDeck';
import Modal from '@/components/Modal';
import {useRouter} from 'next/navigation';

interface CopyDeckModalProps {
  deck: MtGDeck;
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
}

const CopyDeckModal: React.FC<CopyDeckModalProps> = ({ deck, isOpen, onClose, onCopy }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState(`${deck.name} Copy`);

  const { copyDeck } = useDecks();
  const router = useRouter();

  const handleCopy = async () => {
    setLoading(true);
    setError(null);
    try {
      const newDeck = await copyDeck(deck.id, newName);
      onCopy();
      onClose();
      router.push(`/decks/${newDeck.id}`);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Copy Deck">
      <p>Enter a name for the new deck:</p>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New Deck Name"
      />
      <button onClick={handleCopy} disabled={loading}>
        {loading ? 'Copying...' : 'Copy'}
      </button>
      {error && <p>{error}</p>}
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default CopyDeckModal;