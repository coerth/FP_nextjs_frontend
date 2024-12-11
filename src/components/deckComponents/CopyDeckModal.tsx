import React, { useState } from 'react';
import { useDecks } from '@/context/DecksContext';
import { MtGDeck } from '@/types/mtgDeck';
import Modal from '@/components/Modal';
import {useRouter} from 'next/navigation';
import styles from '@/styles/DeckModal.module.css';


interface CopyDeckModalProps {
  deck: MtGDeck;
  isOpen: boolean;
  onClose: () => void;
}

const CopyDeckModal: React.FC<CopyDeckModalProps> = ({ deck, isOpen, onClose }) => {
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
      <form onSubmit={handleCopy} className={styles.form}>
        <p>Enter a name for the new deck:</p>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New Deck Name"
          className={styles.input}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className={`${styles.button} ${styles.submitButton}`}>
            {loading ? 'Copying...' : 'Copy'}
          </button>
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    </Modal>
  );
};

export default CopyDeckModal;