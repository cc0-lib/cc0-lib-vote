"use client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import React from "react";

export default function LoginNav() {
  const { setShowAuthFlow, handleLogOut, getNameService, isAuthenticated } = useDynamicContext();

  const ens = getNameService();
  return (
    <>
      {isAuthenticated ? (
        <button onClick={() => handleLogOut()}>LOGOUT</button>
      ) : (
        <button onClick={() => setShowAuthFlow(true)}>CONNECT</button>
      )}
    </>
  );
}
