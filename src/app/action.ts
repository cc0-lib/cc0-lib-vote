"use server";
import { adminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath, unstable_cache } from "next/cache";
import { getCurrentRound } from "./stats/action";
import { ensResolver, truncateAddress } from "@/lib/utils";

interface User {
  email: string | undefined;
  username: string | undefined | null;
  userId?: string;
}

interface WalletCB {
  address: string;
}

export async function addUserAction(user: User, wallet: WalletCB) {
  const supabase = createClient();
  if (!user.email) {
    return;
  }

  const { count, data } = await supabase
    .from("user")
    .select("id, email", {
      count: "exact",
    })
    .eq("email", user.email);

  if (count === 1) {
    if (!data) {
      return null;
    }

    return data[0];
  }

  const newUser = await adminClient
    .from("user")
    .insert({
      address: wallet ? wallet.address : "",
      name: user.username || "",
      email: user.email || "",
      vote_count: 10,
    })
    .select()
    .single();

  if (newUser.data) {
    return newUser.data;
  }
}

export async function castVote(submissionId: number, userAddress: string) {
  const { data: currentRound } = await getCurrentRound();
  const { data: userResponse, error: userError } = await adminClient
    .from("user")
    .select("id")
    .eq("address", userAddress)
    .single();

  if (userError) {
    return {
      data: null,
      error: userError,
    };
  }

  if (userResponse) {
    const { error } = await adminClient
      .from("vote")
      .insert({
        user: userResponse.id,
        submission_id: submissionId,
        round: currentRound?.id,
      })
      .select()
      .single();

    if (error) {
      console.error("castVote", error);
      return {
        data: null,
        error,
      };
    }
  }

  revalidatePath("/leaderboard");

  return {
    data: "success",
    error: null,
  };
}

export async function revertVote(voteId: number, userId: number) {
  const { error, data, status } = await adminClient
    .from("vote")
    .delete()
    .eq("submission_id", voteId)
    .eq("user", userId);

  console.log("revertVote data", data);
  console.log("revertVote status", status);
  console.log("revertVote error", error);

  if (error) {
    console.error("revertVote error", error);
  }

  revalidatePath("/leaderboard");

  return;
}

export async function getUserVotes(userId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vote")
    .select(
      `
      id,
      submission(id)
      `,
    )
    .eq("user", userId);

  if (error) {
    console.error("getUserVotes", error);
  }

  return {
    data,
    error: null,
  };
}

export async function getSubmissions() {
  const supabase = createClient();

  const { data: currentRound } = await supabase.from("round").select().eq("is_current", true).single();

  const { data: submissions, error } = await supabase
    .from("submission")
    .select()
    .eq("round", currentRound?.id || 1);

  if (error) {
    return {
      data: null,
      error,
    };
  }

  return {
    data: submissions,
    error: null,
  };
}
