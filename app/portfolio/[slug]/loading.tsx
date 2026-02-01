import { Section, Container } from "@/components/craft";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function Loading() {
    return (
        <Section>
            <Container className="max-w-[1600px] mx-auto">
                <div className="mb-12">
                    <Breadcrumbs
                        items={[
                            { label: "Portfolio", href: "/portfolio" },
                            { label: "...", active: true },
                        ]}
                    />
                </div>

                <div className="space-y-12">
                    {/* Project Header Skeleton */}
                    <div className="border-b-[3px] border-neutral-100 pb-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="flex-1 space-y-6">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-16 w-3/4" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                            <Skeleton className="h-24 w-48 rounded-2xl" />
                        </div>
                    </div>

                    {/* Banner Skeleton */}
                    <Skeleton className="h-[300px] md:h-[600px] w-full rounded-[40px]" />

                    <div className="grid md:grid-cols-3 gap-12 pt-8">
                        <div className="md:col-span-2 space-y-8">
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/6" />
                            </div>
                            <Skeleton className="h-14 w-48 rounded-2xl" />
                        </div>

                        <div className="md:col-span-1">
                            <div className="border-[3px] border-neutral-100 rounded-[32px] p-8 space-y-8">
                                <Skeleton className="h-8 w-1/2" />
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-6 w-32" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
