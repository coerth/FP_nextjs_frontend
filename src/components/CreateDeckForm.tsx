import React, { useState } from 'react';
import { createDeck } from '@/utils/createDeck';

interface CreateDeckFormProps {
  onClose: () => void;
}

const CreateDeckForm: React.FC<CreateDeckFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [legality, setLegality] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/auth/token');
      const { accessToken } = await response.json();
      const deck = await createDeck(legality, name, accessToken);
      setSuccess(`Deck created: ${deck.name}`);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="legality">Legality:</label>
        <input
          type="text"
          id="legality"
          value={legality}
          onChange={(e) => setLegality(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Deck'}
      </button>
      {error && <p>Error: {error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default CreateDeckForm;