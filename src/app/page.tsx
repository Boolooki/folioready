// src/app/page.tsx
import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ScreenshotCarousel from "@/components/sections/ScreenshotCarousel";
import PricingSection from "@/components/sections/PricingSection";
import Testimonials from "@/components/sections/Testimonials";
import CtaBanner from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <main>
      <div className="min-h-[75vw] flex flex-col items-center justify-center">
        <h1 className="mt-25 text-4xl font-bold">Welcome to Folio-Ready</h1>
        <h1 className="text-4xl font-bold">Your Portfolio Builder</h1>
        <p className="mt-5 text-lg">
          A powerful tools, designed for creators, developers, and designers
        </p>
        <p className="text-lg">
           No code required. Fully customizable. Instantly impressive.
        </p>
        <div className="mt-10">
          <Link
            href="/auth/login"
            className="mt-4 bg-[blue] text-white p-4 rounded-lg hover:bg-[lightblue] transition-colors duration-200"
          >
            Generate Your Portfolio <span className="text-[lightblue]">- Free*</span>
          </Link>
        </div>
        <p className="mt-15 text-sm">
           No code required. Fully customizable. Instantly impressive.
        </p>
      </div>
      <HeroSection />
      <FeaturesSection />
      <ScreenshotCarousel />
      <PricingSection />
      <Testimonials />
      <CtaBanner />
    </main>
  );
}
