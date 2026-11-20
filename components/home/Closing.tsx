"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Closing() {
  return <section className="flex flex-col items-start justify-between gap-8 py-20 lg:flex-row lg:items-end lg:py-28">
    <h2 data-scene-heading className="max-w-[580px] section-heading">Your next trade starts with a message.</h2>
    <Button nativeButton={false} render={<a href="#x-example" />} size="lg" className="min-h-12 shrink-0 px-5">See X example <ArrowUpRight data-icon="inline-end" /></Button>
  </section>;
}
