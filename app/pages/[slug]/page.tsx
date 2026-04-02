import { getPageBySlug, getAllPages } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { siteConfig } from "@/site.config";
import { notFound } from "next/navigation";
import { stripHtml } from "@/lib/utils";

import type { Metadata } from "next";

import { getMetadata, getRankMathMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "next-seo";
import { RankMathSchema } from "@/components/seo/rank-math-schema";


// Revalidate pages every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const fallback = getMetadata(page, { type: "article", path: `/pages/${page.slug}` });
  return await getRankMathMetadata(page.link, fallback);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <RankMathSchema wpUrl={page.link} />
      <Section>
        <Container>

          <Prose>
            <h2>{stripHtml(page.title.rendered)}</h2>
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
          </Prose>
        </Container>
      </Section>
    </>
  );
}
