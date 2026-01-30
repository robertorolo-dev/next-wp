import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "@/lib/wordpress.d";
import { cn, stripHtml } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export async function PortfolioCard({
    item,
    layout = "vertical"
}: {
    item: Portfolio,
    layout?: "vertical" | "horizontal"
}) {
    // Get ACF fields and data
    const title = stripHtml(item.title?.rendered || "Untitled Project");
    const description = item.acf?.project_description || (item.excerpt?.rendered
        ? stripHtml(item.excerpt.rendered).split(" ").slice(0, 15).join(" ") + "..."
        : "No description available");

    const tag = item.acf?.project_tag || "Design";
    const backgroundInput = item.acf?.background_color || "bg-[#6366F1]";

    // Support dynamic hex colors from CMS (Tailwind classes like bg-[#fff] aren't pre-compiled)
    const hexMatch = backgroundInput.match(/\[?(#[a-fA-F0-9]{3,8})\]?/i);
    const hexColor = hexMatch ? hexMatch[1] : null;

    const containerStyle = hexColor ? { backgroundColor: hexColor } : {};
    const bgColorClass = hexColor ? "" : backgroundInput;

    const illustration = item.acf?.project_illustration?.url;
    const caseStudyLink = `/portfolio/${item.slug}`;

    const containerClasses = cn(
        "group border-[3px] border-black rounded-[32px] overflow-hidden hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col",
        bgColorClass,
        layout === "horizontal" ? "md:grid md:grid-cols-2" : ""
    );

    return (
        <div className={containerClasses} style={containerStyle}>
            <div className={cn(
                "p-6 flex flex-col justify-center relative z-10 bg-white/40 backdrop-blur-[2px] flex-1",
                layout === "horizontal" ? "md:p-12" : "md:p-8"
            )}>
                <h3 className={cn(
                    "font-bold mb-4 leading-tight text-[#0B0B0B]",
                    layout === "vertical" ? "text-xl md:text-2xl" : "text-xl md:text-[28px] md:leading-[40px]"
                )}>
                    {title}
                </h3>

                <span className="inline-block bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
                    {tag}
                </span>

                <p className={cn(
                    "text-[#393939] mb-8 leading-relaxed font-medium",
                    layout === "vertical" ? "text-sm md:text-base" : "text-base md:text-[18px] md:leading-[30px]"
                )}>
                    {description}
                </p>

                <Link
                    href={caseStudyLink}
                    className="flex items-center gap-2 font-semibold text-[#0B0B0B] hover:gap-3 transition-all text-sm md:text-base mt-auto"
                >
                    View case study
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className={cn(
                "relative overflow-hidden flex-shrink-0",
                layout === "vertical" ? "h-64 order-first" : "min-h-[250px] md:min-h-[500px]"
            )}>
                {illustration ? (
                    <Image
                        src={illustration}
                        alt={title}
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
    );
}
