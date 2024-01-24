import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { getUserData } from "./user/action";

export default async function Home() {
  const { data, error } = await getUserData();
  
  console.log({
    data,
  });

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
