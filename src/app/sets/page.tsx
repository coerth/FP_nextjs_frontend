'use client';

import React, { useState, useEffect } from 'react';
import { fetchSets } from '@/services/setService';
import { MtgSet } from '@/types/mtgSet';

const SetsPage: React.FC = () => {
  const [sets, setSets] = useState<MtgSet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSets = async () => {
      try {
        const fetchedSets = await fetchSets({ limit: 30 });
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Set URI</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set) => (
            <tr key={set.set_id}>
              <td>{set.set_id}</td>
              <td>{set.set_name}</td>
              <td>{set.set_uri}</td>
              <td>{set.icon_svg_uri}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SetsPage;