import { getPageBySlug, getAllPages } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { siteConfig } from "@/site.config";
import { notFound } from "next/navigation";
import { stripHtml } from "@/lib/utils";

import type { Metadata } from "next";

import { getMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "next-seo";


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

  return getMetadata(page, { type: "article", path: `/pages/${page.slug}` });
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
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: siteConfig.site_domain,
          },
          {
            name: stripHtml(page.title.rendered),
            item: `${siteConfig.site_domain}/pages/${page.slug}`,
          },
        ]}
      />
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
