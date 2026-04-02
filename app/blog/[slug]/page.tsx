import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getAllPostSlugs,
  getSiteOptions,
} from "@/lib/wordpress";

import { Section, Container, Article, Prose } from "@/components/craft";
import { cn, stripHtml } from "@/lib/utils";
import { siteConfig } from "@/site.config";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { User, Calendar, Tag as TagIcon } from "lucide-react";
import { BreadcrumbJsonLd } from "next-seo"; // Removed ArticleJsonLd, using RankMath Schema instead
import { RankMathSchema } from "@/components/seo/rank-math-schema";

import { getMetadata, getRankMathMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SocialShare } from "@/components/blog/social-share";
import { SocialFollow } from "@/components/blog/social-follow";

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Article Not Found",
    };
  }

  const fallback = getMetadata(post, { type: "article", path: `/blog/${post.slug}` });
  // Use post.link (the canonical WP permalink, e.g. /2026/02/13/slug/) to query Rank Math
  // This avoids redirect-following in serverless environments which is unreliable
  return await getRankMathMetadata(post.link, fallback);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);
  const postUrl = `${siteConfig.site_domain}/blog/${post.slug}`;
  const siteOptions = await getSiteOptions();

  return (
    <>
      {/* Use post.link (real WP permalink) so Rank Math can find the post's schema */}
      <RankMathSchema wpUrl={post.link} />
      <Section>
        <Container className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
              ]}
            />
          </div>

          <div className="space-y-12">
            {/* Post Header */}
            <div className="border-b-[3px] border-black pb-12">
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-[#0B0B0B] mb-8 max-w-4xl">
                {stripHtml(post.title.rendered)}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFC224] border-2 border-black flex items-center justify-center overflow-hidden">
                    {author.avatar_urls?.['96'] ? (
                      <Image src={author.avatar_urls['96']} alt={author.name} width={32} height={32} />
                    ) : <User className="w-4 h-4 text-black" />}
                  </div>
                  <span className="text-black">By {author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{date}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {featuredMedia?.source_url && (
              <div className="relative h-[300px] md:h-[600px] w-full overflow-hidden border-[3px] border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-muted">
                <Image
                  className="w-full h-full object-cover"
                  src={featuredMedia.source_url}
                  alt={post.title.rendered}
                  fill
                  priority
                />
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-12 pt-8">
              {/* Post Content */}
              <div className="md:col-span-2">
                <Prose className="max-w-none">
                  <Article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </Prose>
              </div>

              {/* Sidebar / Meta */}
              <aside className="md:col-span-1">
                <div className="space-y-8 sticky top-24">
                  <div className="border-[3px] border-black rounded-[32px] p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-2">
                      <TagIcon className="w-5 h-5" />
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/blog/?category=${category.id}`}
                        className="bg-gray-100 text-black border-2 border-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#FFC224] transition-colors"
                      >
                        {category.name}
                      </Link>
                    </div>
                  </div>

                  <div className="border-[3px] border-black rounded-[32px] p-8 bg-[#FDB927]/10 border-dashed">
                    <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Share this article</h3>
                    <div className="space-y-6">
                      <SocialShare url={postUrl} title={stripHtml(post.title.rendered)} />
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
