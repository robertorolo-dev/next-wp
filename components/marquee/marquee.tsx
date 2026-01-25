import Image from "next/image";
import { getSiteOptions } from "@/lib/wordpress";

export async function LogoMarquee() {
  const siteOptions = await getSiteOptions();
  const bannerImages = siteOptions?.banner_images || [];

  // Fallback placeholder images if no banner images are available
  const items = bannerImages.length > 0
    ? bannerImages
    : [
      { ID: 1, url: "/logos/application.svg", alt: "React", title: "React", width: 200, height: 48 },
      { ID: 2, url: "/logos/business.svg", alt: "Next.js", title: "Next.js", width: 200, height: 48 },
      { ID: 3, url: "/logos/company.svg", alt: "TypeScript", title: "TypeScript", width: 200, height: 48 },
      { ID: 4, url: "/logos/startup.svg", alt: "Node.js", title: "Node.js", width: 200, height: 48 },
      { ID: 5, url: "/logos/venture.svg", alt: "Tailwind", title: "Tailwind", width: 200, height: 48 },
      { ID: 6, url: "/logos/agency.svg", alt: "Vercel", title: "Vercel", width: 200, height: 48 },
    ];

  return (
    <div className="overflow-hidden bg-black py-16">
      <div className="relative flex">
        <div className="flex animate-marquee shrink-0">
          {/* Render 4 identical sets to ensure enough content for wide screens */}
          {[0, 1, 2, 3].map((setIndex) => (
            <div key={setIndex} className="flex items-center gap-16 pr-16 shrink-0">
              {items.map((item, index) => (
                <Image
                  key={`set${setIndex}-${item.ID}-${index}`}
                  src={item.url || "/placeholder.svg"}
                  alt={item.alt || item.title || "Banner image"}
                  width={item.width || 200}
                  height={item.height || 48}
                  className="h-12 w-auto object-contain"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}