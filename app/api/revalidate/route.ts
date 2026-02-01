import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

/**
 * WordPress webhook handler for content revalidation
 * Receives notifications from WordPress when content changes
 * and revalidates the entire site
 */

export async function POST(request: NextRequest) {
  try {
    // Check if the request has a valid Content-Type header
    const contentTypeHeader = request.headers.get("content-type");

    if (!contentTypeHeader || !contentTypeHeader.includes("application/json")) {
      console.error("Invalid or missing Content-Type header:", contentTypeHeader);
      return NextResponse.json(
        {
          message: "Missing content type",
          error: "Request must have Content-Type: application/json header",
          receivedContentType: contentTypeHeader || "none"
        },
        { status: 400 }
      );
    }

    // Parse the request body
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error("Failed to parse JSON body:", parseError);
      return NextResponse.json(
        {
          message: "Invalid JSON body",
          error: (parseError as Error).message
        },
        { status: 400 }
      );
    }

    const secret = request.headers.get("x-webhook-secret");

    if (secret !== process.env.WORDPRESS_WEBHOOK_SECRET) {
      console.error("Invalid webhook secret");
      return NextResponse.json(
        { message: "Invalid webhook secret" },
        { status: 401 }
      );
    }

    // Support both 'contentType' and 'type' field names for flexibility
    const contentType = requestBody.contentType || requestBody.type;
    const contentId = requestBody.contentId || requestBody.data?.id || requestBody.id;

    if (!contentType) {
      console.error("Missing contentType/type field in request body:", requestBody);
      return NextResponse.json(
        {
          message: "Missing content type",
          error: "Request body must include either 'contentType' or 'type' field",
          receivedBody: requestBody
        },
        { status: 400 }
      );
    }

    try {
      console.log(
        `Revalidating content: ${contentType}${contentId ? ` (ID: ${contentId})` : ""
        }`
      );

      // Revalidate specific content type tags
      revalidateTag("wordpress", { expire: 0 });

      // Handle test webhooks
      if (contentType === "test") {
        console.log("Test webhook received successfully");
        return NextResponse.json({
          revalidated: false,
          message: "Test webhook received successfully",
          data: requestBody.data,
          timestamp: new Date().toISOString(),
        });
      }

      // Handle full revalidation (from manual button)
      if (contentType === "all") {
        revalidateTag("wordpress", { expire: 0 });
        revalidateTag("posts", { expire: 0 });
        revalidateTag("pages", { expire: 0 });
        revalidateTag("portfolio", { expire: 0 });
        revalidateTag("site-options", { expire: 0 });
        revalidatePath("/", "layout");
      }

      if (contentType === "post") {
        revalidateTag("posts", { expire: 0 });
        if (contentId) {
          revalidateTag(`post-${contentId}`, { expire: 0 });
        }
        // Clear all post pages when any post changes
        revalidateTag("posts-page-1", { expire: 0 });
        revalidatePath("/posts", "page");
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
        // Clear portfolio archive index
        revalidateTag("portfolio-page-1", { expire: 0 });
        revalidatePath("/portfolio", "page");
      } else if (contentType === "category") {
        revalidateTag("categories", { expire: 0 });
        if (contentId) {
          revalidateTag(`posts-category-${contentId}`, { expire: 0 });
          revalidateTag(`category-${contentId}`, { expire: 0 });
        }
        revalidatePath("/posts", "page");
      } else if (contentType === "portfolio") {
        revalidateTag("portfolio", { expire: 0 });
        revalidatePath("/portfolio", "page");
      } else if (contentType === "tag") {
        revalidateTag("tags", { expire: 0 });
        if (contentId) {
          revalidateTag(`posts-tag-${contentId}`, { expire: 0 });
          revalidateTag(`tag-${contentId}`, { expire: 0 });
        }
        revalidatePath("/posts", "page");
      } else if (contentType === "author" || contentType === "user") {
        revalidateTag("authors", { expire: 0 });
        if (contentId) {
          revalidateTag(`posts-author-${contentId}`, { expire: 0 });
          revalidateTag(`author-${contentId}`, { expire: 0 });
        }
        revalidatePath("/posts", "page");
      } else if (contentType === "media") {
        // Media changes usually affect everything (featured images, etc.)
        revalidateTag("wordpress", { expire: 0 });
        revalidateTag("site-options", { expire: 0 });
      } else if (contentType === "menu") {
        // Menu changes affect the layout
        revalidateTag("wordpress", { expire: 0 });
      } else if (contentType === "options" || contentType === "site-options") {
        // Revalidate site options (e.g., banner images, social links)
        revalidateTag("site-options", { expire: 0 });
        console.log("Site options revalidated");
      }

      // Always revalidate the entire layout and home page for safety when content changes
      revalidatePath("/", "layout");
      revalidatePath("/", "page");

      return NextResponse.json({
        revalidated: true,
        message: `Revalidated ${contentType}${contentId ? ` (ID: ${contentId})` : ""
          } and related content`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error revalidating path:", error);
      return NextResponse.json(
        {
          revalidated: false,
          message: "Failed to revalidate site",
          error: (error as Error).message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        message: "Error revalidating content",
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
