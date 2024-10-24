import React, { useState } from 'react';
import { MtGCard } from '@/types/mtgCard';
import { useDecks } from '@/context/DecksContext';
import styles from './CardModal.module.css';

interface CardModalProps {
  card: MtGCard;
  isOpen: boolean;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose }) => {
  const { decks, addCardToDeck } = useDecks();
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [count, setCount] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddCard = async () => {
    if (selectedDeckId) {
      setLoading(true);
      setError(null);
      try {
        await addCardToDeck(selectedDeckId, card.id, count);
        onClose();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles['card-modal-overlay']} onClick={onClose}>
      <div className={styles['card-modal-content']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['card-modal-image-container']}>
          <img src={card.image_uris.border_crop} alt={card.artist} className={styles['card-modal-image']} />
        </div>
        <div className={styles['card-modal-body']}>
          <h2 className={styles['card-modal-title']}>{card.name}</h2>
          <p><strong>Artist:</strong> {card.artist}</p>
          <p><strong>CMC:</strong> {card.cmc}</p>
          <p><strong>Set:</strong> {card.set_name}</p>
          <a href={card.scryfall_set_uri} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
            Scryfall Set URI
          </a>
          <div className={styles['card-modal-deck-selector']}>
            <label htmlFor="deck">Add to Deck:</label>
            <select
              id="deck"
              value={selectedDeckId || ''}
              onChange={(e) => setSelectedDeckId(e.target.value)}
            >
              <option value="" disabled>Select a deck</option>
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              ))}
            </select>
            <label htmlFor="count">Count:</label>
            <input
              type="number"
              id="count"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min="1"
            />
            <button onClick={handleAddCard} className={styles['card-modal-add-button']} disabled={loading}>
              {loading ? 'Adding...' : 'Add Card'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <button onClick={onClose} className={styles['card-modal-close-button']}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;