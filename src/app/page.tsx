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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to Folio-Ready</h1>
        <p className="mt-2 text-lg">
          Discover the power of a hyper-custom, AI-Powered Portfolio Generator.
        </p>
        <>
          <Link
            href="/auth/login"
            className="mt-4 bg-[green] p-4 rounded-lg hover:bg-[grey] "
          >
            Login
          </Link>
        </>
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
