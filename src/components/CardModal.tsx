import React, { useState } from 'react';
import { MtGCard } from '@/types/mtgCard';
import { useDecks } from '@/context/DecksContext';
import styles from './CardModal.module.css';
import useCardModal from '@/hooks/useCardModal';
import { MtGDeck } from '@/types/mtgDeck';

interface CardModalProps {
  card: MtGCard;
  isOpen: boolean;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose }) => {
  const { decks, addCardToDeck } = useDecks();
  const { state, setSelectedDeckId, setCount, setLoading, setError, reset } = useCardModal();
  const [showAlert, setShowAlert] = useState(false);
  const [ignoreMismatch, setIgnoreMismatch] = useState(false);

  if (!isOpen) return null;

  const handleAddCard = async () => {
    if (state.selectedDeckId) {
      const selectedDeck = decks.find(deck => deck.id === state.selectedDeckId);
      if (selectedDeck && !isCardLegalForDeck(card, selectedDeck) && !ignoreMismatch) {
        setShowAlert(true);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        await addCardToDeck(state.selectedDeckId, card.id, state.count);
        onClose();
        reset();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const isCardLegalForDeck = (card: MtGCard, deck: MtGDeck) => {
    // Check if the card is legal for the deck
    const deckLegality = deck.legality.toLowerCase();
    return card.legalities[deckLegality] === 'legal';
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
              value={state.selectedDeckId || ''}
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
              value={state.count}
              onChange={(e) => setCount(Number(e.target.value))}
              min="1"
            />
            <button onClick={handleAddCard} className={styles['card-modal-add-button']} disabled={state.loading}>
              {state.loading ? 'Adding...' : 'Add Card'}
            </button>
            {state.error && <p className="text-red-500">{state.error}</p>}
          </div>
          {showAlert && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> This card is not legal for the selected deck.</span>
              <div className="mt-2">
                <button
                  onClick={() => {
                    setIgnoreMismatch(true);
                    setShowAlert(false);
                    handleAddCard();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Ignore and Add
                </button>
                <button
                  onClick={() => setShowAlert(false)}
                  className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => setShowAlert(false)}
                >
                  <title>Close</title>
                  <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
                </svg>
              </span>
            </div>
          )}
          <button onClick={onClose} className={styles['card-modal-close-button']}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;