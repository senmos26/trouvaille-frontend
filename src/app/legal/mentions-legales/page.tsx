"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Scale, User, MapPin, Globe } from "lucide-react"

export default function MentionsLegales() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-white pt-32 pb-20 selection:bg-[#FFD700] selection:text-[#0A1128]">
            <div className="max-w-4xl mx-auto px-6">

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#FFD700] transition-colors"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Retour à l&apos;accueil
                    </Link>
                </motion.div>

                {/* Header */}
                <header className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-serif italic text-[#0A1128] dark:text-white mb-6"
                    >
                        Mentions <span className="text-[#FFD700]">Légales</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-gray-500 font-light max-w-2xl leading-relaxed"
                    >
                        Conformément aux dispositions de la loi, nous mettons à votre disposition l&apos;ensemble des informations relatives à l&apos;édition et à l&apos;hébergement de notre plateforme.
                    </motion.p>
                </header>

                {/* Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-12"
                >
                    {/* Section 1: Éditeur */}
                    <motion.section variants={itemVariants} className="group border-t border-gray-100 dark:border-white/5 pt-12">
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-[#FFD700]">
                                <User size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Éditeur de la plateforme</h2>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Dénomination :</span> La Trouvaille S.A.R.L</p>
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Siège Social :</span> Casablanca, Maroc</p>
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Capital social :</span> 100 000 MAD</p>
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Registre du Commerce :</span> RC 456789 - Casablanca</p>
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Directeur de la publication :</span> Mme. Fatoumata Diarra</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 2: Hébergement */}
                    <motion.section variants={itemVariants} className="group border-t border-gray-100 dark:border-white/5 pt-12">
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-[#FFD700]">
                                <Globe size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Hébergement</h2>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Prestataire :</span> Vercel Inc.</p>
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Adresse :</span> 440 N Barranca Ave #4133 Covina, CA 91723</p>
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Site Web :</span> https://vercel.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3: Propriété Intellectuelle */}
                    <motion.section variants={itemVariants} className="group border-t border-gray-100 dark:border-white/5 pt-12">
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-[#FFD700]">
                                <Scale size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Propriété Intellectuelle</h2>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400 font-light leading-relaxed text-justify">
                                    <p>
                                        L&apos;ensemble de cette plateforme relève de la législation internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                                    </p>
                                    <p>
                                        La reproduction de tout ou partie de ce site sur un support électronique quel qu&apos;il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 4: Contact */}
                    <motion.section variants={itemVariants} className="group border-t border-gray-100 dark:border-white/5 pt-12">
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-[#FFD700]">
                                <MapPin size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Contact</h2>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Email :</span> club.latrouvaille@gmail.com</p>
                                    <p><span className="font-bold text-[#0A1128] dark:text-white">Téléphone :</span> +212 600 850 149</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                </motion.div>

                {/* Footer legal */}
                <footer className="mt-32 pt-12 border-t border-gray-100 dark:border-white/5 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                        Dernière mise à jour : Janvier 2026 • La Trouvaille ©
                    </p>
                </footer>

            </div>

            {/* Decorative elements */}
            <div className="fixed top-0 right-0 w-1/3 h-screen bg-gradient-to-l from-gray-50/50 dark:from-white/[0.02] to-transparent pointer-events-none -z-10" />
        </div>
    )
}
