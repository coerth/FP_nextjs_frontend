'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const AuthButton = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <a href="/api/auth/logout">
          <button className="h-12 rounded-lg bg-black font-bold px-5">Log Out</button>
        </a>
      ) : (
        <Link href="/api/auth/login">
          <button className="h-12 rounded-lg bg-black font-bold px-5">Login</button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;