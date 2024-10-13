import { getSession } from '@auth0/nextjs-auth0';

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
      user && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>User ID: {user.sub}</p> {/* Display the user ID */}
            <p>Locale: {user.locale}</p>
          </div>
      )
  );
}