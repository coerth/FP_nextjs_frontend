'use client';

import React from 'react';
import CardList from '@/components/CardList';

const CardsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cards</h1>
      <CardList />
    </div>
  );
};

export default CardsPage;