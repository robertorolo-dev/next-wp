import Image from "next/image";
import { getSiteOptions } from "@/lib/wordpress";

export async function LogoMarquee() {
  const siteOptions = await getSiteOptions();
  const bannerImages = siteOptions?.banner_images || [];

  // Fallback placeholder images if no banner images are available
  const items = bannerImages.length > 0
    ? bannerImages
    : [
      { ID: 1, url: "/logos/application.svg", alt: "React", width: 200, height: 48 },
      { ID: 2, url: "/logos/business.svg", alt: "Next.js", width: 200, height: 48 },
      { ID: 3, url: "/logos/company.svg", alt: "TypeScript", width: 200, height: 48 },
      { ID: 4, url: "/logos/startup.svg", alt: "Node.js", width: 200, height: 48 },
      { ID: 5, url: "/logos/venture.svg", alt: "Tailwind", width: 200, height: 48 },
      { ID: 6, url: "/logos/agency.svg", alt: "Vercel", width: 200, height: 48 },
    ];

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-hidden bg-black py-16">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <Image
              key={`${item.ID}-${index}`}
              src={item.url || "/placeholder.svg"}
              alt={item.alt || item.title || "Banner image"}
              width={item.width || 200}
              height={item.height || 48}
              className="h-12 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}