import React, { useState, useEffect } from 'react';
import { useDecks } from '@/context/DecksContext';
import { MtGDeck } from '@/types/mtgDeck';
import Modal from '@/components/Modal';

interface EditDeckModalProps {
  deck: MtGDeck;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (updatedDeck: MtGDeck) => void;
}

const EditDeckModal: React.FC<EditDeckModalProps> = ({ deck, isOpen, onClose, onEdit }) => {
  const [name, setName] = useState(deck.name);
  const [legality, setLegality] = useState(deck.legality);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { editDeck } = useDecks();

  useEffect(() => {
    setName(deck.name);
    setLegality(deck.legality);
  }, [deck]);

  const handleEdit = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedDeck = await editDeck(deck.id, name, legality);
      onClose();
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
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Deck">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Deck Name"
      />
      <input
        type="text"
        value={legality}
        onChange={(e) => setLegality(e.target.value)}
        placeholder="Legality"
      />
      <button onClick={handleEdit} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      {error && <p>{error}</p>}
    </Modal>
  );
};

export default EditDeckModal;