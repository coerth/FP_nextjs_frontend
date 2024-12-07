import React, { createContext, ReactNode, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUser as fetchUserDataAPI, updateUser as updateUserAPI } from '@/services/userService';
import { User } from '@/types/User';

interface UserContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => void;
  updateUser: (updatedData: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    refetch: refreshUser,
  } = useQuery<User, Error>('user', fetchUserDataAPI);

  const updateUserMutation = useMutation(updateUserAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });

  const updateUser = async (updatedData: Partial<User>) => {
    const { name, nickname } = updatedData;

    if (!name || !nickname) {
      throw new Error('Name and nickname are required to update user.');
    }

    await updateUserMutation.mutateAsync({ name, nickname });
  };

  return (
    <UserContext.Provider
      value={{
        user: user || null,
        loading: userLoading,
        error: userError?.message || null,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
