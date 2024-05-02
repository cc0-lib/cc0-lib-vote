import { EnsResolverResult } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function ensResolver(walletAddress: string): Promise<EnsResolverResult> {
  const response = await fetch(`https://ensdata.net/${walletAddress}`, {
    method: "GET",
  });

  const data = (await response.json()) as EnsResolverResult;

  if (!data.ens) {
    data.ens = truncateAddress(walletAddress);
  }

  return data;
}

export function truncateAddress(hexString: string) {
  if (!hexString) {
    return null;
  }

  if (hexString.length < 8) {
    return null;
  }

  const front = hexString.substring(0, 4);
  const back = hexString.substring(hexString.length - 4);

  return `${front}....${back}`;
}
