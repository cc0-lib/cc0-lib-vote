import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";

type Props = {};

const Loading = (props: Props) => {
  return (
    <Container variant="center">
      <SplitLetters text="LOADING" delay={0.25} />
    </Container>
  );
};

export default Loading;
