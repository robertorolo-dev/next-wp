import type { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Section, Container } from "@/components/craft";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BreadcrumbJsonLd } from "next-seo";
import { Shield, Lock, Eye, Bell, Trash2, Mail } from "lucide-react";

export const metadata: Metadata = getMetadata(undefined, {
  title: "Privacy Policy | Kumocode – South African Web Agency",
  description:
    "Read the Kumocode Privacy Policy. We are committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA).",
  path: "/privacy-policy",
});

const legalSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  url: `${siteConfig.site_domain}/privacy-policy`,
  description:
    "Kumocode's Privacy Policy outlining how we collect, use, and protect your personal information under POPIA.",
  publisher: {
    "@type": "Organization",
    name: siteConfig.site_name,
    url: siteConfig.site_domain,
  },
  about: {
    "@type": "Organization",
    name: siteConfig.site_name,
    url: siteConfig.site_domain,
  },
  datePublished: "2026-01-01T00:00:00+02:00",
  dateModified: "2026-01-01T00:00:00+02:00",
};

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: `We collect information you voluntarily submit through our contact forms, including your name, email address, phone number, and any project details you share. We also automatically collect standard server log data such as your IP address, browser type, and pages visited on our website when you access our services.`,
  },
  {
    icon: Shield,
    title: "How We Use Your Information",
    content: `We use your personal information solely to: respond to your enquiries and provide our web development services; send you project-related updates and communications; improve our website and services; and comply with legal obligations under applicable South African law, including POPIA.`,
  },
  {
    icon: Lock,
    title: "Data Security",
    content: `We implement appropriate technical and organisational measures to safeguard your personal information against unauthorised access, loss, or disclosure. Our website is served over HTTPS, and access to any stored data is restricted to authorised personnel only.`,
  },
  {
    icon: Bell,
    title: "Cookies & Tracking",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience and gather analytics data through services such as Google Analytics and Vercel Analytics. You may control cookie preferences through your browser settings. See our Cookie Policy for full details.`,
  },
  {
    icon: Trash2,
    title: "Data Retention & Deletion",
    content: `We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. You may request the deletion of your personal data at any time by contacting us directly.`,
  },
  {
    icon: Mail,
    title: "Your Rights Under POPIA",
    content: `As a data subject under the Protection of Personal Information Act (POPIA), you have the right to access, correct, or delete your personal information held by us. You also have the right to object to our processing of your data and to lodge a complaint with the Information Regulator of South Africa.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: siteConfig.site_domain },
          {
            name: "Privacy Policy",
            item: `${siteConfig.site_domain}/privacy-policy`,
          },
        ]}
      />

      {/* Hero */}
      <Section>
        <Container className="max-w-[900px] mx-auto">
          <div className="mb-8">
            <Breadcrumbs
              items={[{ label: "Privacy Policy", active: true }]}
            />
          </div>
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFC224] border-[3px] border-black rounded-[20px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6">
              <Shield size={40} strokeWidth={2} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#0B0B0B] mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your privacy matters to us. This policy explains how Kumocode
              collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: 1 January 2026
            </p>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section className="bg-gray-50">
        <Container className="max-w-[900px] mx-auto">
          <div className="space-y-6">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="border-[3px] border-black rounded-[24px] p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFC224] border-2 border-black rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-[#0B0B0B] mb-3">
                        {s.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">{s.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact block */}
          <div className="mt-10 border-[3px] border-black rounded-[24px] p-8 bg-[#0B0B0B] text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black mb-3">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy or wish to
              exercise your rights under POPIA, please contact us at{" "}
              <a
                href="mailto:info@kumocode.co.za"
                className="text-[#FFC224] underline underline-offset-4"
              >
                info@kumocode.co.za
              </a>
              . We will respond to all requests within 30 days.
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-3">Ready to work with us?</p>
              <a
                href="/#contact"
                className="inline-block bg-[#FFC224] text-black font-black px-6 py-3 rounded-xl border-2 border-[#FFC224] hover:opacity-90 transition-opacity text-sm"
              >
                Get a Free Quote →
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
