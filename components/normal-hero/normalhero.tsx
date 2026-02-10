import { Mail, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSpline } from "./hero-spline"
import Link from "next/link"

export function NormalHero() {
    return (
        <section className="container mx-auto px-4 pt-16 md:pt-24 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h1 className="text-[42px] leading-[50px] md:text-[72px] font-bold md:leading-[85px]">
                        We&apos;re <span className="bg-[#FF6B7A] text-white px-3 py-1 inline-block">KumoCode</span>, a Web Development
                        Agency Building <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">Digital Excellence</span>
                    </h1>

                    <p className="text-[#393939] text-[16px] md:text-[18px] font-medium leading-[28px] md:leading-[30px] max-w-xl">
                        We craft exceptional web experiences with modern technologies, turning your vision into powerful digital
                        solutions that drive results and delight users.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-7 pt-4">
                        <Button
                            asChild
                            className="bg-[#0B0B0B] text-white hover:bg-black/90 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] gap-2 cursor-pointer"
                        >
                            <Link href="#contact">
                                <Mail className="w-5 h-5" />
                                Get in touch
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="bg-white border-[3px] border-black hover:bg-gray-50 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] gap-2 cursor-pointer"
                        >
                            <Link href="#portfolio">
                                <FolderOpen className="w-5 h-5" />
                                View portfolio
                            </Link>
                        </Button>
                    </div>
                </div>

                <HeroSpline />
            </div>
        </section>
    )
}
