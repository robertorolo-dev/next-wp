import { siteConfig } from "@/site.config";

export const defaultSeoConfig = {
    title: siteConfig.site_name,
    titleTemplate: `%s | ${siteConfig.site_name}`,
    defaultTitle: siteConfig.site_name,
    description: siteConfig.site_description,
    canonical: siteConfig.site_domain,
    openGraph: {
        type: "website",
        locale: "en_ZA",
        url: siteConfig.site_domain,
        siteName: siteConfig.site_name,
        images: [
            {
                url: `${siteConfig.site_domain}/opengraph-image.png`,
                width: 1200,
                height: 630,
                alt: siteConfig.site_name,
            },
        ],
    },
    twitter: {
        handle: "@kumocode",
        site: "@kumocode",
        cardType: "summary_large_image",
    },
};

export default defaultSeoConfig;
