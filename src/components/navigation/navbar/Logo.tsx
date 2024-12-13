"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getManaSymbolUrl, getManaSymbolColorCode } from '@/utils/manaSymbols';
import styles from '@/styles/navigation.module.css';

const manaSymbols = ['W', 'U', 'B', 'R', 'G'];

interface LogoProps {
  onSymbolChange: (color: string) => void;
}

const AnimatedLogo: React.FC<LogoProps> = ({ onSymbolChange }) => {
  const [currentSymbol, setCurrentSymbol] = useState(0);

  const handleMouseEnter = () => {
    setCurrentSymbol((prevSymbol) => (prevSymbol + 1) % manaSymbols.length);
  };

  const currentSymbolKey = manaSymbols[currentSymbol];
  const currentSymbolUrl = getManaSymbolUrl(currentSymbolKey);
  const currentSymbolColor = getManaSymbolColorCode(currentSymbolKey);

  useEffect(() => {
    onSymbolChange(currentSymbolColor);
  }, [currentSymbolColor, onSymbolChange]);

  return (
    <Link href="/">
      <motion.div
        className={styles.logoContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onMouseEnter={handleMouseEnter}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="relative"
        >
          <Image
            src={currentSymbolUrl}
            alt="Mana symbol"
            width={40}
            height={40}
            className={styles.logoImage}
          />
        </motion.div>
        <div className="relative">
          <span className={styles.logoText}>
            DeckBuild
          </span>
          <div
            className={styles.logoUnderline}
            style={{ backgroundColor: currentSymbolColor }}
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default AnimatedLogo;