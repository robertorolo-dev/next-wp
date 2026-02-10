"use client";

import { useEffect, useCallback } from "react";

/**
 * TableEnhancer automatically finds tables and adds data-label attributes to cells
 * based on their corresponding header text. This allows for responsive mobile
 * card layouts that display headings using CSS content: attr(data-label).
 */
export function TableEnhancer() {
    const processTable = useCallback((table: HTMLTableElement) => {
        if (table.hasAttribute("data-enhanced")) return;

        // Get headers from the first row or thead
        const headers: string[] = [];

        // Check for th elements
        table.querySelectorAll("th").forEach((th) => {
            headers.push(th.textContent?.trim() || "");
        });

        // If no th found, maybe the first row has td used as headers
        if (headers.length === 0) {
            const firstRow = table.querySelector("tr");
            firstRow?.querySelectorAll("td").forEach((td) => {
                headers.push(td.textContent?.trim() || "");
            });
        }

        // Apply headers to all data cells
        table.querySelectorAll("tr").forEach((row) => {
            row.querySelectorAll("td").forEach((td, i) => {
                if (headers[i] && !td.hasAttribute("data-label")) {
                    td.setAttribute("data-label", headers[i]);
                }
            });
        });

        table.setAttribute("data-enhanced", "true");
    }, []);

    useEffect(() => {
        // Run once on mount for existing tables
        document.querySelectorAll("table").forEach((table) => {
            processTable(table as HTMLTableElement);
        });

        // Use MutationObserver for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof HTMLElement) {
                        if (node.tagName === "TABLE") {
                            processTable(node as HTMLTableElement);
                        } else {
                            node.querySelectorAll("table").forEach((table) => {
                                processTable(table as HTMLTableElement);
                            });
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, [processTable]);

    return null;
}
