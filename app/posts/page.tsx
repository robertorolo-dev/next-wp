import {
  getPostsPaginated,
  getAllAuthors,
  getAllTags,
  getAllCategories,
  searchAuthors,
  searchTags,
  searchCategories,
  getCategoryById,
  getTagById,
  getAuthorById,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container, Prose } from "@/components/craft";
import { PostCard } from "@/components/posts/post-card";
import { FilterPosts } from "@/components/posts/filter";
import { SearchInput } from "@/components/posts/search-input";

import type { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "next-seo";
import { siteConfig } from "@/site.config";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    author?: string;
    tag?: string;
    category?: string;
    page?: string;
    search?: string;
  }>;
}): Promise<Metadata> {
  const { author, tag, category, page, search } = await searchParams;

  let title = "Blog";
  let description = "Read our latest news and articles on web development.";
  let path = "/posts";

  if (category) {
    try {
      const cat = await getCategoryById(parseInt(category));
      title = `${cat.name} Posts`;
      path = `/posts?category=${category}`;
    } catch (e) { }
  } else if (tag) {
    try {
      const t = await getTagById(parseInt(tag));
      title = `Posts tagged "${t.name}"`;
      path = `/posts?tag=${tag}`;
    } catch (e) { }
  } else if (author) {
    try {
      const a = await getAuthorById(parseInt(author));
      title = `Posts by ${a.name}`;
      path = `/posts?author=${author}`;
    } catch (e) { }
  } else if (search) {
    title = `Search results for "${search}"`;
    path = `/posts?search=${search}`;
  }

  // Handle pagination in canonical URL if page > 1
  if (page && parseInt(page) > 1) {
    path += (path.includes("?") ? "&" : "?") + `page=${page}`;
  }

  return getMetadata(undefined, {
    title,
    description,
    path,
  });
}

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    author?: string;
    tag?: string;
    category?: string;
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { author, tag, category, page: pageParam, search } = params;

  // Handle pagination
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;

  // Fetch data based on search parameters using efficient pagination
  const [postsResponse, authors, tags, categories] = await Promise.all([
    getPostsPaginated(page, postsPerPage, { author, tag, category, search }),
    search ? searchAuthors(search) : getAllAuthors(),
    search ? searchTags(search) : getAllTags(),
    search ? searchCategories(search) : getAllCategories(),
  ]);

  const { data: posts, headers } = postsResponse;
  const { total, totalPages } = headers;

  // Create pagination URL helper
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (category) params.set("category", category);
    if (author) params.set("author", author);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    return `/posts${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: siteConfig.site_domain,
          },
          {
            name: "Blog",
            item: `${siteConfig.site_domain}/posts`,
          },
        ]}
      />
      <Section>
        <Container className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <Breadcrumbs
              items={[
                { label: "Blog", active: true },
              ]}
            />
          </div>
          <div className="space-y-8">
            <Prose>
              <h2>All Posts</h2>
              <p className="text-muted-foreground">
                {total} {total === 1 ? "post" : "posts"} found
                {search && " matching your search"}
              </p>
            </Prose>

            <div className="space-y-4">
              <SearchInput defaultValue={search} />

              <FilterPosts
                authors={authors}
                tags={tags}
                categories={categories}
                selectedAuthor={author}
                selectedTag={tag}
                selectedCategory={category}
              />
            </div>

            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
                <p>No posts found</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center py-8">
                <Pagination>
                  <PaginationContent>
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href={createPaginationUrl(page - 1)}
                        />
                      </PaginationItem>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((pageNum) => {
                        // Show current page, first page, last page, and 2 pages around current
                        return (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          Math.abs(pageNum - page) <= 1
                        );
                      })
                      .map((pageNum, index, array) => {
                        const showEllipsis =
                          index > 0 && pageNum - array[index - 1] > 1;
                        return (
                          <div key={pageNum} className="flex items-center">
                            {showEllipsis && <span className="px-2">...</span>}
                            <PaginationItem>
                              <PaginationLink
                                href={createPaginationUrl(pageNum)}
                                isActive={pageNum === page}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          </div>
                        );
                      })}

                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationNext href={createPaginationUrl(page + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
