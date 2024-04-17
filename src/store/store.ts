import { SubmissionType, User, UserVotes } from "@/app/vote";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export interface UserDataStore {
  loginData: User | null;
  storeUserData: (data: User) => void;
  clearUserData: () => void;
  votesData: UserVotes[];
  storeUserVotes: (data: UserVotes[]) => void;
  clearUserVotes: () => void;
  voteCountData: {
    votes: number;
  };
  storeVotesCount: (votes: number) => void;
  clearVotesCount: () => void;
  currentRound: string;
  setCurrenRound: (current: string) => void;
}

export const createUserDataStore = () => {
  return createStore<UserDataStore>()(
    persist(
      (set, get) => ({
        loginData: null,
        storeUserData: (data: User) => set({ loginData: data }),
        clearUserData: () => set({ loginData: null }),
        votesData: [],
        storeUserVotes: (data: UserVotes[]) =>
          set(() => ({
            votesData: data,
          })),
        clearUserVotes: () => set(() => ({ votesData: [] })),
        voteCountData: {
          votes: 0,
        },
        storeVotesCount: (votes: number) => set({ voteCountData: { votes } }),
        updateVotesCount: () =>
          set({ voteCountData: { votes: get().voteCountData.votes + 1 } }),
        clearVotesCount: () => set({ voteCountData: { votes: 0 } }),
        currentRound: "Round 1",
        setCurrenRound: (current) => set({ currentRound: current }),
      }),
      { name: "userData" },
    ),
  );
};
