import { Metadata } from "next";

// Craft Imports
import { Section, Container } from "@/components/craft";
import { ArticlesSection } from "@/components/articles/articles";


import { ServicesSection } from "@/components/services-section/services";
import { PortfolioSection } from "@/components/portfolio/portfolio";
import { LogoMarquee } from "@/components/marquee/marquee";
import { NormalHero } from "@/components/normal-hero/normalhero";
import { ContactForm } from "@/components/contactform/contactform";


export const metadata: Metadata = {
  title: {
    absolute: "Kumocode | Expert Web Development & Digital Solutions South Africa",
  },
  description: "Kumocode builds high-performance, SEO-friendly websites and custom digital solutions designed to help South African businesses scale. Fast, secure, and built for growth.",
};

// This page is using the craft.tsx component and design system
export default async function Home() {
  return (
    <>
      <NormalHero />
      <LogoMarquee />

      <ServicesSection />
      <PortfolioSection />
      <ArticlesSection />
      <ContactForm />

    </>

  );
}


