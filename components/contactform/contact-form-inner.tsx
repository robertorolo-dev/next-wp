"use client"

import type React from "react"
import { useState } from "react"
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactFormInner() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [status, setStatus] = useState<FormStatus>('idle')
    const [statusMessage, setStatusMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setStatusMessage('')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus('success')
                setStatusMessage(data.message || 'Thank you for your message! We will get back to you soon.')
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                })
                // Reset status after 5 seconds
                setTimeout(() => {
                    setStatus('idle')
                    setStatusMessage('')
                }, 5000)
            } else {
                setStatus('error')
                setStatusMessage(data.error || 'Failed to send message. Please try again.')
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setStatus('error')
            setStatusMessage('An unexpected error occurred. Please try again later.')
        }
    }

    return (
        <div className="bg-white border-[3px] border-black rounded-[32px] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {/* Status Message */}
            {statusMessage && (
                <div
                    className={`mb-6 p-4 rounded-xl border-[3px] border-black flex items-start gap-3 ${status === 'success'
                        ? 'bg-green-100'
                        : status === 'error'
                            ? 'bg-red-100'
                            : 'bg-blue-100'
                        }`}
                >
                    {status === 'success' && <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />}
                    {status === 'error' && <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />}
                    <p className="text-[16px] font-semibold text-[#0B0B0B]">{statusMessage}</p>
                </div>
            )}

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
                        disabled={status === 'loading'}
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
                        disabled={status === 'loading'}
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
                        disabled={status === 'loading'}
                    />
                </div>

                <Button
                    type="submit"
                    className="bg-[#0B0B0B] text-white hover:bg-black/90 rounded-xl py-6 px-8 text-lg font-semibold h-auto w-full md:w-auto md:min-w-[240px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}
