import React from 'react';
import Head from 'next/head';

const Page: React.FC = () => {
  return (
    <>
      <Head>
        <title>My Next.js Page</title>
        <meta name="description" content="A standard Next.js page" />
      </Head>
      <div className="container mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Welcome to My Next.js Page</h1>
        </header>
        <main>
          <p>This is a standard page created for demonstration purposes.</p>
          <p>Feel free to customize it as needed.</p>
        </main>
        <footer className="mt-4">
          <p>&copy; {new Date().getFullYear()} My Next.js App</p>
        </footer>
      </div>
    </>
  );
};

export default Page;