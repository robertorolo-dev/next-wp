"use client"

import { useState } from "react"
import Image from "next/image"
import { HeroSplineClient } from "./hero-spline-client"

/**
 * Facade pattern: Show a static preview, load interactive Spline on user interaction
 * This dramatically improves Lighthouse score while keeping the animation
 */
export function SplineFacade() {
    const [isActivated, setIsActivated] = useState(false)
    const [showPlaceholder, setShowPlaceholder] = useState(true)

    const handleActivate = () => {
        setIsActivated(true)
        // Keep placeholder visible briefly while Spline loads, then fade out
        setTimeout(() => setShowPlaceholder(false), 800)
    }

    if (isActivated) {
        return (
            <div className="relative">
                {/* Placeholder fading out */}
                {showPlaceholder && (
                    <div className="absolute inset-0 z-10 animate-[fadeOut_0.6s_ease-out_forwards]">
                        <div className="flex justify-center md:justify-end">
                            <div className="relative w-full max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FDB927] to-[#FFA500]">
                                    <Image
                                        src="/robotplaceholder.png"
                                        alt="Loading animation"
                                        width={400}
                                        height={400}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Spline fading in */}
                <div className="animate-[fadeIn_0.8s_ease-in_forwards] opacity-0">
                    <HeroSplineClient />
                </div>
            </div>
        )
    }

    return (
        <div
            className="flex justify-center md:justify-end cursor-pointer group"
            onClick={handleActivate}
            role="button"
            tabIndex={0}
            aria-label="Load interactive 3D animation"
        >
            <div className="relative w-full max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-[-4px]">
                {/* Static preview with robot image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FDB927] to-[#FFA500]">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Robot image */}
                        <Image
                            src="/robotplaceholder.png"
                            alt="Interactive robot animation preview"
                            width={400}
                            height={400}
                            className="object-contain"
                            priority
                        />

                        {/* Interaction hint - always visible on mobile, shows on hover for desktop */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-full px-6 py-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-xs font-medium text-white whitespace-nowrap">Click to wake</p>
                        </div>
                    </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>
        </div>
    )
}
