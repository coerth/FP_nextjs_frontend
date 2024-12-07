"use client";

import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import EditProfile from '@/components/user/EditProfile';
import Modal from '@/components/Modal';

const ProfileClient: React.FC = () => {
  const { user, updateUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  const handleSave = async (name: string, nickname: string) => {
    try {
      await updateUser({ name, nickname });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <h3>{user.nickname}</h3>
      {/* <p>{user.email}</p>
      <p>User ID: {user.sub}</p>
      <p>Locale: {user.locale}</p> */}
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Edit Profile
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit Profile">
        <EditProfile user={user} onSave={handleSave} />
      </Modal>
    </div>
  );
};

export default ProfileClient;
