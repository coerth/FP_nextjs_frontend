'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchCards } from '@/services/cardService';
import { MtGCard } from '@/types/mtgCard';
import DisplayCard from '@/components/DisplayCard';
import CardModal from '@/components/CardModal';
import SearchBar from '@/components/SearchBar';
import styles from '../styles/CardList.module.css';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface CardListProps {
  initialParams?: { [key: string]: any };
  showSearchBar?: boolean;
}

const CardList: React.FC<CardListProps> = ({ initialParams = {}, showSearchBar = true }) => {
  const [cards, setCards] = useState<MtGCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<MtGCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const limit = 20;

  const loadCards = async (page: number, params?: URLSearchParams) => {
    setLoading(true);
    const skip = (page - 1) * limit;
    const queryParams: { [key: string]: any } = {
      limit,
      skip,
      lang: 'en',
      ...initialParams,
    };

    if (params) {
      params.forEach((value, key) => {
        if (key === 'color') {
          queryParams[key] = value.toUpperCase();
        } else if (key.startsWith('legalities.')) {
          const format = key.split('.')[1];
          if (!queryParams.legalities) {
            queryParams.legalities = {};
          }
          queryParams.legalities[format] = value;
        } else {
          queryParams[key] = value;
        }
      });
    } else {
      searchParams.forEach((value, key) => {
        if (key === 'color') {
          queryParams[key] = value.toUpperCase();
        } else if (key.startsWith('legalities.')) {
          const format = key.split('.')[1];
          if (!queryParams.legalities) {
            queryParams.legalities = {};
          }
          queryParams.legalities[format] = value;
        } else {
          queryParams[key] = value;
        }
      });
    }

    try {
      const newCards: MtGCard[] = await fetchCards(queryParams);
      const cardsWithPage = newCards.map(card => ({ ...card, page }));

      setCards((prevCards) => {
        const cardIds = new Set(prevCards.map(card => card.id));
        const uniqueCards = cardsWithPage.filter(card => !cardIds.has(card.id));
        return [...prevCards, ...uniqueCards];
      });
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards(page);
  }, [page]);

  useInfiniteScroll(loading, () => setPage((prevPage) => prevPage + 1));

  const handleCardClick = (card: MtGCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleSearch = (params: URLSearchParams) => {
    setPage(1);
    setCards([]);
    loadCards(1, params);
  };

  return (
    <div className="container">
      {showSearchBar && <SearchBar handleSearch={handleSearch} />}
      <div className={styles.gridContainer}>
        {cards.map((card) => (
          <DisplayCard key={card.id} card={card} onClick={() => handleCardClick(card)} />
        ))}
      </div>

      {selectedCard && (
        <CardModal isOpen={isModalOpen} onClose={handleCloseModal} card={selectedCard} />
      )}
      {loading && <div>Loading more cards...</div>}
    </div>
  );
};

export default CardList;