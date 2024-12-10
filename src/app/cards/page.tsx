'use client';

import React, { Suspense} from 'react';
import CardList from '@/components/CardList';

const CardsPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardList />
    </Suspense>
  );
};

export default CardsPage;