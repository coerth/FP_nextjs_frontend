import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { updateUser } from "@/app/services/userService";

type EditProfileProps = {
  user: {
    name: string;
    nickname: string;
  };
};

const EditProfile: React.FC<EditProfileProps> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [nickname, setNickname] = useState(user.nickname);

  const mutation = useMutation(
    ({ name, nickname }: { name: string; nickname: string }) => updateUser(name, nickname),
    {
      onSuccess: (data) => {
        console.log('Profile updated successfully:', data);
        // Optionally show a success notification
      },
      onError: (error: any) => {
        console.error('Error updating profile:', error.message);
        // Optionally show an error notification
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, nickname });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border bg-black border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
          Nickname
        </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mt-1 p-2 border bg-black border-gray-300 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className={`px-4 py-2 rounded-md ${
          mutation.isLoading ? 'bg-gray-400' : 'bg-blue-600 text-white'
        }`}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Saving...' : 'Save'}
      </button>
      {mutation.isError && (
        <div className="text-red-500 text-sm">
          Error: {(mutation.error as Error)?.message || 'Something went wrong.'}
        </div>
      )}
      {mutation.isSuccess && (
        <div className="text-green-500 text-sm">Profile updated successfully!</div>
      )}
    </form>
  );
};

export default EditProfile;
