"use client";

import React, { useState } from 'react';
import EditProfile from '@/components/user/EditProfile';
import Modal from '@/components/Modal';

type ProfileClientProps = {
  user: {
    name: string;
    nickname: string;
    picture: string;
    email: string;
    sub: string;
    locale: string;
  };
};

const ProfileClient: React.FC<ProfileClientProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (name: string, nickname: string) => {
    // Update the user's profile with the new name and nickname
    // You can make an API call here to update the user's profile in your backend
    console.log('Saving profile:', { name, nickname });
    setIsModalOpen(false); // Close the modal after saving
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>User ID: {user.sub}</p> {/* Display the user ID */}
      <p>Locale: {user.locale}</p>
      <button onClick={handleOpenModal} className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Edit Profile
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit Profile">
        <EditProfile user={user} onSave={handleSave} />
      </Modal>
    </div>
  );
};

export default ProfileClient;