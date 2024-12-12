import React, { useState, useEffect } from 'react';
import { useDecks } from '@/context/DecksContext';
import { MtGDeck } from '@/types/mtgDeck';
import Modal from '@/components/Modal';
import { legalities } from '@/types/legalities';
import styles from '@/styles/DeckModal.module.css';

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

  useEffect(() => {
    setName(deck.name);
    setLegality(deck.legality);
  }, [deck]);

  const handleEdit = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedDeck = { ...deck, name, legality };
      onEdit(updatedDeck);
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
      <form onSubmit={handleEdit} className={styles.form}>
        <div className="mb-4">
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Deck Name"
            className={styles.input}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="legality" className={styles.label}>
            Legality:
          </label>
          <select
            id="legality"
            value={legality}
            onChange={(e) => setLegality(e.target.value)}
            className={styles.input}
          >
            {legalities.map((legality) => (
              <option key={legality} value={legality}>
                {legality}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className={`${styles.button} ${styles.submitButton}`}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    </Modal>
  );
};

export default EditDeckModal;