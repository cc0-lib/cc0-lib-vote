import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import Vote from "./vote";
import { getSubmissions } from "./action";

export default async function Home() {
  const { data: submissions } = await getSubmissions();

  let shuffledSubmissions;

  if (submissions) {
    shuffledSubmissions = submissions.slice();
    for (let i = shuffledSubmissions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledSubmissions[i];
      shuffledSubmissions[i] = shuffledSubmissions[j];
      shuffledSubmissions[j] = temp;
    }
  }

  return (
    <Container>
      <Header />
      <Vote submissions={shuffledSubmissions!} />
      <Footer />
    </Container>
  );
}
