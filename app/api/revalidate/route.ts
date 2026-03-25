import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

/**
 * WordPress webhook handler for content revalidation
 * Receives notifications from WordPress when content changes
 */
export async function POST(request: NextRequest) {
  try {
    // Check Content-Type
    const contentTypeHeader = request.headers.get("content-type");
    if (!contentTypeHeader || !contentTypeHeader.includes("application/json")) {
      return NextResponse.json({ message: "Missing content type" }, { status: 400 });
    }

    // Parse body safely
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const { type, data } = body;

    // Support both 'contentType' and 'type' for flexibility
    const contentType = body.contentType || type;
    const contentId = data?.id || body.contentId || body.id;

    const secret = request.headers.get("x-webhook-secret");

    // Verify secret
    if (secret !== process.env.WORDPRESS_WEBHOOK_SECRET) {
      console.error("Invalid webhook secret");
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (!contentType) {
      return NextResponse.json({ message: "Missing contentType field" }, { status: 400 });
    }

    console.log(`Revalidating content: ${contentType}${contentId ? ` (ID: ${contentId})` : ""}`);

    try {
      // Handle full revalidation
      if (contentType === "all") {
        revalidatePath("/", "layout");
        revalidateTag("wordpress", { expire: 0 });
        revalidateTag("posts", { expire: 0 });
        revalidateTag("pages", { expire: 0 });
        revalidateTag("portfolio", { expire: 0 });
        revalidateTag("site-options", { expire: 0 });

        return NextResponse.json({ revalidated: true, now: Date.now() });
      }

      // Shared tag
      revalidateTag("wordpress", { expire: 0 });

      if (contentType === "post") {
        revalidateTag("posts", { expire: 0 });
        if (contentId) {
          revalidateTag(`post-${contentId}`, { expire: 0 });
        }
        revalidatePath("/blog", "page");
      } else if (contentType === "page") {
        revalidateTag("pages", { expire: 0 });
        if (contentId) {
          revalidateTag(`page-${contentId}`, { expire: 0 });
        }
      } else if (contentType === "portfolio") {
        revalidateTag("portfolio", { expire: 0 });
        if (contentId) {
          revalidateTag(`portfolio-${contentId}`, { expire: 0 });
        }
        revalidatePath("/portfolio", "page");
      } else if (contentType === "category") {
        revalidateTag("categories", { expire: 0 });
        if (contentId) {
          revalidateTag(`category-${contentId}`, { expire: 0 });
          revalidateTag(`posts-category-${contentId}`, { expire: 0 });
        }
        revalidatePath("/blog", "page");
      } else if (contentType === "tag") {
        revalidateTag("tags", { expire: 0 });
        if (contentId) {
          revalidateTag(`tag-${contentId}`, { expire: 0 });
          revalidateTag(`posts-tag-${contentId}`, { expire: 0 });
        }
        revalidatePath("/blog", "page");
      } else if (contentType === "author" || contentType === "user") {
        revalidateTag("authors", { expire: 0 });
        if (contentId) {
          revalidateTag(`author-${contentId}`, { expire: 0 });
          revalidateTag(`posts-author-${contentId}`, { expire: 0 });
        }
        revalidatePath("/blog", "page");
      } else if (contentType === "media") {
        revalidateTag("wordpress", { expire: 0 });
        revalidateTag("site-options", { expire: 0 });
      } else if (contentType === "menu") {
        revalidateTag("wordpress", { expire: 0 });
        revalidatePath("/", "layout");
      } else if (contentType === "options" || contentType === "site-options") {
        revalidateTag("site-options", { expire: 0 });
      } else if (contentType === "test") {
        return NextResponse.json({
          revalidated: false,
          message: "Test webhook received successfully",
          timestamp: new Date().toISOString(),
        });
      }

      // Safety revalidation
      revalidatePath("/", "layout");
      revalidatePath("/", "page");

      return NextResponse.json({
        revalidated: true,
        message: `Revalidated ${contentType}${contentId ? ` (ID: ${contentId})` : ""} and related content`,
        now: Date.now(),
      });
    } catch (err: any) {
      console.error("Revalidation error:", err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Request error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


