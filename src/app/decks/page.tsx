'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Modal from '@/components/Modal';
import CreateDeckForm from '@/components/CreateDeckForm';
import { fetchDecks } from '@/utils/fetchDecksByUser';
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
        const fetchedDecks = await fetchDecks(token);
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
      <Head>
        <title>My Next.js Page</title>
        <meta name="description" content="A standard Next.js page" />
      </Head>
      <div className="container mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Welcome to My Next.js Page</h1>
        </header>
        <main>
          <p>This is a standard page created for demonstration purposes.</p>
          <p>Feel free to customize it as needed.</p>
          <button
            onClick={handleOpenModal}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Create New Deck
          </button>
          {loading && <p>Loading decks...</p>}
          {error && <p>Error: {error}</p>}
          <ul>
            {decks.map((deck) => (
              <li key={deck.id}>
                <h2>{deck.name}</h2>
                <p>Legality: {deck.legality}</p>
              </li>
            ))}
          </ul>
        </main>
        <footer className="mt-4">
          <p>&copy; {new Date().getFullYear()} My Next.js App</p>
        </footer>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Create New Deck">
        <CreateDeckForm onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Page;