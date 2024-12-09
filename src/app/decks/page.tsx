'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import CreateDeckForm from '@/components/CreateDeckForm';
import DisplayDecks from '@/components/DisplayDecks';
import { useDecks } from '@/context/DecksContext';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const Page: React.FC = () => {
  const {
    userDecks,
    otherDecks,
    fetchOtherDecks,
    refreshUserDecks,
    loading,
    error,
  } = useDecks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const limit = 20;

  useEffect(() => {
    refreshUserDecks();
  }, [refreshUserDecks]);

  useEffect(() => {
    fetchOtherDecks(page, limit);
  }, [refreshUserDecks]);

  useInfiniteScroll(loading, () => setPage((prevPage) => prevPage + 1));

  return (
    <>
      <div className="container">
        <button onClick={() => setIsModalOpen(true)} className="createButton">
          Create New Deck
        </button>
        <h2 className="sectionTitle">Your Decks</h2>
        {loading && <p className="loadingText">Loading your decks...</p>}
        {error && <p className="errorText">Error: {error}</p>}
        <DisplayDecks decks={userDecks} />

        <h2 className="sectionTitle">All Decks</h2>
        {loading && <p className="loadingText">Loading other decks...</p>}
        <DisplayDecks decks={otherDecks} />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Deck">
        <CreateDeckForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Page;