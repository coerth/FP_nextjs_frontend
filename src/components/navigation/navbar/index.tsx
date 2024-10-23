'use client';

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import AuthButton from "./AuthButton";
import { useUser } from '@auth0/nextjs-auth0/client';

const Navbar = () => {
  const { user } = useUser();

  return (
    <>
      <div className="navbar">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center h-full">
             <Logo />
            </div>
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/cards">
                  <p>Cards</p>
                </Link>
              </li>
              <li>
                <Link href="/sets">
                  <p>Sets</p>
                </Link>
              </li>
              <li>
                <Link href="/decks">
                  <p>Decks</p>
                </Link>
              </li>
              {user && (
                <li>
                  <Link href="/profile">
                    <p>Profile</p>
                  </Link>
                </li>
              )}
            </ul>
            <AuthButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;