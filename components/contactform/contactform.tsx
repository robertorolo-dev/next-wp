"use client"

import type React from "react"

import { useState } from "react"
import { Mail, User, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("[v0] Form submitted:", formData)
    }

    return (
        <section id="contact" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4">
                            Let's <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">work together</span>
                        </h2>
                        <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl mx-auto">
                            Have a project in mind? We'd love to hear about it. Fill out the form below and we'll get back to you
                            within 24 hours.
                        </p>
                    </div>

                    <div className="bg-white border-[3px] border-black rounded-[32px] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-[18px] font-bold text-[#0B0B0B] flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Your Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="border-[3px] border-black rounded-xl h-14 text-base px-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[18px] font-bold text-[#0B0B0B] flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="border-[3px] border-black rounded-xl h-14 text-base px-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-[18px] font-bold text-[#0B0B0B] flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Your Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your project..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="border-[3px] border-black rounded-xl min-h-[160px] text-base px-4 py-3 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="bg-[#0B0B0B] text-white hover:bg-black/90 rounded-xl py-6 px-8 text-lg font-semibold h-auto w-full md:w-auto md:min-w-[240px]"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <div className="bg-[#FFC224] border-[3px] border-black rounded-[24px] p-6 text-center">
                            <Mail className="w-10 h-10 mx-auto mb-3" />
                            <h3 className="text-[20px] font-bold mb-2">Email Us</h3>
                            <p className="text-[16px] font-medium">hello@kumocode.com</p>
                        </div>

                        <div className="bg-[#FF6B7A] border-[3px] border-black rounded-[24px] p-6 text-center text-white">
                            <User className="w-10 h-10 mx-auto mb-3" />
                            <h3 className="text-[20px] font-bold mb-2">Call Us</h3>
                            <p className="text-[16px] font-medium">+1 (555) 123-4567</p>
                        </div>

                        <div className="bg-[#2F81F7] border-[3px] border-black rounded-[24px] p-6 text-center text-white">
                            <MessageSquare className="w-10 h-10 mx-auto mb-3" />
                            <h3 className="text-[20px] font-bold mb-2">Live Chat</h3>
                            <p className="text-[16px] font-medium">Available 9am-6pm EST</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
