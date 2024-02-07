import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";

export default async function Home() {
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
