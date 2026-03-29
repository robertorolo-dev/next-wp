import type { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Section, Container } from "@/components/craft";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BreadcrumbJsonLd } from "next-seo";
import { FileText, Briefcase, CreditCard, AlertTriangle, Scale, RefreshCw } from "lucide-react";

export const metadata: Metadata = getMetadata(undefined, {
  title: "Terms & Conditions | Kumocode – South African Web Agency",
  description:
    "Review the Terms and Conditions governing the use of Kumocode's website and web development services. Proudly operating under South African law.",
  path: "/terms-and-conditions",
});

const legalSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms and Conditions",
  url: `${siteConfig.site_domain}/terms-and-conditions`,
  description:
    "Kumocode's Terms and Conditions for website use and web development services.",
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
    icon: Briefcase,
    title: "Services",
    content: `Kumocode provides web development, eCommerce development, WordPress development, Shopify development, and digital strategy services. All services are delivered as outlined in individual project proposals or service agreements. We reserve the right to decline any project at our sole discretion.`,
  },
  {
    icon: FileText,
    title: "Use of Our Website",
    content: `By accessing www.kumocode.co.za, you agree to use the site only for lawful purposes. You must not use the site in any way that breaches applicable laws or regulations, or that is fraudulent, harmful, or disruptive. Any unauthorised use of content on this site is strictly prohibited.`,
  },
  {
    icon: CreditCard,
    title: "Payment & Invoicing",
    content: `Project fees are outlined in project-specific proposals. Unless otherwise agreed in writing, a 50% deposit is required before work commences, with the remaining balance due on project completion. All invoices are issued in South African Rand (ZAR) and are subject to applicable taxes. Late payments may attract interest in accordance with the Prescribed Rate of Interest Act.`,
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: `Kumocode's total liability for any claims arising from our services shall not exceed the total fees paid by the client for the specific project or service in question. We are not liable for any indirect, incidental, or consequential losses, including loss of revenue or data, arising from the use or inability to use our services.`,
  },
  {
    icon: Scale,
    title: "Intellectual Property",
    content: `All custom code, designs, and deliverables become the client's property upon receipt of final payment. Kumocode retains the right to showcase completed work in its portfolio unless explicitly agreed otherwise in writing. All third-party plugins, themes, and libraries remain subject to their respective licences.`,
  },
  {
    icon: RefreshCw,
    title: "Changes to These Terms",
    content: `We may update these Terms and Conditions from time to time. Continued use of our website or services after any changes constitutes your acceptance of the new terms. We encourage you to review this page periodically.`,
  },
];

export default function TermsAndConditionsPage() {
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
            name: "Terms & Conditions",
            item: `${siteConfig.site_domain}/terms-and-conditions`,
          },
        ]}
      />

      {/* Hero */}
      <Section>
        <Container className="max-w-[900px] mx-auto">
          <div className="mb-8">
            <Breadcrumbs
              items={[{ label: "Terms & Conditions", active: true }]}
            />
          </div>
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFC224] border-[3px] border-black rounded-[20px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6">
              <FileText size={40} strokeWidth={2} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#0B0B0B] mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These terms govern the use of Kumocode's website and the delivery
              of our web development and digital services.
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

          {/* Governing Law */}
          <div className="mt-10 border-[3px] border-black rounded-[24px] p-8 bg-[#0B0B0B] text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black mb-3">Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These terms are governed by the laws of the Republic of South
              Africa. Any disputes shall be subject to the exclusive jurisdiction
              of the South African courts. For any questions, contact us at{" "}
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
