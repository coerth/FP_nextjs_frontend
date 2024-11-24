'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Modal from '@/components/Modal';
import CreateDeckForm from '@/components/CreateDeckForm';
import DisplayDecks from '@/components/DisplayDecks';
import { MtGDeck } from '@/types/mtgDeck';
import { fetchJWTToken } from '@/utils/fetchJWTToken';
import { fetchDecksByUser } from '@/utils/Graphql/decks/fetchDecksByUser';
import { fetchAllDecks } from '@/utils/Graphql/decks/fetchAllDecks';

const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDecks, setUserDecks] = useState<MtGDeck[]>([]);
  const [otherDecks, setOtherDecks] = useState<MtGDeck[]>([]);
  const [loadingUserDecks, setLoadingUserDecks] = useState(false);
  const [loadingOtherDecks, setLoadingOtherDecks] = useState(false);
  const [errorUserDecks, setErrorUserDecks] = useState<string | null>(null);
  const [errorOtherDecks, setErrorOtherDecks] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const limit = 20;

  const loadUserDecks = async () => {
    setLoadingUserDecks(true);
    const accessToken = await fetchJWTToken();

    try {
      const fetchedUserDecks = await fetchDecksByUser(accessToken);
      setUserDecks(fetchedUserDecks);
    } catch (err) {
      setErrorUserDecks(err.message);
    } finally {
      setLoadingUserDecks(false);
    }
  };

  const loadOtherDecks = async (page: number) => {
    setLoading(true);
    const skip = (page - 1) * limit;
    const accessToken = await fetchJWTToken();

    try {
      const fetchedOtherDecks = await fetchAllDecks(limit, skip, accessToken);
      setOtherDecks((prevDecks) => {
        const deckIds = new Set(prevDecks.map(deck => deck.id));
        const uniqueDecks = fetchedOtherDecks.filter(deck => !deckIds.has(deck.id));
        return [...prevDecks, ...uniqueDecks];
      });
    } catch (err) {
      setErrorOtherDecks(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserDecks();
  }, []);

  useEffect(() => {
    loadOtherDecks(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

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
        <h2 className="text-2xl font-bold mt-8">Your Decks</h2>
        {loadingUserDecks && <p>Loading your decks...</p>}
        {errorUserDecks && <p>Error: {errorUserDecks}</p>}
        <DisplayDecks decks={userDecks} />

        <h2 className="text-2xl font-bold mt-8">All Decks</h2>
        {loadingOtherDecks && <p>Loading other decks...</p>}
        {errorOtherDecks && <p>Error: {errorOtherDecks}</p>}
        <DisplayDecks decks={otherDecks} />
        {loading && <p>Loading more decks...</p>}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Create New Deck">
        <CreateDeckForm onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Page;