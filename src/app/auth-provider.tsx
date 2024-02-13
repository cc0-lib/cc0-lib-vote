"use client";
import React from "react";
import { DynamicContextProvider, EthereumWalletConnectors, UserProfile, Wallet } from "../lib/dynamic";
import { createClient } from "@/lib/supabase/client";
import useLocalStorage from "@/hooks/use-local-storage";

export default function AuthProvider({
  children,
  environmentId,
}: {
  children: React.ReactNode;
  environmentId: string;
}) {
  const [, setUser] = useLocalStorage("user", "");

  const addUser = async (user: UserProfile, wallet: Wallet | null, isAuthenticated: boolean) => {
    if (!isAuthenticated) {
      return;
    }

    const supabase = createClient();

    if (!user.email) {
      return;
    }

    const { count, data } = await supabase
      .from("user")
      .select("id, email", {
        count: "exact",
      })
      .eq("email", user.email);

    if (count && count === 1) {
      if (data) {
        setUser(data[0]);
      }
      return;
    }

    const response = await supabase
      .from("user")
      .insert({
        address: wallet ? wallet.address : "",
        name: user.username || "",
        email: user.email || "",
        vote_count: 10,
      })
      .select()
      .single();

    if (response.data) {
      setUser(response.data);
    }
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: ({ user, primaryWallet, isAuthenticated }) => {
            addUser(user, primaryWallet, isAuthenticated);
          },
          onLogout: () => localStorage.clear(),
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
