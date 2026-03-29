import type { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Section, Container } from "@/components/craft";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BreadcrumbJsonLd } from "next-seo";
import { Cookie, BarChart2, Settings2, Target, HelpCircle } from "lucide-react";

export const metadata: Metadata = getMetadata(undefined, {
  title: "Cookie Policy | Kumocode – South African Web Agency",
  description:
    "Learn how Kumocode uses cookies on its website, what types of cookies we use, and how you can manage your cookie preferences.",
  path: "/cookie-policy",
});

const legalSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cookie Policy",
  url: `${siteConfig.site_domain}/cookie-policy`,
  description: "Kumocode's Cookie Policy explaining cookie types and usage.",
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

const cookieTypes = [
  {
    icon: Settings2,
    type: "Strictly Necessary",
    purpose: "Essential for the website to function correctly.",
    examples: "Session management, security tokens, load balancing.",
    canOptOut: false,
  },
  {
    icon: BarChart2,
    type: "Analytics & Performance",
    purpose:
      "Help us understand how visitors interact with our website so we can improve it.",
    examples:
      "Google Analytics (page views, session duration, traffic sources), Vercel Analytics.",
    canOptOut: true,
  },
  {
    icon: Target,
    type: "Marketing & Retargeting",
    purpose: "Used to show relevant advertisements and track campaign performance.",
    examples: "Google Ads conversion tracking.",
    canOptOut: true,
  },
];

export default function CookiePolicyPage() {
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
            name: "Cookie Policy",
            item: `${siteConfig.site_domain}/cookie-policy`,
          },
        ]}
      />

      {/* Hero */}
      <Section>
        <Container className="max-w-[900px] mx-auto">
          <div className="mb-8">
            <Breadcrumbs
              items={[{ label: "Cookie Policy", active: true }]}
            />
          </div>
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFC224] border-[3px] border-black rounded-[20px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6">
              <Cookie size={40} strokeWidth={2} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#0B0B0B] mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We use cookies to improve your experience on our website. This
              policy explains what cookies we use, why we use them, and how you
              can control them.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: 1 January 2026
            </p>
          </div>
        </Container>
      </Section>

      {/* What are cookies */}
      <Section className="bg-gray-50">
        <Container className="max-w-[900px] mx-auto space-y-10">

          <div className="border-[3px] border-black rounded-[24px] p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFC224] border-2 border-black rounded-xl flex items-center justify-center flex-shrink-0">
                <HelpCircle size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0B0B0B] mb-3">
                  What Are Cookies?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Cookies are small text files placed on your device when you
                  visit a website. They allow the website to recognise your
                  device and store certain information about your preferences or
                  past actions. Most web browsers automatically accept cookies,
                  but you can modify your browser settings to decline cookies if
                  you prefer.
                </p>
              </div>
            </div>
          </div>

          {/* Cookie table */}
          <div>
            <h2 className="text-2xl font-black text-[#0B0B0B] mb-6">
              Cookies We Use
            </h2>
            <div className="space-y-4">
              {cookieTypes.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div
                    key={i}
                    className="border-[3px] border-black rounded-[24px] p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#FFC224] border-2 border-black rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={22} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                          <h3 className="text-xl font-black text-[#0B0B0B]">
                            {c.type}
                          </h3>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full border-2 border-black ${
                              c.canOptOut
                                ? "bg-white text-gray-700"
                                : "bg-[#0B0B0B] text-white"
                            }`}
                          >
                            {c.canOptOut ? "Optional" : "Always Active"}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-2">
                          <span className="font-bold text-[#0B0B0B]">Purpose: </span>
                          {c.purpose}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          <span className="font-bold text-[#0B0B0B]">Examples: </span>
                          {c.examples}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Managing cookies */}
          <div className="border-[3px] border-black rounded-[24px] p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFC224] border-2 border-black rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0B0B0B] mb-3">
                  Managing Your Cookie Preferences
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  You can control and delete cookies through your browser
                  settings. Most browsers allow you to refuse cookies, delete
                  existing cookies, or be notified when a new cookie is set.
                  Please note that disabling certain cookies may affect the
                  functionality of our website. For more information, refer to
                  your browser&apos;s help documentation.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="border-[3px] border-black rounded-[24px] p-8 bg-[#0B0B0B] text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black mb-3">Questions?</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about how we use cookies, contact us at{" "}
              <a
                href="mailto:info@kumocode.co.za"
                className="text-[#FFC224] underline underline-offset-4"
              >
                info@kumocode.co.za
              </a>
              .
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
