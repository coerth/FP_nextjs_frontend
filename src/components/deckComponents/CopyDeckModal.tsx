import React, { useState } from 'react';
import { MtGDeck } from '@/types/mtgDeck';
import Modal from '@/components/Modal';
import styles from '@/styles/DeckModal.module.css';

interface CopyDeckModalProps {
  deck: MtGDeck;
  isOpen: boolean;
  onClose: () => void;
  onCopy: (newName: string) => Promise<void>;
}

const CopyDeckModal: React.FC<CopyDeckModalProps> = ({ deck, isOpen, onClose, onCopy }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState(`${deck.name} Copy`);

  const handleCopy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onCopy(newName);
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