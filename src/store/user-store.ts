import { SubmissionType, User, UserVotes } from "@/app/vote";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export interface UserDataStore {
  loginData: User | null;
  storeUserData: (data: User) => void;
  clearUserData: () => void;
  votesData: number[];
  storeUserVotes: (submissionIds: number[]) => void;
  clearUserVotes: () => void;
  voteCountData: {
    votes: number;
  };
  unvote: (id: number) => void;
  vote: (data: number) => void;
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
        storeUserData: (data) => set({ loginData: data }),
        clearUserData: () => set({ loginData: null }),
        votesData: [],
        storeUserVotes: (data) =>
          set(() => ({
            votesData: data,
          })),
        clearUserVotes: () => set(() => ({ votesData: [] })),
        unvote: (removedId) =>
          set((state) => ({ votesData: state.votesData.filter((submissionId) => submissionId !== removedId) })),
        voteCountData: {
          votes: 0,
        },
        vote: (data) => set((state) => ({ votesData: [...state.votesData, data] })),
        storeVotesCount: (votes: number) => set({ voteCountData: { votes } }),
        updateVotesCount: () => set({ voteCountData: { votes: get().voteCountData.votes + 1 } }),
        clearVotesCount: () => set({ voteCountData: { votes: 0 } }),
        currentRound: "Round 1",
        setCurrenRound: (current) => set({ currentRound: current }),
      }),
      { name: "userData" },
    ),
  );
};
