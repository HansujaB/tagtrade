"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Closing() {
  return <section className="flex flex-col items-start justify-between gap-8 py-28 lg:flex-row lg:items-end lg:py-40">
    <h2 data-scene-heading className="max-w-[790px] font-heading text-[clamp(2.7rem,5.7vw,5.8rem)] font-medium leading-[1.07] tracking-[-0.045em]">Your next trade starts with a message.</h2>
    <Button render={<a href="#x-example" />} size="lg" className="min-h-12 shrink-0 px-5">See X example <ArrowUpRight data-icon="inline-end" /></Button>
  </section>;
}
