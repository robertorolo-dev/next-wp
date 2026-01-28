import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/wordpress.d";
import { cn, stripHtml } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

import {
  getFeaturedMediaById,
  getCategoryById,
} from "@/lib/wordpress";

export async function PostCard({ post }: { post: Post }) {
  const media = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const category = post.categories?.[0]
    ? await getCategoryById(post.categories[0])
    : null;

  const title = stripHtml(post.title?.rendered || "Untitled Post");
  const excerpt = post.excerpt?.rendered
    ? stripHtml(post.excerpt.rendered).split(" ").slice(0, 20).join(" ") + "..."
    : "No excerpt available";

  return (
    <div className="group flex flex-col bg-white border-[3px] border-black rounded-[32px] overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
      <div className="relative h-48 w-full overflow-hidden border-b-[3px] border-black bg-muted">
        {media?.source_url ? (
          <Image
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            src={media.source_url}
            alt={title}
            fill
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground font-medium">
            No image available
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <span className="inline-block bg-black text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">
            {category?.name || "News"}
          </span>
          <span className="text-xs font-semibold text-gray-500">{date}</span>
        </div>

        <h3 className="text-xl font-bold mb-4 leading-tight text-[#0B0B0B] group-hover:underline decoration-2 underline-offset-4 decoration-black transition-all">
          {title}
        </h3>

        <p className="text-sm md:text-base text-[#393939] mb-6 leading-relaxed font-medium line-clamp-3">
          {excerpt}
        </p>

        <Link
          href={`/posts/${post.slug}`}
          className="flex items-center gap-2 font-bold text-[#0B0B0B] hover:gap-3 transition-all text-sm mt-auto w-fit"
        >
          Read article
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
