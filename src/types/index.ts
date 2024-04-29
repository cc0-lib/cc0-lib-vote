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
  roundData: Round;
  setRoundData: (current: Round) => void;
  storeSubmissions: (data: SubmissionType[]) => void;
  submissionData: SubmissionType[];
}

export interface Round {
  assigned_vote: number | null;
  created_at: string;
  end_time: string | null;
  id: number;
  is_current: boolean | null;
  status: string | null;
  title: string | null;
  url: string | null;
  winner_id: number | null;
}

export interface DynamicUser {
  email: string | undefined;
  username: string | undefined | null;
  userId?: string;
}

export interface WalletCB {
  address: string;
}

export type SubmissionType = {
  id: number;
  title: string;
  artist: string;
  image: string;
  tldr: string;
  url: string;
  round: number;
  votes: number;
  ens?: string;
  voted?: boolean;
};

export interface UserVotes {
  id: number;
  submission: {
    id: number;
  };
}

export type User = {
  id: number;
  email: string | null;
} | null;

export interface Leaderboard {
  artist: string;
  created_at: string;
  id: number;
  image: string;
  is_winner: boolean;
  prop_id: number;
  round: number;
  title: string;
  tldr: string;
  url: string;
  resolvedEns: string;
  totalVotes: number;
  percentage: number;
}

export interface EnsResolverResult {
  address: string;
  avatar: string;
  avatar_url: string;
  contentHash: any;
  ens: string | null;
}
