import Container from "@/components/container";
import Footer from "@/components/section/footer";
import Header from "@/components/section/header";
import React from "react";

export default function VoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container variant="between">
      <Header />
      {children}
      <Footer />
    </Container>
  );
}
