"use client";

import React from 'react';
import Profile from '@/components/user/Profile';
import WithAuth from '@/components/WithAuth';

const ProfilePage = () => {
  return <Profile />;
};

export default WithAuth(ProfilePage);