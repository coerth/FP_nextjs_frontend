'use client';
import Card from '@/components/frontpage/frontpageCard';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to MTG Deck Builder
        </h1>
        <p className={styles.description}>
          Search cards and sets to build your own deck!
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
    </div>
  );
}