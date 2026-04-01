import type { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Section, Container } from "@/components/craft";
import { ContactForm } from "@/components/contactform/contactform";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import Image from "next/image";
import {
    Hammer,
    ShoppingCart,
    Zap,
    Shield,
    Palette,
    Rocket,
    CheckCircle2,
    FileText,
} from "lucide-react";
import { getPostsByCategorySlug, getPostsPaginated } from "@/lib/wordpress";
import { stripHtml } from "@/lib/utils";

export const metadata: Metadata = getMetadata(undefined, {
    title: "WordPress Development South Africa | Custom WordPress Websites | Kumocode",
    description:
        "Professional WordPress development in South Africa. Custom themes, WooCommerce stores, speed optimisation, and ongoing maintenance. Trusted by South African businesses. Get a quote today.",
    path: "/wordpress-development",
});

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WordPress Development South Africa",
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
        "Custom WordPress website development for South African businesses. We build fast, secure, and SEO-optimised WordPress websites, WooCommerce stores, and custom themes.",
    category: "WordPress Development",
    url: `${siteConfig.site_domain}/wordpress-development`,
    offers: {
        "@type": "Offer",
        priceCurrency: "ZAR",
        priceSpecification: {
            "@type": "PriceSpecification",
            description: "WordPress development projects starting from R5,000 for small sites.",
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
            name: "How much does a WordPress website cost in South Africa?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "WordPress website costs in South Africa vary depending on the complexity. A simple brochure site typically starts from R5,000–R15,000. A WooCommerce store or custom-built site ranges from R15,000–R60,000+. Ongoing maintenance plans start from R500/month. Contact us for a custom quote.",
            },
        },
        {
            "@type": "Question",
            name: "How long does it take to build a WordPress website in South Africa?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "A standard WordPress website typically takes 2–4 weeks from content sign-off to launch. More complex builds with custom functionality, WooCommerce integration, or third-party APIs can take 4–8 weeks. We always provide a clear timeline before starting.",
            },
        },
        {
            "@type": "Question",
            name: "Do you build WooCommerce stores for South African businesses?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, we build WooCommerce stores with full South African payment gateway integration, including PayFast, Peach Payments, and Yoco. We handle product setup, shipping configuration, and ensure your store is optimised for South African customers.",
            },
        },
        {
            "@type": "Question",
            name: "Can you speed up my existing WordPress website?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We offer WordPress performance optimisation services including image compression, caching configuration, database cleanup, CDN setup, and code minification. Most clients see significant speed improvements within 48 hours.",
            },
        },
        {
            "@type": "Question",
            name: "Will my WordPress site be secure and POPIA compliant?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We implement security best practices on every build, including SSL certificates, secure file permissions, regular update schedules, and backup systems. We can also advise on POPIA compliance requirements for your site's data collection.",
            },
        },
    ],
};

const services = [
    {
        title: "Custom WordPress Development",
        description:
            "Bespoke WordPress websites built from the ground up — no bloated templates. Clean code, fast load times, and built to scale with your business.",
        icon: Hammer,
    },
    {
        title: "WooCommerce Store Setup",
        description:
            "Full WooCommerce store setup with South African payment gateways (PayFast, Peach Payments, Yoco), shipping configuration, and product management.",
        icon: ShoppingCart,
    },
    {
        title: "WordPress Speed Optimisation",
        description:
            "Slow WordPress site? We diagnose and fix the root causes — from unoptimised images to plugin bloat and poor hosting choices.",
        icon: Zap,
    },
    {
        title: "WordPress Maintenance & Support",
        description:
            "Monthly maintenance plans that cover core, theme, and plugin updates; security monitoring; and backups — so your site stays secure and fast.",
        icon: Shield,
    },
    {
        title: "WordPress Theme Development",
        description:
            "Custom WordPress themes built to match your brand exactly. Pixel-perfect design, mobile-responsive, and optimised for search engines.",
        icon: Palette,
    },
    {
        title: "WordPress Migration",
        description:
            "Moving from another platform or a different host? We handle full WordPress migrations with zero downtime and no data loss.",
        icon: Rocket,
    },
];

export default async function WordPressDevelopmentPage() {
    let recentPosts: any[] = [];
    try {
        const categoryPosts = await getPostsByCategorySlug("wordpress");
        recentPosts = categoryPosts.slice(0, 3);
    } catch {
        const fallback = await getPostsPaginated(1, 3);
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
                        name: "WordPress Development",
                        item: `${siteConfig.site_domain}/wordpress-development`,
                    },
                ]}
            />

            {/* Hero Section */}
            <Section>
                <Container className="max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[{ label: "WordPress Development", active: true }]}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center py-12">
                        <div className="space-y-6">
                            <div className="inline-block bg-[#FFC224] border-2 border-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                South Africa&apos;s WordPress Specialists
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#0B0B0B]">
                                WordPress Development in South Africa
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We build fast, secure, and SEO-optimised WordPress websites for South African
                                businesses. From custom brochure sites to full WooCommerce stores — with South
                                African payment gateways built in.
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
                                    <Image
                                        src="/wordpress.svg"
                                        alt="WordPress logo"
                                        width={96}
                                        height={96}
                                    />
                                </div>
                                <p className="font-black text-2xl">WordPress Experts</p>
                                <p className="text-gray-700 mt-2">Built for South Africa</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Trust Bar */}
            <section className="border-y-[3px] border-black bg-[#0B0B0B]">
                <div className="max-w-[1200px] mx-auto px-6 py-6">
                    <div className="flex flex-wrap justify-center gap-8 text-white text-sm font-bold">
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> PayFast &amp; Peach Payments Integration</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> POPIA-Aware Development</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> South African Hosting Support</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> ZAR-Based Pricing</span>
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC224]" /> No Hidden Costs</span>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <Section>
                <Container className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-[#0B0B0B] mb-4">
                            Our WordPress Services
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Everything you need to launch, grow, and maintain a high-performance WordPress
                            website in South Africa.
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

            {/* Why Choose Kumocode for WordPress */}
            <Section className="bg-[#FFC224]/10">
                <Container className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-[#0B0B0B] mb-6">
                                Why South African Businesses Choose Kumocode for WordPress
                            </h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "South African Context, Not Generic Advice",
                                        body: "We understand the South African web landscape — from local hosting providers like Vox and Afrihost to payment gateways like PayFast and Peach Payments. We build with SA in mind.",
                                    },
                                    {
                                        title: "Performance-First Development",
                                        body: "South Africa's internet infrastructure means performance matters more here. We optimise for faster mobile connections and ensure your site loads quickly even on mobile data.",
                                    },
                                    {
                                        title: "SEO Built Into Every Build",
                                        body: "Every WordPress site we build launches with proper SEO foundations: clean URL structure, schema markup, fast load times, and Google Search Console setup.",
                                    },
                                    {
                                        title: "Transparent ZAR Pricing",
                                        body: "No invoices in USD. We quote in Rands, clearly, before any work starts. No scope creep, no surprise invoices.",
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
                                WordPress Pricing Guide (ZAR)
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { type: "Brochure / Business Site", range: "R5,000 – R15,000" },
                                    { type: "WooCommerce Store", range: "R15,000 – R45,000" },
                                    { type: "Custom Functionality", range: "R20,000 – R80,000+" },
                                    { type: "Speed Optimisation", range: "R2,500 – R8,000" },
                                    { type: "Monthly Maintenance", range: "R500 – R2,500/mo" },
                                ].map((price, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                                    >
                                        <span className="font-medium text-gray-700">{price.type}</span>
                                        <span className="font-black text-[#0B0B0B] bg-[#FFC224] px-3 py-1 rounded-lg border border-black">
                                            {price.range}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                * Prices are estimates. Final cost depends on scope. Contact us for a custom
                                quote.
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
                        WordPress Resources
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
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
