import React, { useState } from 'react';
import { MtGCard } from '@/types/mtgCard';
import { useDecks } from '@/context/DecksContext';
import styles from '../styles/CardModal.module.css';
import useCardModal from '@/hooks/useCardModal';
import { MtGDeck } from '@/types/mtgDeck';

interface CardModalProps {
  card: MtGCard;
  isOpen: boolean;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose }) => {
  const { userDecks: decks, addCardToDeck } = useDecks();
  const { state, setSelectedDeckId, setCount, setLoading, setError, reset } = useCardModal();
  const [showAlert, setShowAlert] = useState(false);
  const [ignoreMismatch, setIgnoreMismatch] = useState(false);

  if (!isOpen) return null;

  const handleAddCard = async () => {
    if (state.selectedDeckId) {
      const selectedDeck = decks.find((deck) => deck.id === state.selectedDeckId);
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
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const isCardLegalForDeck = (card: MtGCard, deck: MtGDeck) => {
    const deckLegality = deck.legality.toLowerCase();
    return card.legalities[deckLegality as keyof typeof card.legalities] === 'legal';
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
          {card.prices.eur && <p><strong>Price:</strong> {card.prices.eur}£</p>}
          <a href={`/sets/${card.set_id}`} target="_blank" rel="noreferrer" className={styles['card-modal-link']}>
          <strong>Set:</strong> {card.set_name}
          </a>

          {card.keywords && card.keywords.length > 0 && (
            <>
              <p><strong>Keywords:</strong></p>
              {card.keywords.map((keyword) => (
                <span key={keyword} className={styles['card-modal-keyword']}>
                  {keyword}
                </span>
              ))}
            </>
          )}
          {decks.length > 0 && (
            <div className={styles['card-modal-deck-selector']}>
              <div>
                <label htmlFor="deck">Add to Deck:</label>
                <select
                  id="deck"
                  value={state.selectedDeckId || ''}
                  onChange={(e) => setSelectedDeckId(e.target.value)}
                  className={styles['card-modal-select']}
                >
                  <option value="" disabled>
                    Select a deck
                  </option>
                  {decks.map((deck) => (
                    <option key={deck.id} value={deck.id}>
                      {deck.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="count">Count:</label>
                <input
                  type="number"
                  id="count"
                  value={state.count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  min="1"
                  className={styles['card-modal-input']}
                />
              </div>
              <button
                onClick={handleAddCard}
                className="editButton"
                disabled={state.loading}
              >
                {state.loading ? 'Adding...' : 'Add Card'}
              </button>
            </div>
          )}
          {state.error && <p className={styles['card-modal-error']}>{state.error}</p>}

          {showAlert && (
            <div className={styles['card-modal-alert']} role="alert">
              <strong>Error:</strong> This card is not legal for the selected deck.
              <div className={styles['card-modal-alert-buttons']}>
                <button
                  onClick={() => {
                    setIgnoreMismatch(true);
                    setShowAlert(false);
                    handleAddCard();
                  }}
                  className={styles['card-modal-ignore-button']}
                >
                  Ignore and Add
                </button>
                <button
                  onClick={() => setShowAlert(false)}
                  className="{styles['card-modal-cancel-button']}"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className={styles['card-modal-legalities']}>
            <h3><strong>Legal Formats:</strong></h3>
            <div className={styles['card-modal-legalities-grid']}>
              {Object.keys(card.legalities).map((format) => (
                <div
                  key={format}
                  className={
                    card.legalities[format as keyof typeof card.legalities] === 'legal'
                      ? styles['card-modal-legal-badge']
                      : styles['card-modal-not-legal-badge']
                  }
                >
                  {format.toUpperCase()} 
                </div>
              ))}
            </div>
          </div>

          <button onClick={onClose} className={styles['card-modal-close-button']}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
