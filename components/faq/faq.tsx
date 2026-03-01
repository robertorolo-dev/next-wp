"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { faqs } from "./faq-data"

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-[3px] border-black rounded-2xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={open}
            >
                <span className="text-[16px] md:text-[18px] font-bold text-[#0B0B0B] pr-4">{question}</span>
                <ChevronDown
                    className={cn(
                        "w-6 h-6 flex-shrink-0 text-[#2F81F7] transition-transform duration-300",
                        open && "rotate-180"
                    )}
                />
            </button>
            {open && (
                <div className="px-6 pb-5 bg-white border-t-[3px] border-black">
                    <p className="text-[15px] md:text-[16px] leading-[26px] font-medium text-[#393939] pt-4">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    )
}

export function FaqSection({ schema }: { schema: object }) {
    return (
        <section className="py-12 md:py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4">
                            Frequently asked{" "}
                            <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">questions</span>
                        </h2>
                        <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl mx-auto">
                            Everything you need to know about working with Kumocode, South Africa&apos;s
                            web development agency.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {faqs.map((faq, index) => (
                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
