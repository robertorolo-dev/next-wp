"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"

const HeroSpline = dynamic(() => import("./hero-spline").then(mod => mod.HeroSpline), {
    ssr: false,
    loading: () => (
        <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse" />
        </div>
    )
})

export function HeroSplineClient() {
    const [shouldLoad, setShouldLoad] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Load when element is about to enter viewport (500px before)
                    if (entry.isIntersecting) {
                        setShouldLoad(true)
                        observer.disconnect()
                    }
                })
            },
            {
                rootMargin: "500px", // Start loading 500px before it's visible
            }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef}>
            {shouldLoad ? (
                <HeroSpline />
            ) : (
                <div className="flex justify-center md:justify-end">
                    <div className="relative w-full max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
                </div>
            )}
        </div>
    )
}
