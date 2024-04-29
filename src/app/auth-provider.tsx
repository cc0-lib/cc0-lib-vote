"use client";
import React from "react";
import { DynamicContextProvider, EthereumWalletConnectors, UserProfile, Wallet } from "../lib/dynamic";
import { addUserAction } from "./action";
import { useUserDataStore } from "@/store/store-provider";

export default function AuthProviderComponent({
  children,
  environmentId: providerEnvironmentId,
}: {
  children: React.ReactNode;
  environmentId: string;
}) {
  const userStore = useUserDataStore((state) => state);

  const onAuthSuccess = async ({
    user: authenticatedUser,
    primaryWallet,
    isAuthenticated,
  }: {
    user: UserProfile;
    primaryWallet: Wallet | null;
    isAuthenticated: boolean;
  }) => {
    console.log("onAuthSuccess", { authenticatedUser, primaryWallet, isAuthenticated });
    if (isAuthenticated && authenticatedUser) {
      const userResponse = await addUserAction(
        {
          email: authenticatedUser.email,
          username: authenticatedUser.username,
          userId: authenticatedUser.userId,
        },
        {
          address: primaryWallet?.address || "",
        },
      );

      if (userResponse) {
        userStore.storeUserData({
          id: userResponse.id,
          email: userResponse.email,
        });
      }
    }
  };

  const onLogout = () => {
    userStore.clearUserData();
    userStore.clearUserVotes();
    userStore.clearVotesCount();
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId: providerEnvironmentId,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess,
          onLogout,
          onEmbeddedWalletCreated: (data) => {
            console.log("onEmbeddedWalletCreated");
            console.log(data);
          },
          onUserProfileUpdate: (userData: UserProfile) => {
            console.log("onUserProfileUpdate");
            console.log(userData);
          },
          onEmailVerificationSuccess: (data) => {
            console.log("onEmailVerificationSuccess");
            console.log(data);
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
