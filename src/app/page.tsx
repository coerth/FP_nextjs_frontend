'use client';
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Card from '@/components/frontpage/frontpageCard';

export default function Home() {
  const searchParams = useSearchParams();
  const show = searchParams.get('show') === 'true';
  const [isModalOpen, setIsModalOpen] = useState(show);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
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