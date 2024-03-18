import { User, UserVotes } from "@/app/three";
import { create } from "zustand";

interface UserData {
  loginData: User;
  storeUserData: (data: User) => void;
  clearUserData: () => void;
  votesData: UserVotes[];
  storeUserVotes: (data: UserVotes) => void;
  clearUserVotes: () => void;
  voteCountData: {
    votes: number;
  };
  storeVotesCount: (votes: number) => void;
  clearVotesCount: () => void;
}

export const useUserDataStore = create<UserData>((set) => ({
  loginData: null,
  storeUserData: (data: User) => set({ loginData: data }),
  clearUserData: () => set({ loginData: null }),
  votesData: [
    {
      id: 0,
      submission: {
        id: 0,
      },
    },
  ],
  storeUserVotes: (data: UserVotes) =>
    set((prev) => ({
      votesData: [
        ...prev.votesData,
        {
          id: data.id,
          submission: data.submission,
        },
      ],
    })),
  clearUserVotes: () => set(() => ({})),
  voteCountData: {
    votes: 0,
  },
  storeVotesCount: (votes: number) => set({ voteCountData: { votes } }),
  clearVotesCount: () => set({ voteCountData: { votes: 0 } }),
}));
