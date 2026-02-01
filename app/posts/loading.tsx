import { Section, Container } from "@/components/craft";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function Loading() {
    return (
        <Section>
            <Container className="max-w-[1400px] mx-auto">
                <div className="mb-12">
                    <Breadcrumbs
                        items={[
                            { label: "Blog", active: true },
                        ]}
                    />
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-10 w-32" />
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="border-[3px] border-neutral-100 rounded-3xl overflow-hidden flex flex-col"
                            >
                                <div className="h-48 bg-neutral-50" />
                                <div className="p-6 space-y-4">
                                    <div className="flex gap-2">
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                    </div>
                                    <Skeleton className="h-8 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <div className="flex items-center gap-3 pt-4">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-1">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
