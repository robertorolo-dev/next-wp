import { Metadata } from "next";
import { Post, Page, Portfolio } from "./wordpress.d";
import { getRankMathHead } from "./wordpress";
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

    // 2. Handle SEO Plugin data — supports both Rank Math and Yoast
    const wpItem = item as any;
    let ogImage = defaultSeoConfig.openGraph.images[0].url;

    if (wpItem?.rank_math_title || wpItem?.rank_math_description) {
        // Rank Math SEO (adds fields at root level of REST API response)
        title = wpItem.rank_math_title || title;
        description = wpItem.rank_math_description || description;
        // Rank Math stores OG image in rank_math_og_content_image or via featured media
        if (wpItem.rank_math_og_content_image) {
            ogImage = wpItem.rank_math_og_content_image;
        }
    } else if (wpItem?.yoast_head_json) {
        // Yoast SEO (nests data under yoast_head_json)
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

    // 5. Featured Image Fallback (only if no SEO plugin provided an image)
    const hasPluginImage = wpItem?.rank_math_og_content_image || wpItem?.yoast_head_json?.og_image;
    if (!hasPluginImage && wpItem?._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
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

/**
 * Parses Rank Math's raw <head> HTML string into a Next.js Metadata object.
 * Extracts title, description, canonical, robots, and OpenGraph tags dynamically. 
 */
export function parseRankMathHead(html: string, baseMetadata: Metadata = {}): Metadata {
    const metadata: Metadata = { ...baseMetadata };

    if (!html) return metadata;

    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
        metadata.title = stripHtml(titleMatch[1]);
    }

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
    if (descMatch && descMatch[1]) {
        metadata.description = stripHtml(descMatch[1]);
    }

    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i) ||
                           html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
    if (canonicalMatch && canonicalMatch[1]) {
        metadata.alternates = { ...metadata.alternates, canonical: canonicalMatch[1] };
    }

    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']robots["'][^>]*>/i);
    if (robotsMatch && robotsMatch[1]) {
        metadata.robots = robotsMatch[1];
    }

    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                         html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:image["'][^>]*>/i);
    if (ogImageMatch && ogImageMatch[1]) {
        if (!metadata.openGraph) metadata.openGraph = {};
        metadata.openGraph.images = [{ url: ogImageMatch[1] }];
    }

    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i) || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:title["'][^>]*>/i);
    if (ogTitleMatch && ogTitleMatch[1]) {
        if (!metadata.openGraph) metadata.openGraph = {};
        metadata.openGraph.title = stripHtml(ogTitleMatch[1]);
    }

    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)[\"'][^>]*>/i) || html.match(/<meta[^>]*content=["']([^"']*)[\"'][^>]*property=["']og:description["'][^>]*>/i);
    if (ogDescMatch && ogDescMatch[1]) {
        if (!metadata.openGraph) metadata.openGraph = {};
        metadata.openGraph.description = stripHtml(ogDescMatch[1]);
    }

    // Rank Math doesn't output Twitter card tags — sync twitter metadata
    // to match the Rank Math title/description so all tags are consistent.
    const finalDesc = metadata.description ?? (metadata.openGraph as any)?.description;
    const finalTitle = metadata.title ?? (metadata.openGraph as any)?.title;
    if (finalDesc || finalTitle) {
        metadata.twitter = {
            ...(metadata.twitter as any ?? {}),
            ...(finalTitle ? { title: typeof finalTitle === 'string' ? finalTitle : (finalTitle as any).absolute } : {}),
            ...(finalDesc ? { description: finalDesc as string } : {}),
        };
    }

    return metadata;
}

/**
 * Helper to fetch and parse Rank Math headless metadata.
 * 
 * Pass either:
 * - A full canonical WordPress URL (e.g., post.link from the REST API) — preferred, no redirect needed
 * - A root-relative WP path (e.g., "/my-post-slug") — WordPress resolves this itself
 *
 * Avoid passing Next.js frontend paths like "/blog/slug" — WordPress doesn't know about that
 * prefix and will 404, causing Rank Math to return empty data.
 */
export async function getRankMathMetadata(
    wpUrlOrPath: string,
    fallbackMetadata: Metadata = {}
): Promise<Metadata> {
    const baseUrl = process.env.WORDPRESS_URL;
    if (!baseUrl) return fallbackMetadata;

    // Build a full URL if a relative path was passed
    let fullUrl = wpUrlOrPath;
    if (!wpUrlOrPath.startsWith('http')) {
        const formattedPath = wpUrlOrPath.startsWith('/') ? wpUrlOrPath : `/${wpUrlOrPath}`;
        fullUrl = `${baseUrl.replace(/\/$/, '')}${formattedPath}`;
    }

    let headHtml = await getRankMathHead(fullUrl);

    // If RankMath returns empty or a 404 page, fall back to default metadata
    if (!headHtml || headHtml.includes("Page Not Found - ") || headHtml.includes("<title>Page Not Found")) {
        return fallbackMetadata;
    }

    // Rewrite WP backend domain to the Next.js frontend domain
    // so canonical tags and OG URLs are correct in the rendered page
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const cleanSiteDomain = siteConfig.site_domain.replace(/\/$/, '');
    headHtml = headHtml.replace(new RegExp(cleanBaseUrl, 'g'), cleanSiteDomain);

    return parseRankMathHead(headHtml, fallbackMetadata);
}
