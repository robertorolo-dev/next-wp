import { getRankMathHead } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";

export async function RankMathSchema({ wpUrlPath }: { wpUrlPath: string }) {
    const baseUrl = process.env.WORDPRESS_URL;
    if (!baseUrl) return null;

    let fullUrl = wpUrlPath;
    if (!wpUrlPath.startsWith('http')) {
        const formattedPath = wpUrlPath.startsWith('/') ? wpUrlPath : `/${wpUrlPath}`;
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
