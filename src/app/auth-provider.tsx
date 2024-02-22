"use client";
import React from "react";
import { DynamicContextProvider, EthereumWalletConnectors, UserProfile, Wallet } from "../lib/dynamic";
import useLocalStorage from "@/hooks/use-local-storage";
import { addUserAction } from "./action";

export default function AuthProvider({
  children,
  environmentId,
}: {
  children: React.ReactNode;
  environmentId: string;
}) {
  const [, setUser] = useLocalStorage("user", "");

  const addUser = async (user: UserProfile, primaryWallet: Wallet | null, isAuthenticated: boolean) => {
    if (!isAuthenticated || !user) {
      return;
    }

    // structuredClone failed because there is function on wallet object
    const userResponse = await addUserAction(
      { email: user.email, username: user.username, userId: user.userId },
      { address: primaryWallet ? primaryWallet?.address : "" },
    );

    if (userResponse) {
      setUser(userResponse);
    }
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: ({ user, primaryWallet, isAuthenticated }) => addUser(user, primaryWallet, isAuthenticated),
          onLogout: () => setUser(null),
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
