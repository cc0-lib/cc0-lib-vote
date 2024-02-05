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

  return response.json();
}

export function truncateAddress(hexString: string) {
  if (hexString.length < 8) {
    return "Invalid input";
  }

  const front = hexString.substring(0, 4);
  const back = hexString.substring(hexString.length - 4);

  return `${front}....${back}`;
}
