'use client';

import React from 'react';
import {useParams, useRouter} from 'next/navigation';
import CardList from '@/components/CardList';

const SetPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const setId = params && Array.isArray(params.id) ? params.id[0] : params?.id;

  if (!setId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CardList initialParams={{ setId: setId }} showSearchBar={false} />
    </div>
  );
};

export default SetPage;