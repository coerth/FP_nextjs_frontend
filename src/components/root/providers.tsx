"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DecksProvider } from "@/context/DecksContext";
import { UserProvider as DBUserProvider } from "@/context/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, 
      cacheTime: 1000 * 60 * 30, 
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <DBUserProvider>
          <DecksProvider>{children}</DecksProvider>
          </DBUserProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}
