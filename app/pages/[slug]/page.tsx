import { getPageBySlug, getAllPages } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { siteConfig } from "@/site.config";
import { notFound } from "next/navigation";
import { stripHtml } from "@/lib/utils";

import type { Metadata } from "next";

import { getMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

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

  return getMetadata(page, { type: "article" });
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
    <Section>
      <Container>
        <div className="mb-12">
          <Breadcrumbs
            items={[
              { label: stripHtml(page.title.rendered), active: true },
            ]}
          />
        </div>
        <Prose>
          <h2>{stripHtml(page.title.rendered)}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </Prose>
      </Container>
    </Section>
  );
}
