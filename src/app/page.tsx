import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { createClient } from "@/lib/supabase/server";
import { ensResolver } from "@/lib/utils";
import Three from "./vote";

export default async function Home() {
  const supabase = createClient();

  const { data: currentRound } = await supabase.from("round").select().eq("is_current", true).single();

  const { data: submissions, error } = await supabase
    .from("submission")
    .select()
    .eq("round", currentRound?.id || 1);

  if (error) {
    console.log("Error fetching submissions");
  }

  if (submissions) {
    await Promise.all(
      submissions.map(async (submission) => {
        if (submission.artist) {
          const ens = await ensResolver(submission.artist);
          submission.ens = ens.ens;
        }
      }),
    );
  }

  return (
    <Container>
      <Header />
      <Three submissions={submissions as any} />
      <Footer />
    </Container>
  );
}
