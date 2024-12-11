import React, { useState } from 'react';
import { useDecks } from '@/context/DecksContext';
import { MtGDeck } from '@/types/mtgDeck';
import Modal from '@/components/Modal';
import styles from '@/styles/DeckModal.module.css';

interface DeleteDeckModalProps {
  deck: MtGDeck;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteDeckModal: React.FC<DeleteDeckModalProps> = ({ deck, isOpen, onClose, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { deleteDeck } = useDecks();

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteDeck(deck.id);
      onDelete();
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
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Deck">
      <div className={styles.form}>
        <p>Are you sure you want to delete the deck "{deck.name}"?</p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
          <button onClick={handleDelete} disabled={loading} className={`${styles.button} ${styles.deleteButton}`}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    </Modal>
  );
};

export default DeleteDeckModal;