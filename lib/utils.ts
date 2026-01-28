import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripHtml(html: string) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&hellip;/g, "...") // Replace ellipsis entity
    .replace(/\[&hellip;\]/g, "...") // Replace WordPress bracketed ellipsis
    .replace(/&nbsp;/g, " ") // Replace non-breaking space
    .replace(/&amp;/g, "&") // Replace ampersand
    .replace(/&lt;/g, "<") // Replace less than
    .replace(/&gt;/g, ">") // Replace greater than
    .replace(/&quot;/g, '"') // Replace double quote
    .replace(/&#039;/g, "'") // Replace single quote
    .trim();
}
