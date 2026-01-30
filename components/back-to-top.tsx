"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Calculate how far the user has scrolled
            const scrolled = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            // Percentage of scroll
            const scrollPercent = (scrolled / (scrollHeight - clientHeight)) * 100;

            // Only show if we've scrolled more than 70% of the page
            if (scrollPercent > 70) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <a
            href="#"
            onClick={scrollToTop}
            className={cn(
                "top",
                isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-20 opacity-0 pointer-events-none"
            )}
            aria-label="Back to top"
        >
            Back to Top
        </a>
    );
}
