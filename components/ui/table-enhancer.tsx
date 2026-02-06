"use client";

import { useEffect } from "react";

/**
 * TableEnhancer automatically finds tables and adds data-label attributes to cells
 * based on their corresponding header text. This allows for responsive mobile
 * card layouts that display headings using CSS content: attr(data-label).
 */
export function TableEnhancer() {
    useEffect(() => {
        const processTables = () => {
            document.querySelectorAll("table").forEach((table) => {
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
            });
        };

        // Run once on mount
        processTables();

        // Use MutationObserver to handle content that might be loaded dynamically (like WordPress content)
        const observer = new MutationObserver((mutations) => {
            let shouldProcess = false;
            for (const mutation of mutations) {
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    shouldProcess = true;
                    break;
                }
            }
            if (shouldProcess) {
                processTables();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    return null;
}
