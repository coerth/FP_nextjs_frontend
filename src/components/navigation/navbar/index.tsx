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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else { 
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY); 
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
              <Link href="/cards" style={linkClasses('/cards')}>Cards</Link>
            </li>
            <li>
              <Link href="/sets" style={linkClasses('/sets')}>Sets</Link>
            </li>
            <li>
              <Link href="/decks" style={linkClasses('/decks')}>Decks</Link>
            </li>
            {user && (
              <li>
                <Link href="/profile" style={linkClasses('/profile')}>Profile</Link>
              </li>
            )}
          </ul>
          <div
            className={styles.hamburger}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
          </div>
          <AuthButton />
        </div>
        <div
  className={`${
    isMobileMenuOpen ? 'flex' : 'hidden'
  } md:hidden flex-col items-center bg-gray-900 text-white w-full absolute top-12 left-0 z-40 transition-transform duration-300`}
>
  <Link href="/cards" onClick={toggleMobileMenu} className={styles.mobileMenuLink}>Cards</Link>
  <Link href="/sets" onClick={toggleMobileMenu} className={styles.mobileMenuLink}>Sets</Link>
  <Link href="/decks" onClick={toggleMobileMenu} className={styles.mobileMenuLink}>Decks</Link>
  {user && (
    <Link href="/profile" onClick={toggleMobileMenu} className={styles.mobileMenuLink}>Profile</Link>
  )}
</div>
      </div>
    </div>
  );
};

export default Navbar;