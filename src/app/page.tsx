import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import { getUserData } from "./vote/action";

export default async function Home() {
  const { data } = await getUserData("abbas@cc0-lib.wtf");

  return (
    <Container>
      <Header />
      <span className="font-chakra text-8xl font-bold uppercase">
        <SplitLetters text="VOTE" delay={0.25} />
        <div>
          <pre className="text-xs lowercase">{JSON.stringify(data)}</pre>
        </div>
      </span>
      <Footer />
    </Container>
  );
}
