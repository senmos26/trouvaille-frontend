"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X, ShieldCheck, Settings } from "lucide-react"

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent")
        if (!consent) {
            // Delay appearance for a better UX
            const timer = setTimeout(() => setIsVisible(true), 2000)
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
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[200]"
                >
                    <div className="relative overflow-hidden bg-white/80 dark:bg-[#0A1128]/90 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-8">
                        {/* Background Accent */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FFD700]/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-[#FFD700]/20 text-[#FFD700] rounded-2xl">
                                    <Cookie size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#0A1128] dark:text-white uppercase tracking-tight">
                                        Expérience Personnalisée
                                    </h3>
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mt-1">
                                        Gestion des Archives
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="ml-auto text-gray-400 hover:text-[#0A1128] dark:hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                Pour sublimer votre navigation dans l&apos;univers de <span className="text-[#FFD700] font-bold">La Trouvaille</span>, nous utilisons des cookies. Ils nous permettent d&apos;analyser l&apos;audience et de vous offrir une expérience plus fluide.
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-4 rounded-xl border border-gray-200 dark:border-white/10 text-[#0A1128] dark:text-white text-xs font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                                >
                                    Refuser
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-4 rounded-xl bg-[#FFD700] text-[#0A1128] text-xs font-black uppercase tracking-widest shadow-lg shadow-[#FFD700]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck size={16} />
                                    Accepter
                                </button>
                            </div>

                            <button className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#FFD700] transition-colors flex items-center justify-center gap-2">
                                <Settings size={12} />
                                Préférences Avancées
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
