import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { getAllPortfolioItems } from "@/lib/wordpress"
import type { Portfolio } from "@/lib/wordpress.d"
import Link from "next/link"

export async function PortfolioSection() {
    // Fetch portfolio items from WordPress
    const portfolioItems = await getAllPortfolioItems()

    // If no portfolio items, show a placeholder message
    if (!portfolioItems || portfolioItems.length === 0) {
        return (
            <section id="portfolio" className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Take a look at my <br />
                            <span className="bg-[#FFC224] text-black px-3 py-1 inline-block">design portfolio</span>
                        </h2>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No portfolio items found.</p>
                    </div>
                </div>
            </section>
        )
    }

    // Map WordPress portfolio items to display format
    const projects = portfolioItems.map((item: Portfolio) => ({
        title: item.title.rendered,
        description: item.excerpt.rendered.replace(/<[^>]*>/g, ''), // Strip HTML tags
        tag: item.acf?.project_tag || "Design",
        logo: item.acf?.project_logo?.url || null,
        bgColor: item.acf?.background_color || "bg-[#6366F1]",
        illustration: item.acf?.project_illustration?.url || null,
        caseStudyLink: item.acf?.project_url || `/portfolio/${item.slug}`,
        slug: item.slug,
    }))

    return (
        <section id="portfolio" className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Take a look at my <br />
                        <span className="bg-[#FFC224] text-black px-3 py-1 inline-block">design portfolio</span>
                    </h2>
                </div>

                <div className="space-y-8 mb-12">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group grid md:grid-cols-2 bg-white border-[3px] border-black rounded-[32px] overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            <div className="p-6 md:p-12 flex flex-col justify-center bg-white">
                                {project.logo && (
                                    <div className="flex items-center gap-3 mb-6">
                                        <Image
                                            src={project.logo}
                                            alt={`${project.title} logo`}
                                            width={120}
                                            height={32}
                                            className="h-6 md:h-8 w-auto"
                                        />
                                    </div>
                                )}

                                <span className="inline-block bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
                                    {project.tag}
                                </span>

                                <h3 className="text-xl md:text-[28px] font-bold mb-4 leading-tight md:leading-[40px] text-[#0B0B0B]">
                                    {project.title}
                                </h3>

                                <p className="text-base md:text-[18px] text-[#393939] mb-8 leading-relaxed md:leading-[30px] font-medium">
                                    {project.description}
                                </p>

                                <Link
                                    href={project.caseStudyLink}
                                    className="flex items-center gap-2 font-semibold text-[#0B0B0B] hover:gap-3 transition-all text-sm md:text-base"
                                >
                                    View case study
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className={`${project.bgColor} relative overflow-hidden min-h-[250px] md:min-h-[500px]`}>
                                {project.illustration ? (
                                    <Image
                                        src={project.illustration}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
                                        No image available
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/portfolio"
                        className="bg-black text-white px-6 md:px-8 py-4 md:py-5 rounded-[12px] font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-sm md:text-base"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        Browse all portfolio
                    </Link>
                </div>
            </div>
        </section>
    )
}
