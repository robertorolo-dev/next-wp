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
  title: "Web Development Agency South Africa | WordPress & Shopify | Kumocode",
  description: "Kumocode is a South African web development agency building high-performance WordPress, Shopify, and custom websites. Fast, SEO-optimised, and built for growth.",
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
  areaServed: [
    { "@type": "City", name: "Cape Town" },
    { "@type": "City", name: "Johannesburg" },
    { "@type": "City", name: "Pretoria" },
    { "@type": "City", name: "Durban" },
    { "@type": "City", name: "Port Elizabeth" },
    { "@type": "Country", name: "South Africa" },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
  },
  sameAs: [
    "https://www.kumocode.co.za",
    "https://kumocode.co.za",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "WordPress Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shopify Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Software Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce Solutions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & Digital Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Maintenance" } },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    ratingCount: "18",
  },
  knowsAbout: [
    "WordPress",
    "Shopify",
    "WooCommerce",
    "Next.js",
    "SEO",
    "Web Performance Optimization",
    "E-commerce Development",
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
