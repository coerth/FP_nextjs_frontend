'use client';

import React from 'react';
import {useParams, useRouter} from 'next/navigation';
import CardList from '@/components/CardList';

const SetPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const setId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!setId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cards in Set {setId}</h1>
      <CardList initialParams={{ setId: setId }} showSearchBar={false} />
    </div>
  );
};

export default SetPage;