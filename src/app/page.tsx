import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Three from "./vote";
import { getSubmissions } from "./action";

export default async function Home() {
  const { data: submissions } = await getSubmissions();

  return (
    <Container>
      <Header />
      <Three submissions={submissions!} />
      <Footer />
    </Container>
  );
}
