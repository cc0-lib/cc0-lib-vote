import React from "react";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "../lib/dynamic";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.DYNAMIC_XYZ_ENVIRONMENT_ID!,
        walletConnectors: [EthereumWalletConnectors],
        appName: "cc0-lib vote",
        debugError: true,
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
