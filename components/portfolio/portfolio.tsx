import { getAllPortfolioItems } from "@/lib/wordpress"
import Link from "next/link"
import { PortfolioCard } from "./portfolio-card"

export async function PortfolioSection() {
    // Fetch portfolio items from WordPress
    const allPortfolioItems = await getAllPortfolioItems()

    // Filter by show_on_homepage and sort by homepage_order
    let portfolioItems = allPortfolioItems
        .filter(item => item.acf?.show_on_homepage)
        .sort((a, b) => {
            const orderA = a.acf?.homepage_order !== undefined ? Number(a.acf.homepage_order) : 999;
            const orderB = b.acf?.homepage_order !== undefined ? Number(b.acf.homepage_order) : 999;
            return orderA - orderB;
        });

    if (portfolioItems.length === 0) {
        portfolioItems = allPortfolioItems.slice(0, 3);
    } else {
        portfolioItems = portfolioItems.slice(0, 3);
    }

    // If no portfolio items, show a placeholder message
    if (!portfolioItems || portfolioItems.length === 0) {
        return (
            <section id="portfolio" className="container mx-auto px-4 py-16 md:py-24 scroll-mt-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Take a look at our <br />
                            <span className="bg-[#FFC224] text-black px-3 py-1 inline-block">portfolio</span>
                        </h2>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No portfolio items found.</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="portfolio" className="py-12 md:py-16 scroll-mt-24">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Take a look at our <br />
                            <span className="bg-[#FFC224] text-black px-3 py-1 inline-block">portfolio</span>
                        </h2>
                    </div>

                    <div className="space-y-8 mb-12">
                        {portfolioItems.map((item, index) => (
                            <PortfolioCard key={index} item={item} layout="horizontal" />
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
            </div>
        </section>
    )
}
