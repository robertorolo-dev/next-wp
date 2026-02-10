"use client"

import dynamic from "next/dynamic"

export const HeroSplineClient = dynamic(() => import("./hero-spline").then(mod => mod.HeroSpline), {
    ssr: false,
    loading: () => (
        <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse" />
        </div>
    )
})
