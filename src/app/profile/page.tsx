import { getSession } from '@auth0/nextjs-auth0';
import Profile from '@/components/user/Profile';


export default async function ProfileServer() {
  const session = await getSession();

  if (!session || !session.user) {
    // Redirect to login page if not authenticated
    if (typeof window !== 'undefined') {
      window.location.href = '/api/auth/login';
    }
    return null;
  }

  const { user } = session;

  return (
    user && <Profile user={user} />
  );
}