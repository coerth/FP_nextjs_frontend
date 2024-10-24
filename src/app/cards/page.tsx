'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchCards } from '../../utils/fetchCards';
import { MtGCard } from '@/types/mtgCard';
import DisplayCard from '@/components/DisplayCard';
import CardModal from '@/components/CardModal';
import { fetchJWTToken } from '@/utils/fetchJWTToken';

export default function Page() {
  const [cards, setCards] = useState<MtGCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<MtGCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const searchParams = useSearchParams();

  const limit = 20;

  const loadCards = async (page: number) => {
    const skip = (page - 1) * limit;
    const accessToken = await fetchJWTToken();
    
    const params: { [key: string]: any } = {
      limit,
      skip,
      lang: 'en',
    };

    // Add search parameters to the params object
    searchParams.forEach((value, key) => {
      if (key === 'color') {
        params[key] = value.toUpperCase();
      } else {
        params[key] = value;
      }
    });

    const newCards: MtGCard[] = await fetchCards(params, accessToken);

    // Add page number to each card
    const cardsWithPage = newCards.map(card => ({ ...card, page }));

    // Avoid duplicates by checking if the card already exists in the state
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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