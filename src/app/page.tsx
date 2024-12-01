'use client';
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Card from '@/components/frontpage/frontpageCard';
import styles from '../styles/Home.module.css';

export default function Home() {
  const searchParams = useSearchParams();
  const show = searchParams.get('show') === 'true';
  const [isModalOpen, setIsModalOpen] = useState(show);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.history.pushState({}, '', '/');
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to MTG Deck Builder
        </h1>
        <p className={styles.description}>
          Search cards and decks to build your own deck!
        </p>
        <div className={styles.grid}>
          <Card
            title="Cards"
            description="Browse all available cards."
            href="/cards"
            imageSrc="/images/Cards.jpg"
          />
          <Card
            title="Sets"
            description="Explore different card sets."
            href="/sets"
            imageSrc="/images/Sets.jpg"
          />
          <Card
            title="Decks"
            description="View and manage your decks."
            href="/decks"
            imageSrc="/images/Decks.jpg"
          />
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Modal Title">
        <p>This is the modal content.</p>
      </Modal>
    </div>
  );
}