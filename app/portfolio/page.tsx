import {
    getPortfolioItemsPaginated,
    getAllPortfolioCategories,
    getPortfolioCategoryById,
} from "@/lib/wordpress";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container, Prose } from "@/components/craft";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { FilterPortfolio } from "@/components/portfolio/filter";
import { PortfolioSearchInput } from "@/components/portfolio/search-input";

import type { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BreadcrumbJsonLd } from "next-seo";
import { siteConfig } from "@/site.config";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        category?: string;
        search?: string;
    }>;
}): Promise<Metadata> {
    const { page, category, search } = await searchParams;

    let title = "Web Development Portfolio | South African Agency Work";
    let description = "Browse Kumocode's web development portfolio. WordPress sites, Shopify stores, and custom digital solutions built for South African businesses across multiple industries.";
    let path = "/portfolio";

    if (category) {
        try {
            const cat = await getPortfolioCategoryById(parseInt(category));
            title = `${cat.name} Projects`;
            description = `Browse our ${cat.name} projects and case studies.`;
            path = `/portfolio?category=${category}`;
        } catch (e) { }
    } else if (search) {
        title = `Search results for "${search}"`;
        path = `/portfolio?search=${search}`;
    }

    // Handle pagination
    if (page && parseInt(page) > 1) {
        path += (path.includes("?") ? "&" : "?") + `page=${page}`;
    }

    return getMetadata(undefined, {
        title,
        description,
        path,
    });
}

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        category?: string;
        search?: string;
    }>;
}) {
    const params = await searchParams;
    const { page: pageParam, category, search } = params;

    // Handle pagination
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const itemsPerPage = 9;

    // Fetch data based on search parameters
    const [portfolioResponse, categories] = await Promise.all([
        getPortfolioItemsPaginated(page, itemsPerPage, { category, search }),
        getAllPortfolioCategories(),
    ]);

    const { data: portfolioItems, headers } = portfolioResponse;
    const { total, totalPages } = headers;

    // Create pagination URL helper
    const createPaginationUrl = (newPage: number) => {
        const params = new URLSearchParams();
        if (newPage > 1) params.set("page", newPage.toString());
        if (category) params.set("category", category);
        if (search) params.set("search", search);
        return `/portfolio${params.toString() ? `?${params.toString()}` : ""}`;
    };

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: "Home",
                        item: siteConfig.site_domain,
                    },
                    {
                        name: "Portfolio",
                        item: `${siteConfig.site_domain}/portfolio`,
                    },
                ]}
            />
            <Section>
                <Container className="max-w-[1600px] mx-auto">
                    <div className="mb-12">
                        <Breadcrumbs
                            items={[
                                { label: "Portfolio", active: true },
                            ]}
                        />
                    </div>
                    <div className="space-y-8">
                        <Prose>
                            <h1>Our Web Development Portfolio</h1>
                            <p className="text-muted-foreground">
                                {total} {total === 1 ? "project" : "projects"} found
                                {search && " matching your search"}
                            </p>
                        </Prose>

                        <div className="space-y-4">
                            <PortfolioSearchInput defaultValue={search} />
                            <FilterPortfolio
                                categories={categories}
                                selectedCategory={category}
                            />
                        </div>

                        {portfolioItems.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {portfolioItems.map((item) => (
                                    <PortfolioCard key={item.id} item={item} layout="vertical" />
                                ))}
                            </div>
                        ) : (
                            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
                                <p>No portfolio items found</p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center py-8">
                                <Pagination>
                                    <PaginationContent>
                                        {page > 1 && (
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href={createPaginationUrl(page - 1)}
                                                />
                                            </PaginationItem>
                                        )}

                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                            .filter((pageNum) => {
                                                // Show current page, first page, last page, and 2 pages around current
                                                return (
                                                    pageNum === 1 ||
                                                    pageNum === totalPages ||
                                                    Math.abs(pageNum - page) <= 1
                                                );
                                            })
                                            .map((pageNum, index, array) => {
                                                const showEllipsis =
                                                    index > 0 && pageNum - array[index - 1] > 1;
                                                return (
                                                    <div key={pageNum} className="flex items-center">
                                                        {showEllipsis && <span className="px-2">...</span>}
                                                        <PaginationItem>
                                                            <PaginationLink
                                                                href={createPaginationUrl(pageNum)}
                                                                isActive={pageNum === page}
                                                            >
                                                                {pageNum}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    </div>
                                                );
                                            })}

                                        {page < totalPages && (
                                            <PaginationItem>
                                                <PaginationNext href={createPaginationUrl(page + 1)} />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </div>
                </Container>
            </Section>
        </>
    );
}
