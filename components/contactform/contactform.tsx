import { Mail, User, MessageSquare } from "lucide-react"
import { ContactFormInner } from "./contact-form-inner"

export function ContactForm() {
    return (
        <section id="contact" className="py-12 md:py-16 scroll-mt-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4">
                            Let&apos;s <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">work together</span>
                        </h2>
                        <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl mx-auto">
                            Have a project in mind? We&apos;d love to hear about it. Fill out the form below and we&apos;ll get back to you
                            within 24 hours.
                        </p>
                    </div>

                    <ContactFormInner />

                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <a
                            href="mailto:hello@kumocode.com"
                            className="bg-[#FFC224] border-[3px] border-black rounded-[24px] p-6 text-center block hover:brightness-90 transition-all cursor-pointer"
                        >
                            <Mail className="w-10 h-10 mx-auto mb-3" />
                            <h3 className="text-[20px] font-bold mb-2">Email Us</h3>
                            <p className="text-[16px] font-medium">Click here to email us</p>
                        </a>

                        <a
                            href="tel:+27823645883"
                            className="bg-[#FF6B7A] border-[3px] border-black rounded-[24px] p-6 text-center text-white block hover:brightness-90 transition-all cursor-pointer"
                        >
                            <User className="w-10 h-10 mx-auto mb-3" />
                            <h3 className="text-[20px] font-bold mb-2">Call Us</h3>
                            <p className="text-[16px] font-medium">Click here to call us</p>
                        </a>

                        <a
                            href="https://wa.me/27823645883?text=Hi%20there!%20I'm%20interested%20in%20discussing%20a%20project%20with%20you."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25d366] border-[3px] border-black rounded-[24px] p-6 text-center text-white block hover:brightness-90 transition-all cursor-pointer"
                        >
                            <MessageSquare className="w-10 h-10 mx-auto mb-3" />
                            <h3 className="text-[20px] font-bold mb-2">Whatsapp Chat</h3>
                            <p className="text-[16px] font-medium">Click to chat on Whatsapp</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
