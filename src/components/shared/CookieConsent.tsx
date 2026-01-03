"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Settings, ArrowRight } from "lucide-react"

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent")
        if (!consent) {
            // Delay appearance for a better UX
            const timer = setTimeout(() => setIsVisible(true), 2500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted")
        setIsVisible(false)
    }

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined")
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 100, opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="fixed bottom-4 left-4 right-4 md:bottom-6 md:right-8 md:left-auto md:max-w-[440px] z-[200]"
                >
                    <div className="relative overflow-hidden bg-white/90 dark:bg-[#0A1128]/95 backdrop-blur-2xl border border-gray-100 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-6 md:p-10">

                        {/* Ambient Glow */}
                        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#FFD700] opacity-[0.08] blur-[60px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6 md:mb-8">
                                <div className="flex items-center gap-3 md:gap-4">

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black text-[#0A1128] dark:text-white uppercase tracking-tighter leading-none">
                                            Confiance
                                        </h3>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFD700]">Digital Privacy</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="p-2 text-gray-400 hover:text-[#0A1128] dark:hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-3 mb-8 md:space-y-4 md:mb-10">
                                <p className="text-sm md:text-base text-[#0A1128] dark:text-white/90 font-bold leading-tight">
                                    Sublimons ensemble votre navigation.
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Nous utilisons des technologies de suivi pour personnaliser votre expérience sur <span className="text-[#0A1128] dark:text-white font-black underline decoration-[#FFD700] decoration-2 underline-offset-4">La Trouvaille</span>.
                                </p>
                            </div>

                            {/* Legal Links - Styled as mini chips */}
                            <div className="flex flex-wrap gap-2 mb-8 md:gap-3 md:mb-10 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                                <Link href="/legal/politique-confidentialite" className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-[#FFD700] hover:text-[#0A1128] transition-all">
                                    Confidentialité
                                </Link>
                                <Link href="/legal/mentions-legales" className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-[#FFD700] hover:text-[#0A1128] transition-all">
                                    Mentions Légales
                                </Link>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                                <button
                                    onClick={handleDecline}
                                    className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#0A1128] dark:hover:text-white transition-colors order-2 sm:order-1"
                                >
                                    Refuser
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="w-full sm:flex-1 bg-[#0A1128] dark:bg-[#FFD700] text-white dark:text-[#0A1128] px-6 py-4 md:px-8 md:py-5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#0A1128]/10 dark:shadow-[#FFD700]/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group order-1 sm:order-2"
                                >
                                    Accepter
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform md:w-4 md:h-4" />
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-center gap-4">
                                <button className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 hover:text-[#FFD700] transition-colors flex items-center gap-2">
                                    <Settings size={12} />
                                    Personnaliser mes choix
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
