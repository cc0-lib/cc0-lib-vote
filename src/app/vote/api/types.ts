export interface Response {
  data: Data;
}

export interface Data {
  round: Round;
}

export interface Round {
  id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
  eventState: string;
  isFullyFunded: boolean;
  manager: Manager;
  proposingStrategies: any[];
  votingStrategies: VotingStrategy[];
  timedConfig: TimedConfig;
}

export interface Manager {
  id: string;
}

export interface VotingStrategy {
  strategy: Strategy;
}

export interface Strategy {
  id: string;
  type: string;
  address: string;
  params: string[];
}

export interface TimedConfig {
  winnerCount: number;
  proposalThreshold: string;
  proposalPeriodStartTimestamp: string;
  proposalPeriodEndTimestamp: string;
  proposalPeriodDuration: string;
  votePeriodStartTimestamp: string;
  votePeriodEndTimestamp: string;
  votePeriodDuration: string;
  claimPeriodEndTimestamp: string;
  awards: Award[];
}

export interface Award {
  asset: Asset;
  amount: string;
}

export interface Asset {
  assetType: string;
  token: string;
  identifier: string;
}
