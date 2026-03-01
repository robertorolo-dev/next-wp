import { Metadata } from "next";

// Craft Imports
import { Section, Container } from "@/components/craft";
import { ArticlesSection } from "@/components/articles/articles";

import { ServicesSection } from "@/components/services-section/services";
import { PortfolioSection } from "@/components/portfolio/portfolio";
import { LogoMarquee } from "@/components/marquee/marquee";
import { NormalHero } from "@/components/normal-hero/normalhero";
import { ContactForm } from "@/components/contactform/contactform";
import { WhyKumocode } from "@/components/why-kumocode/why-kumocode";
import { FaqSection } from "@/components/faq/faq";
import { faqs } from "@/components/faq/faq-data";


import { getMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = getMetadata(undefined, {
  title: "Web Development & Digital Solutions South Africa | Kumocode",
  description: "Kumocode is a South African web development agency building high-performance, SEO-friendly websites and custom digital solutions. Fast, secure, and built for growth.",
  path: "/",
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kumocode",
  url: siteConfig.site_domain,
  logo: `${siteConfig.site_domain}/kumocode.png`,
  image: `${siteConfig.site_domain}/opengraph-image.png`,
  description:
    "Kumocode is a South African web development agency crafting high-performance websites and custom digital solutions for businesses across South Africa.",
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
  },
  sameAs: ["https://www.kumocode.co.za"],
  serviceType: [
    "Web Development",
    "Software Development",
    "UI/UX Design",
    "E-commerce Solutions",
    "SEO & Digital Marketing",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kumocode",
  url: siteConfig.site_domain,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.site_domain}/?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

// This page is using the craft.tsx component and design system
export default async function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <NormalHero />
      <LogoMarquee />
      <ServicesSection />
      <WhyKumocode />
      <PortfolioSection />
      <ArticlesSection />
      <FaqSection schema={faqSchema} />
      <ContactForm />
    </>
  );
}
