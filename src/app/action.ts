"use server";
import { adminClient } from "@/lib/supabase/admin";
import { supabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentRound } from "./stats/action";

interface User {
  email: string | undefined;
  username: string | undefined | null;
  userId?: string;
}

interface WalletCB {
  address: string;
}

export async function addUserAction(user: User, wallet: WalletCB) {
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

    revalidatePath("/");
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
    revalidatePath("/");
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

    revalidatePath("/");
    revalidatePath("/leaderboard");

    if (error) {
      console.error("castVote", error);
      return {
        data: null,
        error,
      };
    }
  }

  return {
    data: "success",
    error: null,
  };
}

export async function revertVote(voteId: number, userId: number) {
  const { error } = await adminClient.from("vote").delete().eq("submission_id", voteId).eq("user", userId);

  if (error) {
    console.error("revertVote", error);
  }

  return;
}

export async function getUserVotes(userId: number) {
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
