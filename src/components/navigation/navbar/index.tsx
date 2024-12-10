'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import AuthButton from "./AuthButton";
import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname } from 'next/navigation';
import styles from '@/styles/navigation.module.css';

const Navbar = () => {
  const { user } = useUser();
  const currentPath = usePathname();
  const [currentSymbolColor, setCurrentSymbolColor] = useState('');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSymbolChange = (color: string) => {
    setCurrentSymbolColor(color);
  };

  const linkClasses = (path: string) => {
    return currentPath?.startsWith(path) ?? false
      ? { borderBottom: `2px solid ${currentSymbolColor}` }
      : {};
  };

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShowNavbar(false);
      } else { // if scroll up show the navbar
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY); // remember current page location to use in the next move
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div className={`${styles.navbar} ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <div className={styles.logoContainer}>
            <Logo onSymbolChange={handleSymbolChange} />
          </div>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/cards">
                <p style={linkClasses('/cards')}>Cards</p>
              </Link>
            </li>
            <li>
              <Link href="/sets">
                <p style={linkClasses('/sets')}>Sets</p>
              </Link>
            </li>
            <li>
              <Link href="/decks">
                <p style={linkClasses('/decks')}>Decks</p>
              </Link>
            </li>
            {user && (
              <li>
                <Link href="/profile">
                  <p style={linkClasses('/profile')}>Profile</p>
                </Link>
              </li>
            )}
          </ul>
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;