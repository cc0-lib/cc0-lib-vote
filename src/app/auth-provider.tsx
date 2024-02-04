"use client";
import React from "react";
import { DynamicContextProvider, EthereumWalletConnectors } from "../lib/dynamic";

export default function AuthProvider({
  children,
  environmentId,
}: {
  children: React.ReactNode;
  environmentId: string;
}) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onEmailVerificationSuccess: () => {
            console.log("onEmailVerificationSuccess was called");
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
