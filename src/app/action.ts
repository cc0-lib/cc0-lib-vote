"use server";

import { createClient as createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getCurrentRound } from "./stats/action";
import { DynamicUser, SubmissionType, UserVotes, WalletCB } from "@/types";

export async function addUserAction(user: DynamicUser, wallet: WalletCB) {
  const supabase = createClient();
  const adminClient = createAdminClient();
  if (!user.email) {
    return;
  }

  const { count, data, error } = await supabase
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
  } else {
    console.log(error);
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

export async function castVote(submissionId: number, userId: number) {
  const adminClient = createAdminClient();

  const { data: currentRound } = await getCurrentRound();

  const { error } = await adminClient
    .from("vote")
    .insert({
      user: userId,
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

  return {
    data: "success",
    error: null,
  };
}

export async function revertVote(voteId: number, userId: number) {
  const adminClient = createAdminClient();

  const { error } = await adminClient.from("vote").delete().eq("submission_id", voteId).eq("user", userId);

  if (error) {
    console.error("revertVote error", error);
  }

  return;
}

export async function getUserVotes(userId: number, currentRound: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vote")
    .select(
      `
      id,
      submission(id)
      `,
    )
    .eq("user", userId)
    .eq("round", currentRound)
    .returns<UserVotes[]>();

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
    .eq("round", currentRound?.id || 1)
    .returns<SubmissionType[]>();

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
