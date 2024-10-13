'use client';
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/Modal';

export default function Home() {
  const searchParams = useSearchParams();
  const show = searchParams.get('show') === 'true';
  const [isModalOpen, setIsModalOpen] = useState(show);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/?show=true">
            <button onClick={() => setIsModalOpen(true)}>SUMMON THE MODAL</button>
          </Link>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Modal Title">
        <p>This is the modal content.</p>
      </Modal>
    </div>
  );
}