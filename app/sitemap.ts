import { MetadataRoute } from "next";
import { getAllPosts, getAllPortfolioItems, getAllPages } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, portfolioItems, pages] = await Promise.all([
    getAllPosts(),
    getAllPortfolioItems(),
    getAllPages()
  ]);

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.site_domain}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.site_domain}/posts`,
      lastModified: posts[0] ? new Date(posts[0].modified) : new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.site_domain}/portfolio`,
      lastModified: portfolioItems[0] ? new Date(portfolioItems[0].modified) : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.site_domain}/pages`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/posts/authors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.site_domain}/posts/categories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.site_domain}/posts/tags`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.site_domain}/posts/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const portfolioUrls: MetadataRoute.Sitemap = portfolioItems.map((item) => ({
    url: `${siteConfig.site_domain}/portfolio/${item.slug}`,
    lastModified: new Date(item.modified),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const pageUrls: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${siteConfig.site_domain}/pages/${page.slug}`,
    lastModified: new Date(page.modified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticUrls, ...postUrls, ...portfolioUrls, ...pageUrls];
}
