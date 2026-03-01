import { CheckCircle2 } from "lucide-react"

const reasons = [
    {
        title: "South African Expertise",
        description:
            "We understand the local market. From load-shedding resilient architecture to ZAR payment integrations, we build for South African realities.",
    },
    {
        title: "Performance-First Development",
        description:
            "Every site we build is optimised for Google Core Web Vitals — fast load times, smooth interactions, and high Lighthouse scores that directly impact your search rankings.",
    },
    {
        title: "Modern Tech Stack",
        description:
            "We use Next.js, React, and TypeScript — the same tools powering Fortune 500 companies — so your website is fast, scalable, and future-proof.",
    },
    {
        title: "SEO Built In From Day One",
        description:
            "We don't bolt on SEO as an afterthought. Structured data, semantic HTML, canonical tags, and sitemap generation are part of every project we deliver.",
    },
    {
        title: "End-to-End Digital Solutions",
        description:
            "From custom web applications and e-commerce stores to software development and UI/UX design, we cover the full digital product lifecycle for your business.",
    },
    {
        title: "Transparent Communication",
        description:
            "No agency jargon, no disappearing acts. You get direct access to the developers building your product, with regular updates and honest timelines.",
    },
]

export function WhyKumocode() {
    return (
        <section className="py-12 md:py-16 bg-[#F9F9F9]">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                        {/* Left: heading + intro text */}
                        <div>
                            <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-6">
                                Why South African businesses{" "}
                                <span className="bg-[#FDB927] text-black px-3 py-1 inline-block">
                                    choose Kumocode
                                </span>
                            </h2>
                            <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px]">
                                Kumocode is a web development agency based in South Africa, specialising in
                                high-performance websites, custom web applications, and e-commerce solutions.
                                We help businesses of all sizes — from local startups to established enterprises
                                — build a powerful online presence that drives real growth.
                            </p>
                            <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px] mt-4">
                                Whether you need a brand-new website, a custom software solution, or a complete
                                digital overhaul, our team delivers clean code, beautiful design, and measurable
                                results.
                            </p>
                        </div>

                        {/* Right: reasons grid */}
                        <div className="grid sm:grid-cols-2 gap-5">
                            {reasons.map((reason, index) => (
                                <div
                                    key={index}
                                    className="bg-white border-[3px] border-black rounded-2xl p-5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                                >
                                    <CheckCircle2 className="w-7 h-7 text-[#2F81F7] mb-3 flex-shrink-0" />
                                    <h3 className="text-[17px] font-bold mb-2 text-[#0B0B0B]">{reason.title}</h3>
                                    <p className="text-[14px] leading-[22px] font-medium text-[#393939]">
                                        {reason.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
