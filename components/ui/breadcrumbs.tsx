"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
    active?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("flex items-center flex-wrap gap-2 text-sm", className)}
        >
            <Link
                href="/"
                className="flex items-center justify-center w-8 h-8 rounded-lg border-2 border-black bg-white hover:bg-[#FFC224] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
            </Link>

            {items.map((item, index) => (
                <div key={item.label} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    {item.href && !item.active ? (
                        <Link
                            href={item.href}
                            className="px-3 py-1 rounded-lg border-2 border-black bg-white text-xs font-bold uppercase tracking-widest hover:bg-[#6366F1] hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span
                            className={cn(
                                "px-3 py-1 rounded-lg border-2 border-black bg-gray-100 text-xs font-black uppercase tracking-widest",
                                item.active && "bg-[#FFC224]"
                            )}
                        >
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
