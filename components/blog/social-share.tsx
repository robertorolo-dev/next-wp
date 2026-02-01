"use client";

import { Facebook, Twitter, Linkedin, Link2, Send, Instagram } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SocialShareProps {
    url: string;
    title: string;
    className?: string;
}

export function SocialShare({ url, title, className }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const encodeTitle = encodeURIComponent(title);
    const encodeUrl = encodeURIComponent(url);

    const shareLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`,
            color: "hover:bg-[#1877F2]",
        },
        {
            name: "X (Twitter)",
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodeUrl}&text=${encodeTitle}`,
            color: "hover:bg-black",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeUrl}`,
            color: "hover:bg-[#0A66C2]",
        },
        {
            name: "Instagram",
            icon: Instagram,
            href: "#",
            color: "hover:bg-[#E4405F]",
            action: "copy",
        },
    ];

    const copyToClipboard = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className={cn("flex flex-wrap gap-3", className)}>
            {shareLinks.map((share) => (
                <a
                    key={share.name}
                    href={share.href}
                    onClick={share.action === "copy" ? copyToClipboard : undefined}
                    target={share.action === "copy" ? undefined : "_blank"}
                    rel={share.action === "copy" ? undefined : "noopener noreferrer"}
                    className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all",
                        share.color,
                        "hover:text-white"
                    )}
                    title={share.action === "copy" ? "Copy link for Instagram" : `Share on ${share.name}`}
                >
                    <share.icon className="w-5 h-5" />
                </a>
            ))}
            <button
                onClick={(e) => copyToClipboard(e)}
                className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all",
                    copied ? "bg-[#FFC224]" : "hover:bg-[#FFC224]"
                )}
                title="Copy Link"
            >
                <Link2 className="w-5 h-5" />
            </button>
            {copied && (
                <span className="text-xs font-bold text-black self-center ml-2 animate-in fade-in slide-in-from-left-2">
                    Copied!
                </span>
            )}
        </div>
    );
}
