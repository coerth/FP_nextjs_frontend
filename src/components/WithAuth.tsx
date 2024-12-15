import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const WithAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/api/auth/login');
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default WithAuth;