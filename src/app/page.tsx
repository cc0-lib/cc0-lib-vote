import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { supabase } from "@/lib/supabase/server";
import { ensResolver } from "@/lib/utils";
import Three from "./three";

export default async function Home() {
  const response = await supabase.from("submission").select().eq("round", 1);

  if (response.error) {
    console.log("Error fetching submissions");
  }

  if (response.data) {
    await Promise.all(
      response.data.map(async (data) => {
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
      <Three submissions={response.data as any} />
      <Footer />
    </Container>
  );
}
