import React from 'react';
import { MtGCard } from '@/types/mtgCard';
import styles from './CardModal.module.css';

interface CardModalProps {
  card: MtGCard;
  isOpen: boolean;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose }) => {
  if (!isOpen) return null;

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
          <button onClick={onClose} className={styles['card-modal-close-button']}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;