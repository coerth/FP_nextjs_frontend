'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Modal from '@/components/Modal';
import CreateDeckForm from '@/components/CreateDeckForm';
import DisplayDecks from '@/components/DisplayDecks';
import { fetchDecksByUser } from '@/utils/fetchDecksByUser';
import { MtGDeck } from '@/types/mtgDeck';
import { fetchJWTToken } from '@/utils/fetchJWTToken';

const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [decks, setDecks] = useState<MtGDeck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDecks = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await fetchJWTToken();
        const fetchedDecks = await fetchDecksByUser(token);
        setDecks(fetchedDecks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDecks();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      
      <div className="container mx-auto p-4">   
          <button
            onClick={handleOpenModal}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Create New Deck
          </button>
          {loading && <p>Loading decks...</p>}
          {error && <p>Error: {error}</p>}
          <DisplayDecks decks={decks} />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Create New Deck">
        <CreateDeckForm onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Page;