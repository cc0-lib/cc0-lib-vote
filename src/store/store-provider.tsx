"use client";

import { createUserDataStore } from "@/store/user-store";
import { UserDataStore } from "@/types";
import { createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export const UserStoreContext = createContext<StoreApi<UserDataStore> | null>(null);

export const UserStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<StoreApi<UserDataStore>>();
  if (!storeRef.current) {
    storeRef.current = createUserDataStore();
  }

  return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
};

export const useUserDataStore = <T,>(selector: (store: UserDataStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserDataStore must be use within UserStoreProvider`);
  }
  return useStore(userStoreContext, selector);
};
