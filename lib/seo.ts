import { Metadata } from "next";
import { Post, Page, Portfolio } from "./wordpress.d";
import { siteConfig } from "@/site.config";
import { defaultSeoConfig } from "./seo-config";
import { stripHtml } from "./utils";

/**
 * SEO Utility to map WordPress data to Next.js Metadata API
 */

export function getMetadata(
    item?: Post | Page | Portfolio,
    options: {
        title?: string;
        description?: string;
        type?: "website" | "article";
        noIndex?: boolean;
        noArchive?: boolean;
        path?: string;
    } = {}
): Metadata {
    const siteName = siteConfig.site_name;
    const baseUrl = siteConfig.site_domain;

    // 1. Start with defaults
    let title = options.title || item?.title?.rendered || defaultSeoConfig.defaultTitle;
    let description =
        options.description ||
        item?.excerpt?.rendered ||
        siteConfig.site_description;
    const type = options.type || "website";

    // 2. Handle WordPress SEO Plugin data (Yoast/RankMath) if available
    const wpItem = item as any;
    let ogImage = defaultSeoConfig.openGraph.images[0].url;

    if (wpItem?.yoast_head_json) {
        const yoast = wpItem.yoast_head_json;
        title = yoast.title || title;
        description = yoast.description || description;
        if (yoast.og_image?.[0]?.url) {
            ogImage = yoast.og_image[0].url;
        }
    }

    // 3. Sanitize strings
    title = stripHtml(title);
    description = stripHtml(description).slice(0, 160);

    // 4. Handle specific page titles
    // We brand the title manually and return it as an absolute title.
    // This gives us full control and prevents Next.js from applying templates twice.
    if (!title.toLowerCase().includes(siteName.toLowerCase())) {
        title = `${title} | ${siteName}`;
    }
    const finalTitle = { absolute: title };

    // 5. Featured Image Fallback
    if (!wpItem?.yoast_head_json?.og_image && wpItem?._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        ogImage = wpItem._embedded["wp:featuredmedia"][0].source_url;
    }

    let url = baseUrl;
    if (options.path) {
        url = `${baseUrl}${options.path}`;
    } else if (item?.link) {
        try {
            // Ensure canonical URL points to the Next.js frontend domain, not the headless WP backend
            const parsedLink = new URL(item.link);
            url = `${baseUrl}${parsedLink.pathname}`;
        } catch {
            url = baseUrl;
        }
    }

    return {
        title: finalTitle,
        description,
        openGraph: {
            ...defaultSeoConfig.openGraph,
            title: typeof finalTitle === 'string' ? finalTitle : finalTitle.absolute,
            description,
            type,
            url,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: typeof finalTitle === 'string' ? finalTitle : finalTitle.absolute,
                },
            ],
        },
        twitter: {
            ...defaultSeoConfig.twitter,
            title: typeof finalTitle === 'string' ? finalTitle : finalTitle.absolute,
            description,
            images: [ogImage],
        },
        robots: options.noIndex ? "noindex, nofollow" : "index, follow",
        alternates: {
            canonical: url,
        },
    };
}
