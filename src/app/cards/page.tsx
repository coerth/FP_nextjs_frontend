'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchCards } from '../../services/cardService';
import { MtGCard } from '@/types/mtgCard';
import DisplayCard from '@/components/DisplayCard';
import CardModal from '@/components/CardModal';
import SearchBar from '@/components/SearchBar';
import styles from '../../styles/CardList.module.css';

export default function Page() {
  const [cards, setCards] = useState<MtGCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<MtGCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const searchParams = useSearchParams();

  const limit = 20;

  const loadCards = async (page: number, params?: URLSearchParams) => {
    const skip = (page - 1) * limit;    
    const queryParams: { [key: string]: any } = {
      limit,
      skip,
      lang: 'en',
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

    const newCards: MtGCard[] = await fetchCards(queryParams);
    
    const cardsWithPage = newCards.map(card => ({ ...card, page }));

    setCards((prevCards) => {
      const cardIds = new Set(prevCards.map(card => card.id));
      const uniqueCards = cardsWithPage.filter(card => !cardIds.has(card.id));
      return [...prevCards, ...uniqueCards];
    });
  };

  useEffect(() => {
    loadCards(page);
  }, [page, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <h1 className="text-2xl font-bold mb-4">Cards</h1>
      <SearchBar handleSearch={handleSearch} />
      <div className={styles.gridContainer}>
        {cards.map((card) => (
          <DisplayCard key={card.id} card={card} onClick={() => handleCardClick(card)} />
        ))}
      </div>

      {selectedCard && (
        <CardModal isOpen={isModalOpen} onClose={handleCloseModal} card={selectedCard} />
      )}
    </div>
  );
}