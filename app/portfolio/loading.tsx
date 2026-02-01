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
                            { label: "Portfolio", active: true },
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
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-8 w-20 rounded-full" />
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="border-[3px] border-neutral-100 rounded-[32px] overflow-hidden flex flex-col h-[400px]"
                            >
                                <div className="p-6 md:p-8 flex-1 space-y-4">
                                    <Skeleton className="h-8 w-3/4" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-20 w-full" />
                                    <Skeleton className="h-6 w-32 mt-auto" />
                                </div>
                                <div className="h-64 bg-neutral-50" />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
