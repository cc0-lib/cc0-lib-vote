import { CURRENT_ROUND } from "@/lib/config";
import { UserDataStore } from "@/types";
import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const createUserDataStore = () => {
  return createStore<UserDataStore>()(
    devtools(
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
          unvote: (id) =>
            set(({ votesData }) => ({
              votesData: votesData.filter((submissionId) => submissionId !== id),
            })),
          voteCountData: {
            votes: 0,
          },
          vote: (data) => set((state) => ({ votesData: [...state.votesData, data] })),
          storeVotesCount: (votes: number) => set({ voteCountData: { votes } }),
          updateVotesCount: () => set({ voteCountData: { votes: get().voteCountData.votes + 1 } }),
          clearVotesCount: () => set({ voteCountData: { votes: 0 } }),
          roundData: {
            id: CURRENT_ROUND,
            status: null,
            title: `Round ${CURRENT_ROUND}`,
            url: null,
            winner_id: null,
            assigned_vote: null,
            created_at: "",
            end_time: null,
            is_current: null,
          },
          setRoundData: (current) => set({ roundData: current }),
          storeSubmissions: (data) => set({
            submissionData: data
          }),
          submissionData: [],
        }),
        { name: "userData" },
      ),
    ),
  );
};
