import SplitLetters from "@/components/anim/split-letters";
import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import React from "react";

export default function FAQPage() {
  return (
    <Container>
      <Header />
      <div className="w-full font-chakra text-6xl font-bold">
        <SplitLetters text="FAQ" />
      </div>

      <ul className="grid w-2/3 gap-6">
        <li>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel deserunt maxime deleniti autem beatae,
            doloribus at, est officia quidem rerum dignissimos, voluptatibus possimus illum illo unde vero quas?
            Necessitatibus, hic.
          </p>
        </li>
        <li>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel deserunt maxime deleniti autem beatae,
            doloribus at, est officia quidem rerum dignissimos, voluptatibus possimus illum illo unde vero quas?
            Necessitatibus, hic.
          </p>
        </li>
        <li>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel deserunt maxime deleniti autem beatae,
            doloribus at, est officia quidem rerum dignissimos, voluptatibus possimus illum illo unde vero quas?
            Necessitatibus, hic.
          </p>
        </li>
        <li>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel deserunt maxime deleniti autem beatae,
            doloribus at, est officia quidem rerum dignissimos, voluptatibus possimus illum illo unde vero quas?
            Necessitatibus, hic.
          </p>
        </li>
      </ul>
      <Footer />
    </Container>
  );
}
