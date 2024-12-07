import React, { useState } from 'react';

interface EditProfileProps {
  user: {
    name: string;
    nickname: string;
  };
  onSave: (name: string, nickname: string) => Promise<void>;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [nickname, setNickname] = useState(user.nickname);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(name, nickname);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Nickname:
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
        Save
      </button>
    </form>
  );
};

export default EditProfile;
