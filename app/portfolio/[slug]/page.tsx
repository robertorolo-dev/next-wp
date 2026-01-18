import {
    getPortfolioBySlug,
    getAllPortfolioSlugs,
} from "@/lib/wordpress";

import { Section, Container, Article, Prose } from "@/components/craft";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
    return await getAllPortfolioSlugs();
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const item = await getPortfolioBySlug(slug);

    if (!item) {
        return {};
    }

    const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
    ogUrl.searchParams.append("title", item.title.rendered);
    // Strip HTML tags for description
    const description = item.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
    ogUrl.searchParams.append("description", description);

    return {
        title: item.title.rendered,
        description: description,
        openGraph: {
            title: item.title.rendered,
            description: description,
            type: "article",
            url: `${siteConfig.site_domain}/portfolio/${item.slug}`,
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: item.title.rendered,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: item.title.rendered,
            description: description,
            images: [ogUrl.toString()],
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const item = await getPortfolioBySlug(slug);

    if (!item) {
        notFound();
    }

    const date = new Date(item.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Get ACF fields
    const tag = item.acf?.project_tag || "Design";
    const logo = item.acf?.project_logo?.url;
    const bgColor = item.acf?.background_color || "bg-[#6366F1]";
    const illustration = item.acf?.project_illustration?.url;
    const caseStudyLink = item.acf?.case_study_link;
    const clientName = item.acf?.client_name;
    const projectUrl = item.acf?.project_url;
    const projectDate = item.acf?.project_date;
    const technologies = item.acf?.technologies;
    const gallery = item.acf?.project_gallery;

    return (
        <Section>
            <Container>
                <div className="mb-8">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                </div>

                <Prose>
                    <h1>
                        <span
                            dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                        ></span>
                    </h1>
                    <div className="flex justify-between items-center gap-4 text-sm mb-4">
                        <h5>Published {date}</h5>

                        <span
                            className={cn(
                                badgeVariants({ variant: "outline" }),
                                "no-underline!"
                            )}
                        >
                            {tag}
                        </span>
                    </div>

                    {logo && (
                        <div className="flex items-center mb-8">
                            <Image
                                src={logo}
                                alt={`${item.title.rendered} logo`}
                                width={150}
                                height={42}
                                className="h-10 w-auto"
                            />
                        </div>
                    )}

                    {illustration && (
                        <div className={cn(
                            "h-96 my-12 md:h-[500px] overflow-hidden flex items-center justify-center border rounded-lg",
                            bgColor
                        )}>
                            <Image
                                className="w-full h-full object-cover"
                                src={illustration}
                                alt={item.title.rendered}
                                width={1200}
                                height={600}
                            />
                        </div>
                    )}

                    {caseStudyLink && (
                        <div className="my-8">
                            <a
                                href={caseStudyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                            >
                                View Full Case Study
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </Prose>

                <div className="grid md:grid-cols-3 gap-8 my-12">
                    <div className="md:col-span-2">
                        <Article dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
                    </div>

                    {/* Project Metadata Sidebar */}
                    <div className="md:col-span-1">
                        <div className="border rounded-lg p-6 bg-accent/30 sticky top-24">
                            <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                            <div className="space-y-4 text-sm">
                                {clientName && (
                                    <div>
                                        <p className="text-muted-foreground font-medium mb-1">Client</p>
                                        <p className="text-foreground">{clientName}</p>
                                    </div>
                                )}

                                {projectDate && (
                                    <div>
                                        <p className="text-muted-foreground font-medium mb-1">Completion Date</p>
                                        <p className="text-foreground">
                                            {new Date(projectDate).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                )}

                                {technologies && (
                                    <div>
                                        <p className="text-muted-foreground font-medium mb-1">Technologies</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {technologies.split(",").map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-black text-white px-3 py-1 rounded-full text-xs"
                                                >
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {projectUrl && (
                                    <div>
                                        <p className="text-muted-foreground font-medium mb-1">Live Project</p>
                                        <a
                                            href={projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-foreground hover:underline"
                                        >
                                            Visit Website
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Gallery */}
                {gallery && gallery.length > 0 && (
                    <div className="my-12">
                        <Prose>
                            <h2>Project Gallery</h2>
                        </Prose>
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            {gallery.map((image) => (
                                <div
                                    key={image.ID}
                                    className="relative h-64 md:h-80 overflow-hidden rounded-lg border"
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.alt || item.title.rendered}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </Section>
    );
}
