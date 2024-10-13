import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const { user } = await getSession();

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