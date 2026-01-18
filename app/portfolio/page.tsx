import {
    getPortfolioItemsPaginated,
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

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "Browse all our portfolio projects",
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
    }>;
}) {
    const params = await searchParams;
    const { page: pageParam } = params;

    // Handle pagination
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const itemsPerPage = 9;

    // Fetch portfolio items with pagination
    const portfolioResponse = await getPortfolioItemsPaginated(page, itemsPerPage);

    const { data: portfolioItems, headers } = portfolioResponse;
    const { total, totalPages } = headers;

    // Create pagination URL helper
    const createPaginationUrl = (newPage: number) => {
        const params = new URLSearchParams();
        if (newPage > 1) params.set("page", newPage.toString());
        return `/portfolio${params.toString() ? `?${params.toString()}` : ""}`;
    };

    return (
        <Section>
            <Container>
                <div className="space-y-8">
                    <Prose>
                        <h2>Portfolio</h2>
                        <p className="text-muted-foreground">
                            {total} {total === 1 ? "project" : "projects"} in our portfolio
                        </p>
                    </Prose>

                    {portfolioItems.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-4">
                            {portfolioItems.map((item) => (
                                <PortfolioCard key={item.id} item={item} />
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
    );
}
