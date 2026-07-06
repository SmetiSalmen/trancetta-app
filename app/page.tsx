import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ConceptSection from "@/components/sections/ConceptSection";
import StorySection from "@/components/sections/StorySection";
import BestSellersSection from "@/components/sections/BestSellersSection";
import WhyTrancettaSection from "@/components/sections/WhyTrancettaSection";
import GallerySection from "@/components/sections/GallerySection";
import LocationSection from "@/components/sections/LocationSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroFeaturesBar from "@/components/sections/HeroFeaturesBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HeroFeaturesBar />
        <ConceptSection />
        <StorySection />
        <BestSellersSection />
        <WhyTrancettaSection />
        <GallerySection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
