import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { supabase } from "@/lib/supabase/server";
import { ensResolver } from "@/lib/utils";
import Three, { SubmissionType } from "./three";

export default async function Home() {
  const { data: currentRound } = await supabase.from("round").select().eq("is_current", true).single();

  const { data, error } = await supabase
    .from("submission")
    .select()
    .eq("round", currentRound?.id || 1);

  if (error) {
    console.log("Error fetching submissions");
  }

  if (data) {
    await Promise.all(
      data.map(async (data) => {
        if (data.artist) {
          const ens = await ensResolver(data.artist);
          data.ens = ens.ens;
        }
      }),
    );
  }

  return (
    <Container>
      <Header />
      <Three submissions={data as any} />
      <Footer />
    </Container>
  );
}
