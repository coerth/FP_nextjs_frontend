"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DecksProvider } from "@/context/DecksContext";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <DecksProvider>{children}</DecksProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}
