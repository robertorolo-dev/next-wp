import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup"
import Image from "next/image"
import Link from "next/link"
import { getAllPosts } from "@/lib/wordpress"
import type { Post } from "@/lib/wordpress.d"
import { stripHtml } from "@/lib/utils"

// Helper function to get embedded data
function getEmbeddedAuthor(post: any) {
    return post._embedded?.author?.[0]
}

function getEmbeddedMedia(post: any) {
    return post._embedded?.['wp:featuredmedia']?.[0]
}

function getEmbeddedCategories(post: any) {
    return post._embedded?.['wp:term']?.[0] || []
}

// Helper to format date
function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export async function ArticlesSection() {
    // Fetch only the latest 3 posts to optimize performance
    const posts = await getAllPosts({ per_page: 3 })
    console.log(`[ArticlesSection] Fetched ${posts?.length || 0} posts`);
    const latestPosts = posts.slice(0, 3)

    // If no posts, show placeholder
    if (!latestPosts || latestPosts.length === 0) {
        return (
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Articles & News</h2>
                        <Button
                            variant="outline"
                            className="border-[3px] border-black rounded-xl px-4 md:px-6 py-4 md:py-6 hover:bg-gray-50 bg-white font-semibold text-sm md:text-base w-full sm:w-auto cursor-pointer"
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            Browse all articles
                        </Button>
                    </div>
                    <div className="text-center py-12 text-gray-600">
                        <p>No articles available at the moment.</p>
                    </div>
                    <NewsletterSignup />
                </div>
            </section>
        )
    }

    const [featuredPost, ...smallerPosts] = latestPosts

    return (
        <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Articles & News</h2>
                    <Link href="/blog">
                        <Button
                            variant="outline"
                            className="border-[3px] border-black rounded-xl px-4 md:px-6 py-4 md:py-6 hover:bg-gray-50 bg-white font-semibold text-sm md:text-base w-full sm:w-auto cursor-pointer"
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            Browse all articles
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-6">
                    {/* Large featured article card */}
                    {featuredPost && (
                        <Link href={`/blog/${featuredPost.slug}`} className="h-full">
                            <div className="group flex flex-col h-full bg-white border-[3px] border-black rounded-3xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <div className="bg-[#EDEDED] relative min-h-[220px] md:min-h-[320px] m-3 md:m-4 rounded-2xl overflow-hidden">
                                    {getEmbeddedCategories(featuredPost)[0] && (
                                        <span className="absolute top-3 right-3 md:top-4 md:right-4 inline-block bg-black text-white text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-lg z-10">
                                            {getEmbeddedCategories(featuredPost)[0].name}
                                        </span>
                                    )}
                                    {getEmbeddedMedia(featuredPost)?.source_url ? (
                                        <Image
                                            src={getEmbeddedMedia(featuredPost).source_url}
                                            alt={getEmbeddedMedia(featuredPost).alt_text || featuredPost.title.rendered}
                                            fill
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8f6Pdx8AAAAASUVORK5CYII="
                                            className="object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No image
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                                            {stripHtml(featuredPost.title.rendered)}
                                        </h3>
                                        {featuredPost.excerpt?.rendered && (
                                            <p className="text-gray-600 text-sm md:text-lg mb-6 line-clamp-2 md:line-clamp-3">
                                                {stripHtml(featuredPost.excerpt.rendered)}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 md:gap-4">
                                        {getEmbeddedAuthor(featuredPost) && (
                                            <>
                                                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FDB927] border-2 border-black rounded-full overflow-hidden flex-shrink-0">
                                                    {getEmbeddedAuthor(featuredPost).avatar_urls?.['96'] ? (
                                                        <Image
                                                            src={getEmbeddedAuthor(featuredPost).avatar_urls['96']}
                                                            alt={getEmbeddedAuthor(featuredPost).name}
                                                            width={64}
                                                            height={64}
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                                                            {getEmbeddedAuthor(featuredPost).name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-base md:text-lg text-[#0B0B0B]">
                                                        {getEmbeddedAuthor(featuredPost).name}
                                                    </div>
                                                    <div className="text-sm md:text-base text-gray-600">
                                                        {formatDate(featuredPost.date)}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Right side - Two smaller article cards */}
                    <div className="flex flex-col gap-6">
                        {smallerPosts.map((post, index) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="flex flex-col flex-1">
                                <div className="group flex-1 bg-white border-[3px] border-black rounded-3xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row h-full">
                                        {/* Image area */}
                                        <div className="bg-[#EDEDED] sm:min-w-[200px] md:min-w-[280px] min-h-[180px] sm:min-h-[200px] relative m-3 md:m-4 rounded-2xl overflow-hidden flex-shrink-0">
                                            {getEmbeddedCategories(post)[0] && (
                                                <span className="absolute top-3 right-3 md:top-4 md:right-4 inline-block bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg z-10">
                                                    {getEmbeddedCategories(post)[0].name}
                                                </span>
                                            )}
                                            {getEmbeddedMedia(post)?.source_url ? (
                                                <Image
                                                    src={getEmbeddedMedia(post).source_url}
                                                    alt={getEmbeddedMedia(post).alt_text || post.title.rendered}
                                                    fill
                                                    placeholder="blur"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8f6Pdx8AAAAASUVORK5CYII="
                                                    className="object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    No image
                                                </div>
                                            )}
                                        </div>
                                        {/* Content area */}
                                        <div className="p-6 md:p-8 flex flex-col justify-between h-full">
                                            <div>
                                                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">
                                                    {stripHtml(post.title.rendered)}
                                                </h3>
                                                {post.excerpt?.rendered && (
                                                    <p className="text-gray-600 text-sm md:text-lg leading-relaxed line-clamp-2 mb-6">
                                                        {stripHtml(post.excerpt.rendered)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {getEmbeddedAuthor(post) && (
                                                    <>
                                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FDB927] border-2 border-black rounded-full overflow-hidden flex-shrink-0">
                                                            {getEmbeddedAuthor(post).avatar_urls?.['96'] ? (
                                                                <Image
                                                                    src={getEmbeddedAuthor(post).avatar_urls['96']}
                                                                    alt={getEmbeddedAuthor(post).name}
                                                                    width={48}
                                                                    height={48}
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                                                                    {getEmbeddedAuthor(post).name.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm md:text-base text-[#0B0B0B]">
                                                                {getEmbeddedAuthor(post).name}
                                                            </div>
                                                            <div className="text-xs md:text-sm text-gray-600">
                                                                {formatDate(post.date)}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <NewsletterSignup />
            </div>
        </section>
    )
}
