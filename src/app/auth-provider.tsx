"use client";
import React from "react";
import { DynamicContextProvider, EthereumWalletConnectors, UserProfile, Wallet } from "../lib/dynamic";
import { addUserAction } from "./action";
import { useUserDataStore } from "@/lib/store";

export default function AuthProvider({
  children,
  environmentId,
}: {
  children: React.ReactNode;
  environmentId: string;
}) {
  const userStore = useUserDataStore((state) => state);

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
      userStore.storeUserData({
        id: userResponse.id,
        email: userResponse.email,
      });
    }
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: ({ user, primaryWallet, isAuthenticated }) => addUser(user, primaryWallet, isAuthenticated),
          onLogout: () => {
            userStore.clearUserData();
            userStore.clearUserVotes();
            userStore.clearVotesCount();
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
