"use client"

import { HeroTest } from "@/components/hero-test"
import { Leva } from "leva"

export default function TestPage() {
  return (
    <>
      <HeroTest />
      <Leva hidden />
    </>
  )
}
