import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface EnsResolverResult {
  address: string;
  avatar: string;
  avatar_url: string;
  contentHash: any;
  ens: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function ensResolver(walletAddress: string): Promise<EnsResolverResult> {
  const response = await fetch(`https://ensdata.net/${walletAddress}`, {
    method: "GET",
  });

  const data = (await response.json()) as EnsResolverResult;

  if (!data.ens) {
    data.ens = truncateAddress(data.address);
  }

  return data;
}

export function truncateAddress(hexString: string) {
  if (!hexString) {
    return "Invalid input";
  }

  if (hexString.length < 8) {
    return "Invalid input";
  }

  const front = hexString.substring(0, 4);
  const back = hexString.substring(hexString.length - 4);

  return `${front}....${back}`;
}
