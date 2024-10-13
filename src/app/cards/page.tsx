'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchCards } from '../../utils/fetchCards';
import { MtGCard } from '@/types/mtgCard';
import { useUser } from '@auth0/nextjs-auth0';

export default function Page() {
  const [cards, setCards] = useState<MtGCard[]>([]);
  const [page, setPage] = useState(1);
  
  const limit = 20;

  const loadCards = async (page) => {
    const skip = (page - 1) * limit;
    const response = await fetch('/api/auth/token');
    const { accessToken } = await response.json();
    console.log('accessToken', accessToken);
    const newCards: MtGCard[] = await fetchCards(limit, skip, "en", accessToken);
    setCards((prevCards) => [...prevCards, ...newCards]);
  };

  useEffect(() => {
    loadCards(page);
  }, [page]);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="mtg-card">
            <div className="mtg-card-body">
              <div className="mtg-card-image-container">
                <div className="mtg-card-header">
                  <h4 className="font-bold text-lg">{card.name}</h4>
                </div>
                <img src={card.image_uris.border_crop} alt={card.artist} className="mtg-card-image" />
                <img src={card.image_uris.large} alt={card.artist} className="mtg-card-full-image" />
              </div>
              <div className="mtg-card-footer">
                <a href={card.scryfall_set_uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Scryfall Set URI
                </a>
                <small className="text-gray-500">CMC: {card.cmc}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}