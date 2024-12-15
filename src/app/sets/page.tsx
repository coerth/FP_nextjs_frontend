'use client';

import React, { useState, useEffect } from 'react';
import { MtgSet } from '@/types/mtgSet';
import DisplaySets from '@/components/DisplaySets';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useFetchSets } from '@/hooks/useFetchSets';

const SetsPage: React.FC = () => {
  const [sets, setSets] = useState<MtgSet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 30;

  const { getSets } = useFetchSets();

  const loadSets = async (page: number) => {
    setLoading(true);
    try {
      const fetchedSets = await getSets(page, { limit, skip: (page - 1) * limit });
      setSets((prevSets) => [...prevSets, ...fetchedSets]);
    } catch (err) {
      setError('Failed to fetch sets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSets(page);
  }, [page]);

  useInfiniteScroll(loading, () => setPage((prevPage) => prevPage + 1));

  if (loading && sets.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="container">
        <DisplaySets sets={sets} />
      </div>
      {loading && <div>Loading more sets...</div>}
    </div>
  );
};

export default SetsPage;