 

import { DashboardPreview } from "@/components/frontend/dashboard-preview";
import GridFeatures from "@/components/frontend/grid-features";
import HeroSection from "@/components/frontend/hero-section";
import LogoCloud from "@/components/frontend/logo-cloud";
import Pricing from "@/components/frontend/pricing";
import TabbedFeatures from "@/components/frontend/tabbed-features";

export default function Home() {
  return (
    <main className="">
       <HeroSection />
      <LogoCloud />
      <DashboardPreview />
      <GridFeatures />
       <TabbedFeatures />
      <Pricing /> 
    </main>
  );
}
