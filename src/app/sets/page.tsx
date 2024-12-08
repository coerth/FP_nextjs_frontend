'use client';

import React, { useState, useEffect } from 'react';
import { fetchSets } from '@/services/setService';
import { MtgSet } from '@/types/mtgSet';
import DisplaySets from '@/components/DisplaySets';

const SetsPage: React.FC = () => {
  const [sets, setSets] = useState<MtgSet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSets = async () => {
      try {
        const fetchedSets = await fetchSets({ limit: 30, skip: 0 });
        setSets(fetchedSets);
      } catch (err) {
        setError('Failed to fetch sets');
      } finally {
        setLoading(false);
      }
    };

    loadSets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Sets</h1>
      <DisplaySets sets={sets} />
    </div>
  );
};

export default SetsPage;