'use client'

import { Hero } from "@/components/hero";
import { HeroTest2 } from "@/components/hero-test-2";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <HeroTest2 />
      <Leva hidden />
    </>
  );
}
