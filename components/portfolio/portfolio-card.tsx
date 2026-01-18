import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";

export async function PortfolioCard({ item }: { item: Portfolio }) {
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

    return (
        <Link
            href={`/portfolio/${item.slug}`}
            className={cn(
                "border p-4 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-8",
                "hover:bg-accent/75 transition-all"
            )}
        >
            <div className="flex flex-col gap-4">
                <div className={cn(
                    "h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center",
                    bgColor
                )}>
                    <Image
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        src={illustration || "/placeholder.svg"}
                        alt={item.title?.rendered || "Portfolio item"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {logo && (
                    <div className="flex items-center">
                        <Image
                            src={logo}
                            alt={`${item.title.rendered} logo`}
                            width={100}
                            height={28}
                            className="h-6 w-auto"
                        />
                    </div>
                )}

                <div
                    dangerouslySetInnerHTML={{
                        __html: item.title?.rendered || "Untitled Project",
                    }}
                    className="text-xl text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
                ></div>

                <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                        __html: item.excerpt?.rendered
                            ? item.excerpt.rendered.replace(/<[^>]*>/g, '').split(" ").slice(0, 12).join(" ").trim() +
                            "..."
                            : "No description available",
                    }}
                ></div>
            </div>

            <div className="flex flex-col gap-4">
                <hr />
                <div className="flex justify-between items-center text-xs">
                    <p className="bg-black text-white px-3 py-1 rounded-full">{tag}</p>
                    <p>{date}</p>
                </div>
            </div>
        </Link>
    );
}
