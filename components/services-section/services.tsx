import { Hammer, ShoppingBag, Palette, Search, Wrench, Binary, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
    const services = [
        {
            title: "WordPress Development",
            description:
                "Custom WordPress websites, WooCommerce stores, speed optimisation, and ongoing maintenance. Built for South African businesses.",
            icon: Hammer,
            color: "bg-[#2F81F7]",
            href: "/wordpress-development",
        },
        {
            title: "Shopify Development",
            description:
                "Shopify store setup, custom themes, PayFast integration, and conversion rate optimisation for SA e-commerce stores.",
            icon: ShoppingBag,
            color: "bg-[#10B981]",
            href: "/shopify-development",
        },
        {
            title: "Software Development",
            description:
                "Custom software development services to create tailored solutions for your business needs.",
            icon: Binary,
            color: "bg-[#FF6B7A]",
            href: null,
        },
        {
            title: "UI/UX Design",
            description:
                "Beautiful, intuitive interfaces designed with user experience at the forefront, ensuring engagement and conversion.",
            icon: Palette,
            color: "bg-[#FDB927]",
            href: null,
        },
        {
            title: "SEO & Marketing",
            description:
                "Search engine optimization and digital marketing strategies to increase your visibility and reach your audience.",
            icon: Search,
            color: "bg-[#8B5CF6]",
            href: null,
        },
        {
            title: "Maintenance & Support",
            description:
                "Ongoing technical support, updates, and maintenance to keep your digital products running smoothly and securely.",
            icon: Wrench,
            color: "bg-[#F59E0B]",
            href: null,
        },
    ]

    return (
        <section id="services" className="py-12 md:py-16 scroll-mt-24">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4">
                            Our <span className="bg-[#FF4A60] text-white px-3 py-1 inline-block">development services</span>
                        </h2>
                        <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl mx-auto">
                            From concept to launch and beyond, we provide comprehensive web development services to bring your digital
                            vision to life.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            const card = (
                                <div
                                    className={`bg-white border-[3px] border-black rounded-[32px] overflow-hidden hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 min-h-[320px] flex flex-col group ${service.href ? "cursor-pointer" : ""}`}
                                >
                                    <div className={`${service.color} p-8 flex items-center justify-center`}>
                                        <Icon className="w-20 h-20 text-white" strokeWidth={2} />
                                    </div>
                                    <div className="px-8 py-8 flex-1 flex flex-col">
                                        <h3 className="text-[28px] leading-[40px] font-bold mb-3 text-[#0B0B0B]">{service.title}</h3>
                                        <p className="text-[18px] leading-[30px] font-medium text-[#393939] flex-1">{service.description}</p>
                                        {service.href && (
                                            <span className="mt-4 flex items-center gap-2 font-bold text-[#0B0B0B] group-hover:gap-3 transition-all">
                                                Learn More <ArrowRight size={18} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                            return service.href ? (
                                <Link key={index} href={service.href}>
                                    {card}
                                </Link>
                            ) : (
                                <div key={index}>{card}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
