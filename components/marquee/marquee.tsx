export function LogoMarquee() {
  const items = [
    { logo: "/logos/application.svg", alt: "React" },
    { logo: "/logos/business.svg", alt: "Next.js" },
    { logo: "/logos/company.svg", alt: "TypeScript" },
    { logo: "/logos/startup.svg", alt: "Node.js" },
    { logo: "/logos/venture.svg", alt: "Tailwind" },
    { logo: "/logos/agency.svg", alt: "Vercel" },
  ]

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-hidden bg-black py-16">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <img key={index} src={item.logo || "/placeholder.svg"} alt={item.alt} className="h-12 w-auto" />
          ))}
        </div>
      </div>
    </div>
  )
}