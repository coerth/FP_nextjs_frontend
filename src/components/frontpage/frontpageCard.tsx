import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
}

const Card: React.FC<CardProps> = ({ title, description, href, imageSrc }) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-96 group"
      >
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:filter-none transition-filter duration-300"
        />
        <div className="relative p-6 z-10 bg-black bg-opacity-70">
          <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-gray-200">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Card;