"use server";
import { supabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface User {
  email: string | undefined;
  username: string | undefined | null;
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
    revalidatePath("/");
    return data;
  }

  const newUser = await supabase
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
