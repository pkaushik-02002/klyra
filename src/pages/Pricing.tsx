import React from "react";
import { GradientPricing } from "@/components/ui/gradient-pricing";
import { HeroHeader } from "@/components/blocks/hero-header";

export default function Pricing() {
  return (
    <div className="w-full bg-white dark:bg-neutral-950 min-h-screen">
      <HeroHeader />
      <GradientPricing />
    </div>
  );
} 