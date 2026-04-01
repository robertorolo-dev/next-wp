import type { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Section, Container } from "@/components/craft";
import { ContactForm } from "@/components/contactform/contactform";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
    Code2,
    ShoppingCart,
    Zap,
    Search,
    Laptop,
    Rocket,
    CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = getMetadata(undefined, {
    title: "Web Development Johannesburg | Website Design & SEO | Kumocode",
    description:
        "Top-rated web development agency in Johannesburg. We build custom websites, Shopify stores, and WordPress sites that drive traffic and generate leads in Gauteng.",
    path: "/web-development-johannesburg",
});

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Development Johannesburg",
    provider: {
        "@type": "ProfessionalService",
        name: "Kumocode",
        url: siteConfig.site_domain,
        logo: `${siteConfig.site_domain}/kumocode.png`,
        address: {
            "@type": "PostalAddress",
            addressCountry: "ZA",
        },
    },
    areaServed: [
        { "@type": "City", name: "Johannesburg" },
    ],
    description:
        "Professional web development and website design services serving Johannesburg and Gauteng. We build custom React, Next.js, WordPress, and Shopify websites.",
    category: "Web Development",
    url: `${siteConfig.site_domain}/web-development-johannesburg`,
    offers: {
        "@type": "Offer",
        priceCurrency: "ZAR",
        priceSpecification: {
            "@type": "PriceSpecification",
            description: "Web development projects starting from R5,000.",
        },
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        ratingCount: "18",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How much does website design cost in Johannesburg?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Website pricing in Johannesburg varies by project scope. A standard small business website typically ranges from R5,000–R15,000, while custom eCommerce stores are from R20,000–R80,000+. Get a free quote tailored to your exact needs.",
            },
        },
        {
            "@type": "Question",
            name: "Do you offer SEO services for Johannesburg businesses?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, every website we develop has technical SEO built into the foundation to help you rank effectively across Johannesburg, Gauteng, and all of South Africa.",
            },
        },
        {
            "@type": "Question",
            name: "Can you help migrate my existing site without losing rankings?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. We routinely handle complex WordPress and Shopify migrations, ensuring 301 redirects are in place so you maintain or improve your current search rankings.",
            },
        },
    ],
};

const services = [
    {
        title: "Custom Web Development",
        description:
            "Fast, modern websites built with Next.js, React, or custom code. Tailored to your Johannesburg business needs.",
        icon: Code2,
    },
    {
        title: "eCommerce Solutions",
        description:
            "Shopify and WooCommerce stores integrated with South African payment gateways like PayFast and Peach Payments.",
        icon: ShoppingCart,
    },
    {
        title: "Speed Optimisation",
        description:
            "We fix slow websites. Fast loading speeds mean better user experience and higher rankings on Google.",
        icon: Zap,
    },
    {
        title: "SEO & Digital Strategy",
        description:
            "Technical SEO built into the core. We ensure your website acts as a lead generation tool for your business.",
        icon: Search,
    },
    {
        title: "Website Redesign",
        description:
            "Outdated website? We redesign and rebuild modern, mobile-first websites that establish trust and convert visitors.",
        icon: Laptop,
    },
    {
        title: "Ongoing Maintenance",
        description:
            "We keep your website secure, updated, and running smoothly so you can focus on running your business.",
        icon: Rocket,
    },
];

export default function WebDevJohannesburgPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", item: siteConfig.site_domain },
                    {
                        name: "Web Development Johannesburg",
                        item: `${siteConfig.site_domain}/web-development-johannesburg`,
                    },
                ]}
            />

            {/* Hero Section */}
            <Section>
                <Container className="max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[{ label: "Web Development Johannesburg", active: true }]}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center py-12">
                        <div className="space-y-6">
                            <div className="inline-block bg-[#FFC224] border-2 border-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                Premium Digital Solutions in Gauteng
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#0B0B0B]">
                                Web Development Agency in Johannesburg
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We help Johannesburg businesses dominate online. From custom web development
                                to high-conversion eCommerce stores, we build fast, scalable, and
                                SEO-optimised digital experiences that drive growth.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="#contact"
                                    className="bg-[#FFC224] border-[3px] border-black text-black font-black px-8 py-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                                >
                                    Get a Free Quote
                                </Link>
                                <Link
                                    href="/portfolio"
                                    className="bg-white border-[3px] border-black text-black font-black px-8 py-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                                >
                                    View Our Work
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <div className="bg-[#FFC224] border-[3px] border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-12 text-center">
                                <div className="flex justify-center mb-4">
                                    <Code2 size={96} strokeWidth={1.5} />
                                </div>
                                <p className="font-black text-2xl">Johannesburg</p>
                                <p className="text-gray-700 mt-2">Web Design Experts</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Trust Bar */}
            <section className="border-y-[3px] border-black bg-[#0B0B0B]">
                <div className="max-w-[1200px] mx-auto px-6 py-6">
                    <div className="flex flex-wrap justify-center gap-8 text-white text-sm font-bold">
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> Custom Website Design</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> High-Speed Performance</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> Local SEO Optimised</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> eCommerce Ready</span>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <Section>
                <Container className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-[#0B0B0B] mb-4">
                            Web Development Services in Johannesburg
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Whether you need a brand-new website, an eCommerce overhaul, or to fix
                            underlying speed issues, we provide top-tier digital services.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={index}
                                    className="border-[3px] border-black rounded-[24px] p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                                >
                                    <div className="w-12 h-12 bg-[#FFC224] border-2 border-black rounded-xl flex items-center justify-center mb-4">
                                        <Icon size={24} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-xl font-black text-[#0B0B0B] mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </Section>

            {/* FAQ Section */}
            <Section className="bg-[#FFC224]/10">
                <Container className="max-w-[800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-[#0B0B0B] mb-10 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <details
                                key={i}
                                className="border-[3px] border-black rounded-[20px] bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group"
                            >
                                <summary className="p-6 font-black text-lg cursor-pointer list-none flex justify-between items-center gap-4">
                                    <span>{faq.name}</span>
                                    <span className="text-2xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t-2 border-black pt-4">
                                    {faq.acceptedAnswer.text}
                                </div>
                            </details>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Contact CTA */}
            <ContactForm />
        </>
    );
}
