"use client";
import React from "react";
import { DynamicContextProvider, EthereumWalletConnectors, UserProfile, Wallet } from "../lib/dynamic";
import { createClient } from "@/lib/supabase/client";

export default function AuthProvider({
  children,
  environmentId,
}: {
  children: React.ReactNode;
  environmentId: string;
}) {
  const supabase = createClient();

  const addNewUser = async (userData: UserProfile, wallet: Wallet) => {
    if (!userData.email) {
      return;
    }

    const existed = (await supabase.from("user").select("id, email")).count;

    if (existed === 1) {
      return;
    }

    await supabase.from("user").insert({
      address: wallet.address,
      name: userData.username || "",
      email: userData.email || "",
      vote_count: 10,
    });
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: (args) => {
            addNewUser(args.user, args.primaryWallet!);
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
