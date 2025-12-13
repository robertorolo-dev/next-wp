import { Code2, Smartphone, Palette, Rocket, Search, Wrench } from "lucide-react"

export function ServicesSection() {
    const services = [
        {
            title: "Web Development",
            description:
                "Custom websites and web applications built with modern frameworks like Next.js, React, and Node.js for optimal performance.",
            icon: Code2,
            color: "bg-[#2F81F7]",
        },
        {
            title: "Mobile Development",
            description:
                "Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android devices.",
            icon: Smartphone,
            color: "bg-[#FF6B7A]",
        },
        {
            title: "UI/UX Design",
            description:
                "Beautiful, intuitive interfaces designed with user experience at the forefront, ensuring engagement and conversion.",
            icon: Palette,
            color: "bg-[#FDB927]",
        },
        {
            title: "E-commerce Solutions",
            description:
                "Scalable online stores with seamless checkout experiences, inventory management, and payment integrations.",
            icon: Rocket,
            color: "bg-[#10B981]",
        },
        {
            title: "SEO & Marketing",
            description:
                "Search engine optimization and digital marketing strategies to increase your visibility and reach your audience.",
            icon: Search,
            color: "bg-[#8B5CF6]",
        },
        {
            title: "Maintenance & Support",
            description:
                "Ongoing technical support, updates, and maintenance to keep your digital products running smoothly and securely.",
            icon: Wrench,
            color: "bg-[#F59E0B]",
        },
    ]

    return (
        <section id="services" className=" py-16 md:py-24">
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
                            return (
                                <div
                                    key={index}
                                    className="bg-white border-[3px] border-black rounded-[32px] overflow-hidden hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 min-h-[320px] flex flex-col group"
                                >
                                    <div className={`${service.color} p-8 flex items-center justify-center`}>
                                        <Icon className="w-20 h-20 text-white" strokeWidth={2} />
                                    </div>
                                    <div className="px-8 py-8 flex-1 flex flex-col">
                                        <h3 className="text-[28px] leading-[40px] font-bold mb-3 text-[#0B0B0B]">{service.title}</h3>
                                        <p className="text-[18px] leading-[30px] font-medium text-[#393939]">{service.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
