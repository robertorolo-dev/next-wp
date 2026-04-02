import { getRankMathHead } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";

/**
 * Renders Rank Math JSON-LD schema blocks into the page.
 *
 * Pass `wpUrl` as the full canonical WordPress URL (e.g. post.link from the REST API)
 * or a root-relative WP path (e.g. "/my-post-slug").
 *
 * Do NOT pass Next.js frontend paths like "/blog/slug" — WordPress doesn't
 * understand that prefix and Rank Math will return no data.
 */
export async function RankMathSchema({ wpUrl }: { wpUrl: string }) {
    const baseUrl = process.env.WORDPRESS_URL;
    if (!baseUrl) return null;

    let fullUrl = wpUrl;
    if (!wpUrl.startsWith('http')) {
        const formattedPath = wpUrl.startsWith('/') ? wpUrl : `/${wpUrl}`;
        fullUrl = `${baseUrl.replace(/\/$/, '')}${formattedPath}`;
    }

    let headHtml = await getRankMathHead(fullUrl);
    if (!headHtml) return null;

    // Cleanly rewrite backend API domains into frontend domains for the schema URLs
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const cleanSiteDomain = siteConfig.site_domain.replace(/\/$/, '');
    headHtml = headHtml.replace(new RegExp(cleanBaseUrl, 'g'), cleanSiteDomain);

    const schemas: string[] = [];
    const scriptRegex = /<script type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    while ((match = scriptRegex.exec(headHtml)) !== null) {
        if (match[1]) schemas.push(match[1]);
    }

    if (schemas.length === 0) return null;

    return (
        <>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: schema }}
                />
            ))}
        </>
    );
}
