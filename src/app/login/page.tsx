"use client";

import Container from "@/components/container";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import React from "react";

export default function Login() {
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <Container variant="center">
      <h1>Login or register</h1>
      <button
        className="mt-2 rounded-md border p-2"
        onClick={() => setShowAuthFlow(true)}
      >
        Connect
      </button>
    </Container>
  );
}
