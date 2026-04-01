import {
    getPortfolioBySlug,
    getAllPortfolioSlugs,
    getSiteOptions,
} from "@/lib/wordpress";

import { Section, Container, Article, Prose } from "@/components/craft";
import { cn, stripHtml } from "@/lib/utils";
import { siteConfig } from "@/site.config";

import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { BreadcrumbJsonLd } from "next-seo";
import { RankMathSchema } from "@/components/seo/rank-math-schema";

import { getMetadata, getRankMathMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SocialShare } from "@/components/blog/social-share";
import { SocialFollow } from "@/components/blog/social-follow";

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
        return {
            title: "Project Not Found",
        };
    }

    const fallback = getMetadata(item, { type: "article", path: `/portfolio/${item.slug}` });
    return await getRankMathMetadata(`/portfolio/${item.slug}`, fallback);
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
    const postUrl = `${siteConfig.site_domain}/portfolio/${item.slug}`;
    const siteOptions = await getSiteOptions();

    return (
        <>
            <RankMathSchema wpUrlPath={`/portfolio/${item.slug}`} />
            <Section>
                <Container className="max-w-[1600px] mx-auto">
                    <div className="mb-12">
                        <Breadcrumbs
                            items={[
                                { label: "Portfolio", href: "/portfolio" },
                            ]}
                        />
                    </div>

                    <div className="space-y-12">
                        {/* Project Header */}
                        <div className="border-b-[3px] border-black pb-12">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="flex-1">
                                    <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#0B0B0B] mb-6">
                                        {stripHtml(item.title.rendered)}
                                    </h1>
                                    <p className="text-xl text-[#393939] font-medium max-w-2xl leading-relaxed">
                                        {item.acf?.project_description || stripHtml(item.excerpt.rendered)}
                                    </p>
                                </div>
                                {logo && (
                                    <div className="flex-shrink-0 bg-white p-6 border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <Image
                                            src={logo}
                                            alt={`${item.title.rendered} logo`}
                                            width={180}
                                            height={50}
                                            className="h-12 w-auto object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Banner */}
                        {illustration && (
                            <div className={cn(
                                "relative h-[300px] md:h-[600px] w-full overflow-hidden border-[3px] border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
                                bgColor
                            )}>
                                <Image
                                    className="w-full h-full object-cover"
                                    src={illustration}
                                    alt={item.acf?.project_illustration?.alt || `${stripHtml(item.title.rendered)} web development project in South Africa`}
                                    fill
                                    priority
                                />
                            </div>
                        )}

                        <div className="grid md:grid-cols-3 gap-12 pt-8">
                            {/* Project Content */}
                            <div className="md:col-span-2 space-y-8">
                                <Prose className="max-w-none">
                                    <Article dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
                                </Prose>

                                {caseStudyLink && (
                                    <div className="pt-8 text-center md:text-left">
                                        <a
                                            href={caseStudyLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-[6px_6px_0px_0px_rgba(253,185,39,1)] hover:-translate-y-1 transition-all"
                                        >
                                            Live Project Demo
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Project Metadata Sidebar */}
                            <aside className="md:col-span-1">
                                <div className="space-y-8 sticky top-24">
                                    <div className="border-[3px] border-black rounded-[32px] p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                        <h3 className="text-2xl font-black mb-8 border-b-2 border-black pb-4 uppercase tracking-tight">Project Details</h3>
                                        <div className="space-y-8">
                                            {clientName && (
                                                <div>
                                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Client</p>
                                                    <p className="text-xl font-bold text-[#0B0B0B]">{clientName}</p>
                                                </div>
                                            )}

                                            {projectDate && (
                                                <div>
                                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Completion</p>
                                                    <p className="text-xl font-bold text-[#0B0B0B]">
                                                        {new Date(projectDate).toLocaleDateString("en-US", {
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                            )}

                                            {technologies && (
                                                <div>
                                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Stack</p>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {technologies.split(",").map((tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="bg-gray-100 text-black border-2 border-black px-3 py-1 rounded-lg text-xs font-bold"
                                                            >
                                                                {tech.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {projectUrl && (
                                                <div className="pt-4">
                                                    <a
                                                        href={projectUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group inline-flex items-center gap-2 text-[#0B0B0B] font-black hover:text-[#6366F1] transition-colors"
                                                    >
                                                        Visit Website
                                                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="border-[3px] border-black rounded-[32px] p-8 bg-[#6366F1]/10 border-dashed">
                                        <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Share Project</h3>
                                        <div className="space-y-6">
                                            <SocialShare url={postUrl} title={stripHtml(item.title.rendered)} />
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>

                        {/* Project Gallery */}
                        {gallery && gallery.length > 0 && (
                            <div className="py-20 border-t-[3px] border-black">
                                <h2 className="text-4xl font-black mb-12 uppercase">Project <span className="text-[#6366F1]">Gallery</span></h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {gallery.map((image) => (
                                        <div
                                            key={image.ID}
                                            className="relative h-[300px] md:h-[500px] overflow-hidden rounded-[32px] border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group"
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.alt || item.title.rendered}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </Section>
        </>
    );
}
