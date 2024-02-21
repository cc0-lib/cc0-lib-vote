"use server";
import { adminAuthClient } from "@/lib/supabase/admin";
import { supabase } from "@/lib/supabase/server";
import { UserProfile } from "@dynamic-labs/sdk-react-core";
import { revalidatePath } from "next/cache";
import pino from "pino";

const logger = pino();
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

  if (count && count === 1) {
    if (!data) {
      return null;
    }

    await supabase.auth.signInWithPassword({
      email: user.email,
      password: wallet.address,
    });

    revalidatePath("/");
    return data;
  }

  const authData = await adminAuthClient.createUser({
    user_metadata: {
      walletAddress: wallet.address,
      dynamicUserId: user.userId,
    },
    email: user.email,
    password: wallet.address,
    email_confirm: true,
  });

  const newUser = await supabase
    .from("user")
    .insert({
      address: wallet ? wallet.address : "",
      name: user.username || "",
      email: user.email || "",
      vote_count: 10,
      auth_id: authData.data.user?.id,
    })
    .select()
    .single();

  if (newUser.data) {
    revalidatePath("/");
    return newUser.data;
  }
}

export async function castVote(submissionId: number, userAddress: string) {
  const { data: userResponse, error: userError } = await supabase
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
    const { error } = await supabase
      .from("vote")
      .insert({
        user: userResponse.id,
        submission_id: submissionId,
        round: 1,
      })
      .select()
      .single();

    if (error) {
      console.log(error);
    }
  }

  revalidatePath("/");

  return {
    data: "success",
  };
}

export async function revertVote(voteId: any, userId: number) {
  const { error } = await supabase.from("vote").delete().eq("submission_id", voteId).eq("user", userId);

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
    console.error(error);
  }

  return data;
}
