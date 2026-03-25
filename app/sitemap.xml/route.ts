import { getAllPosts, getAllPortfolioItems, getAllPages } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    const [posts, portfolioItems, pages] = await Promise.all([
        getAllPosts(),
        getAllPortfolioItems(),
        getAllPages(),
    ]);

    const baseUrl = siteConfig.site_domain;

    // 1. Static URLs
    const urls = [
        { url: `${baseUrl}`, lastMod: new Date().toISOString(), priority: "1.0", changeFreq: "daily" },
        { url: `${baseUrl}/blog`, lastMod: posts[0] ? new Date(posts[0].modified).toISOString() : new Date().toISOString(), priority: "0.9", changeFreq: "daily" },
        { url: `${baseUrl}/portfolio`, lastMod: portfolioItems[0] ? new Date(portfolioItems[0].modified).toISOString() : new Date().toISOString(), priority: "0.9", changeFreq: "weekly" },
        { url: `${baseUrl}/wordpress-development`, lastMod: new Date().toISOString(), priority: "0.9", changeFreq: "monthly" },
        { url: `${baseUrl}/shopify-development`, lastMod: new Date().toISOString(), priority: "0.9", changeFreq: "monthly" },
        { url: `${baseUrl}/pages`, lastMod: new Date().toISOString(), priority: "0.5", changeFreq: "monthly" },
        { url: `${baseUrl}/blog/authors`, lastMod: new Date().toISOString(), priority: "0.4", changeFreq: "monthly" },
        { url: `${baseUrl}/blog/categories`, lastMod: new Date().toISOString(), priority: "0.1", changeFreq: "monthly" },
        { url: `${baseUrl}/blog/tags`, lastMod: new Date().toISOString(), priority: "0.1", changeFreq: "monthly" },
    ];

    // 2. Dynamic URLs - Posts
    posts.forEach((post) => {
        urls.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastMod: new Date(post.modified).toISOString(),
            priority: "0.7",
            changeFreq: "weekly",
        });
    });

    // 3. Dynamic URLs - Portfolio
    portfolioItems.forEach((item) => {
        urls.push({
            url: `${baseUrl}/portfolio/${item.slug}`,
            lastMod: new Date(item.modified).toISOString(),
            priority: "0.8",
            changeFreq: "weekly",
        });
    });

    // 4. Dynamic URLs - Pages
    pages.forEach((page) => {
        urls.push({
            url: `${baseUrl}/pages/${page.slug}`,
            lastMod: new Date(page.modified).toISOString(),
            priority: "0.6",
            changeFreq: "monthly",
        });
    });

    // Generate XML with XSLT reference
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
            .map(
                (u) => `
  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastMod}</lastmod>
    <changefreq>${u.changeFreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
            )
            .join("")}
</urlset>`;

    return new NextResponse(sitemapXml, {
        headers: {
            "Content-Type": "application/xml",
            "X-Content-Type-Options": "nosniff",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
        },
    });
}
