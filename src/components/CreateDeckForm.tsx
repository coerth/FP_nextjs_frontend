import React, { useState } from 'react';
import { useDecks } from '@/context/DecksContext';
import { legalities } from '@/types/legalities';
import styles from '@/styles/DeckModal.module.css';

interface CreateDeckFormProps {
  onClose: () => void;
}

const CreateDeckForm: React.FC<CreateDeckFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [legality, setLegality] = useState(legalities[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { createDeck } = useDecks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createDeck(legality, name);
      setSuccess(`Deck created successfully!`);
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="mb-4">
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          {loading ? 'Creating...' : 'Create Deck'}
        </button>
      </div>
      {error && <p className={styles.errorText}>Error: {error}</p>}
      {success && <p className={styles.successText}>{success}</p>}
    </form>
  );
};

export default CreateDeckForm;