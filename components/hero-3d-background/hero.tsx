import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Hero3DBackground } from "./hero-3d-background"

export function Hero() {
    return (
        <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden bg-background">
            <Hero3DBackground />

            {/* Grid background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
                    {/* Main heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
                        {"Building the web."}
                        <br />
                        <span className="text-foreground/80">{"One pixel at a time."}</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed">
                        {
                            "We craft exceptional digital experiences that transform businesses. From concept to launch, we build modern, performant websites that drive results."
                        }
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button size="lg" className="text-base group">
                            {"Get Started"}
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button size="lg" variant="outline" className="text-base bg-transparent">
                            {"View Our Work"}
                        </Button>
                    </div>

                    {/* Stats or social proof */}
                    <div className="grid grid-cols-3 gap-8 md:gap-16 mt-16 pt-16 border-t border-border/50 w-full max-w-3xl">
                        <div className="flex flex-col items-center">
                            <p className="text-3xl md:text-4xl font-bold">{"150+"}</p>
                            <p className="text-sm text-muted-foreground mt-1">{"Projects Delivered"}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-3xl md:text-4xl font-bold">{"98%"}</p>
                            <p className="text-sm text-muted-foreground mt-1">{"Client Satisfaction"}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-3xl md:text-4xl font-bold">{"24/7"}</p>
                            <p className="text-sm text-muted-foreground mt-1">{"Support Available"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
    )
}
