"use client"

import Spline from '@splinetool/react-spline'

export function HeroSpline() {
    const handleScroll = () => {
        document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth",
        });
    }

    return (
        <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Spline
                    className="w-full h-full"
                    scene="animations/happy_robot_button.spline"
                    onClick={handleScroll}
                />
            </div>
        </div>
    )
}
