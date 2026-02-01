import { Facebook, Twitter, Linkedin, Instagram, Youtube, Github, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

const platformIcons: Record<string, any> = {
    facebook: Facebook,
    twitter: Twitter,
    x: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube,
    github: Github,
};

interface SocialFollowProps {
    links?: Array<{
        platform: string;
        url: string;
    }>;
    className?: string;
}

export function SocialFollow({ links, className }: SocialFollowProps) {
    // Check if links exist and have at least one valid link
    const hasLinks = Array.isArray(links) && links.length > 0 && links[0].url;

    const displayLinks = hasLinks ? links : [
        { platform: "Instagram", url: "https://instagram.com" },
        { platform: "Facebook", url: "https://facebook.com" },
        { platform: "LinkedIn", url: "https://linkedin.com" },
    ];

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex flex-wrap gap-3">
                {displayLinks.map((link, idx) => {
                    // Trim accidental spaces and handle case sensitivity
                    const platformName = (link.platform || "").trim().toLowerCase();
                    const cleanUrl = (link.url || "").trim();
                    const Icon = platformIcons[platformName] || Link2;

                    return (
                        <a
                            key={idx}
                            href={cleanUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-black hover:text-white"
                            title={`Follow us on ${link.platform}`}
                        >
                            <Icon className="w-5 h-5" />
                        </a>
                    );
                })}
            </div>
            {!hasLinks && (
                <p className="text-[10px] text-gray-400 italic">
                    (Showing placeholders. Add your social links in WordPress Site Options to update these.)
                </p>
            )}
        </div>
    );
}
