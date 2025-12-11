import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import FeaturedProblemsSection from "../components/home/FeaturedProblemsSection";
import CallToActionSection from "../components/home/CallToActionSection";

export default function HomePage() {
  return (
    <div className="pb-12">

      <HeroSection />
      <HowItWorksSection />
      <FeaturedProblemsSection />
      <CallToActionSection />
    </div>
  );
}
