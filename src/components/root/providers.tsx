"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DecksProvider } from "@/context/DecksContext";
import { UserProvider as DBUserProvider } from "@/context/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time (in ms) that cached data is considered fresh
      staleTime: 1000 * 60 * 10, // 10 minutes
      // Time (in ms) before unused cache data is garbage collected
      cacheTime: 1000 * 60 * 30, // 30 minutes
      // Number of retries if a query fails
      retry: 2,
      // Enable or disable refetching on window focus
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Number of retries if a mutation fails
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
