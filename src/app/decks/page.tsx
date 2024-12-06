'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import CreateDeckForm from '@/components/CreateDeckForm';
import DisplayDecks from '@/components/DisplayDecks';
import { useDecks } from '@/context/DecksContext';

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

  // Fetch user decks on load
  useEffect(() => {
    refreshUserDecks();
  }, [refreshUserDecks]);

  // Fetch paginated other decks
  useEffect(() => {
    console.log('Current page:', page);
    fetchOtherDecks(page, limit);
  }, [refreshUserDecks]);

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
  
      // Prevent infinite scrolling if content fits within the viewport
      if (scrollHeight <= clientHeight) return;
  
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

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