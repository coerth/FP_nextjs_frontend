import React, { useState } from 'react';
import { useDecks } from '@/context/DecksContext';
import { legalities } from '@/types/legalities';

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
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border bg-black border-gray-300 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="legality" className="block text-sm font-medium text-gray-700">
          Legality:
        </label>
        <select
          id="legality"
          value={legality}
          onChange={(e) => setLegality(e.target.value)}
          className="mt-1 p-2 border bg-black border-gray-300 rounded w-full"
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
          className="mr-4 px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          {loading ? 'Creating...' : 'Create Deck'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </form>
  );
};

export default CreateDeckForm;