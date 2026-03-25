import type { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Section, Container } from "@/components/craft";
import { ContactForm } from "@/components/contactform/contactform";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
    Store,
    CreditCard,
    Zap,
    Palette,
    TrendingUp,
    Rocket,
    ShoppingBag,
    CheckCircle2,
    FileText,
} from "lucide-react";
import { getPostsByCategorySlug, getPostsPaginated } from "@/lib/wordpress";
import { stripHtml } from "@/lib/utils";

export const metadata: Metadata = getMetadata(undefined, {
    title: "Shopify Development South Africa | Shopify Store Setup & Optimisation | Kumocode",
    description:
        "Expert Shopify development in South Africa. Store setup, custom themes, speed optimisation, and PayFast integration. We help South African businesses sell more online. Get a quote.",
    path: "/shopify-development",
});

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Shopify Development South Africa",
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
        { "@type": "City", name: "Cape Town" },
        { "@type": "City", name: "Johannesburg" },
        { "@type": "City", name: "Pretoria" },
        { "@type": "City", name: "Durban" },
        { "@type": "Country", name: "South Africa" },
    ],
    description:
        "Shopify store setup, custom theme development, speed optimisation, and conversion rate improvement for South African e-commerce businesses. PayFast and Peach Payments integration included.",
    serviceType: "Shopify Development",
    url: `${siteConfig.site_domain}/shopify-development`,
    offers: {
        "@type": "Offer",
        priceCurrency: "ZAR",
        priceSpecification: {
            "@type": "PriceSpecification",
            description: "Shopify store setup and development starting from R8,000.",
        },
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How much does Shopify development cost in South Africa?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Shopify store setup in South Africa typically starts from R8,000 for a basic store using a pre-built theme. A custom Shopify theme with full branding ranges from R20,000–R60,000. Speed optimisation and conversion fixes start from R3,500. All prices are in ZAR with no hidden fees.",
            },
        },
        {
            "@type": "Question",
            name: "Can you integrate PayFast with my Shopify store?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We integrate all major South African payment gateways with Shopify, including PayFast, Peach Payments, and Yoco. This allows your South African customers to pay using local payment methods, which significantly improves conversion rates compared to international-only gateways.",
            },
        },
        {
            "@type": "Question",
            name: "What is a good Shopify conversion rate for a South African store?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "A healthy Shopify conversion rate is typically between 1–3%. Many South African stores fall below 1% due to slow load times, poor mobile experience, or missing local trust signals. We help identify and fix the specific issues costing your store sales.",
            },
        },
        {
            "@type": "Question",
            name: "How do I speed up my Shopify store?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Shopify speed depends on your theme, installed apps, and image sizes. We audit your store, remove unused app scripts, optimise images, replace slow theme sections, and consolidate tracking scripts via Google Tag Manager. Most stores see a 20–50% speed improvement.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need a custom Shopify theme or can I use a free one?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "It depends on your goals. Free Shopify themes like Dawn are well-built and a good starting point. If your brand needs a specific look, you require custom functionality, or your current theme is slow, a custom theme pays for itself through better conversion rates and brand trust.",
            },
        },
    ],
};

const services = [
    {
        title: "Shopify Store Setup",
        description:
            "New to Shopify? We set up your store from scratch — theme selection, product configuration, collections, shipping, and SA payment gateway integration.",
        icon: Store,
    },
    {
        title: "PayFast & SA Payment Gateways",
        description:
            "Integrate PayFast, Peach Payments, or Yoco so South African customers can pay using local methods. Dramatically increases trust and conversion.",
        icon: CreditCard,
    },
    {
        title: "Shopify Speed Optimisation",
        description:
            "Slow Shopify store? We identify the apps, images, and Liquid code dragging your speed down and fix them — improving Core Web Vitals and conversion rates.",
        icon: Zap,
    },
    {
        title: "Custom Shopify Theme Development",
        description:
            "A fully custom Shopify theme that reflects your brand perfectly. Built for performance, mobile-first, and conversion-optimised from the ground up.",
        icon: Palette,
    },
    {
        title: "Conversion Rate Optimisation",
        description:
            "Getting traffic but no sales? We analyse your store's drop-off points and implement proven fixes — from product page copy to checkout flow.",
        icon: TrendingUp,
    },
    {
        title: "Shopify Migrations",
        description:
            "Moving from WooCommerce, Wix, or another platform? We migrate your products, customers, and order history to Shopify with zero data loss.",
        icon: Rocket,
    },
];

export default async function ShopifyDevelopmentPage() {
    let recentPosts: any[] = [];
    try {
        const categoryPosts = await getPostsByCategorySlug("shopify");
        recentPosts = categoryPosts.slice(0, 2);
    } catch {
        const fallback = await getPostsPaginated(1, 2);
        recentPosts = fallback.data;
    }


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
                        name: "Shopify Development",
                        item: `${siteConfig.site_domain}/shopify-development`,
                    },
                ]}
            />

            {/* Hero Section */}
            <Section>
                <Container className="max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[{ label: "Shopify Development", active: true }]}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center py-12">
                        <div className="space-y-6">
                            <div className="inline-block bg-[#FFC224] border-2 border-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                South Africa&apos;s Shopify Experts
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#0B0B0B]">
                                Shopify Development in South Africa
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We build and optimise Shopify stores for South African businesses. From initial
                                setup to custom theme development, PayFast integration, and conversion rate
                                improvements — we help you sell more online.
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
                                    View Our Shopify Work
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <div className="bg-[#FFC224] border-[3px] border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-12 text-center">
                                <div className="flex justify-center mb-4">
                                    <ShoppingBag size={96} strokeWidth={1.5} />
                                </div>
                                <p className="font-black text-2xl">Shopify Experts</p>
                                <p className="text-gray-700 mt-2">Trusted by SA businesses</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Trust Bar */}
            <section className="border-y-[3px] border-black bg-[#0B0B0B]">
                <div className="max-w-[1200px] mx-auto px-6 py-6">
                    <div className="flex flex-wrap justify-center gap-8 text-white text-sm font-bold">
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> PayFast Integration</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> Peach Payments Ready</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> Mobile-First Design</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> Core Web Vitals Optimised</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> ZAR Pricing — No USD Surprises</span>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <Section>
                <Container className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-[#0B0B0B] mb-4">
                            Our Shopify Services
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            From first store setup to performance fixes and custom development — everything
                            your South African Shopify store needs to grow.
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

            {/* Why Kumocode + Pricing */}
            <Section className="bg-[#FFC224]/10">
                <Container className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-[#0B0B0B] mb-6">
                                Why South African Businesses Trust Kumocode for Shopify
                            </h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "We Know the South African Market",
                                        body: "We integrate local payment methods (PayFast, Peach Payments, Yoco), understand SA customer behaviour, and build stores designed to convert South African shoppers.",
                                    },
                                    {
                                        title: "Speed Is Our Priority",
                                        body: "South African internet connections vary. We optimise every store for performance — ensuring your pages load fast on mobile data and uncapped LTE alike.",
                                    },
                                    {
                                        title: "Conversion-Focused, Not Just Pretty",
                                        body: "A beautiful store that doesn't convert is useless. We focus on the product pages, checkout flow, trust signals, and CTAs that actually drive sales.",
                                    },
                                    {
                                        title: "Clear, Rand-Based Pricing",
                                        body: "No invoices in US dollars. We quote in ZAR, upfront, with a clear scope. What you see is what you pay.",
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-8 h-8 bg-[#FFC224] border-2 border-black rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 mt-1">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-lg mb-1">{item.title}</h3>
                                            <p className="text-gray-600">{item.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="border-[3px] border-black rounded-[32px] p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">
                                Shopify Pricing Guide (ZAR)
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { type: "Basic Store Setup (theme-based)", range: "R8,000 – R20,000" },
                                    { type: "Custom Shopify Theme", range: "R20,000 – R60,000" },
                                    { type: "Speed Optimisation", range: "R3,500 – R10,000" },
                                    { type: "Shopify Migration", range: "R5,000 – R25,000" },
                                    { type: "Ongoing Retainer", range: "R1,500 – R5,000/mo" },
                                ].map((price, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 gap-4"
                                    >
                                        <span className="font-medium text-gray-700">{price.type}</span>
                                        <span className="font-black text-[#0B0B0B] bg-[#FFC224] px-3 py-1 rounded-lg border border-black whitespace-nowrap">
                                            {price.range}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                * Prices are estimates. Final cost depends on scope and complexity. Contact us
                                for a custom quote.
                            </p>
                            <Link
                                href="#contact"
                                className="mt-6 block text-center bg-black text-white font-black px-6 py-4 rounded-xl hover:bg-[#FFC224] hover:text-black transition-colors"
                            >
                                Get a Custom Quote →
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* FAQ Section */}
            <Section>
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

            {/* Related Articles */}
            <Section className="bg-gray-50">
                <Container className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl font-black text-[#0B0B0B] mb-8 text-center">
                        Shopify Resources
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {recentPosts.map((post, i) => (
                            <Link
                                key={i}
                                href={`/blog/${post.slug}`}
                                className="flex items-center gap-3 border-[3px] border-black rounded-[20px] p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold text-[#0B0B0B]"
                            >
                                <FileText size={20} className="flex-shrink-0 text-[#FFC224]" strokeWidth={2.5} />
                                <span className="line-clamp-2">{stripHtml(post.title.rendered)} →</span>
                            </Link>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Contact CTA */}
            <ContactForm />
        </>
    );
}
