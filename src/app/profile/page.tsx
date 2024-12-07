"use client";

import React from 'react';
import { useUser } from '@/context/UserContext';
import Profile from '@/components/user/Profile';

export default function ProfileServer() {
  const { user, loading, error } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/api/auth/login';
    }
    return null;
  }

  return <Profile user={user} />;
}
