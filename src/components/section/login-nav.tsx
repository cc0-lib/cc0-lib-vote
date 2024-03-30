"use client";
import { truncateAddress } from "@/lib/utils";
import { DynamicUserProfile, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import React, { useEffect, useState } from "react";

export default function LoginNav() {
  const { setShowAuthFlow, getNameService, setShowDynamicUserProfile, isAuthenticated, primaryWallet } =
    useDynamicContext();
  const [ens, setEns] = useState("");

  useEffect(() => {
    (async () => {
      const ens = await getNameService();

      setEns(ens?.name || "");
    })();
  }, [ens, isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <button className="uppercase" onClick={() => setShowDynamicUserProfile(true)}>
            {ens !== "" ? ens : truncateAddress(primaryWallet?.address || "")}
          </button>
          <DynamicUserProfile />
        </>
      ) : (
        <button onClick={() => setShowAuthFlow(true)}>CONNECT</button>
      )}
    </>
  );
}
