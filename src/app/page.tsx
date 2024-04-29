import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Vote from "./vote";
import { getSubmissions } from "./action";

export default async function Home() {
  const { data: submissions } = await getSubmissions();

  return (
    <Container>
      <Header />
      <Vote submissions={submissions!} />
      <Footer />
    </Container>
  );
}
