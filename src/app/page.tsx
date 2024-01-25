import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { getUserData } from "./vote/action";

export default async function Home() {
  try {
    const data = await getUserData();
  } catch (error) {
    return error;
  }

  return (
    <Container>
      <Header />
      <span className="font-chakra text-8xl font-bold uppercase">
        <SplitLetters text="VOTE" delay={0.25} />
      </span>
      <Footer />
    </Container>
  );
}
