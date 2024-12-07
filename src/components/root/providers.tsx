"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DecksProvider } from "@/context/DecksContext";
import { UserProvider as DBUserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

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
