"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Database, Lock, Terminal } from "lucide-react"

export default function PolitiqueConfidentialite() {
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
                        Politique de <span className="text-[#FFD700]">Confidentialité</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-gray-500 font-light max-w-2xl leading-relaxed"
                    >
                        Votre vie privée est au centre de nos préoccupations. Nous nous engageons à protéger vos données personnelles avec la plus grande rigueur.
                    </motion.p>
                </header>

                {/* Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-12"
                >
                    {/* Section 1: Collecte */}
                    <motion.section variants={itemVariants} className="group border-t border-gray-100 dark:border-white/5 pt-12">
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-[#FFD700]">
                                <Database size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Collecte des données</h2>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400 font-light leading-relaxed text-justify">
                                    <p>
                                        Nous collections les informations que vous nous fournissez directement lors de votre inscription, de la participation à nos événements ou de l&apos;utilisation de nos services (nom, prénom, adresse e-mail, téléphone).
                                    </p>
                                    <p>
                                        Certaines données sont également collectées automatiquement lors de votre navigation (adresse IP, type de navigateur, pages consultées) afin d&apos;optimiser nos services.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 2: Utilisation */}
                    <motion.section variants={itemVariants} className="group border-t border-gray-100 dark:border-white/5 pt-12">
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-[#FFD700]">
                                <Eye size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Utilisation des données</h2>
                                <p className="mb-4 font-bold text-[#0A1128] dark:text-white">Vos données sont utilisées pour :</p>
                                <ul className="space-y-3 text-gray-600 dark:text-gray-400 font-light list-disc pl-5">
                                    <li>Gérer vos inscriptions aux événements et formations.</li>
                                    <li>Améliorer l&apos;expérience utilisateur sur notre plateforme.</li>
                                    <li>Vous envoyer des communications relatives à nos activités (si vous y avez consenti).</li>
                                    <li>Assurer la sécurité de nos systèmes et prévenir la fraude.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3: Vos Droits */}
                    <motion.section variants={itemVariants} className="group border-t border-gray-100 dark:border-white/5 pt-12">
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-[#FFD700]">
                                <Shield size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Vos Droits (RGPD / CNDP)</h2>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                                    <p>
                                        Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;opposition aux informations vous concernant.
                                    </p>
                                    <p>
                                        Pour exercer ces droits, vous pouvez nous contacter à tout moment à l&apos;adresse suivante : <span className="text-[#FFD700] font-bold">club.latrouvaille@gmail.com</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 4: Sécurité */}
                    <motion.section variants={itemVariants} className="group border-t border-gray-100 dark:border-white/5 pt-12">
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-[#FFD700]">
                                <Lock size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Sécurité des données</h2>
                                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-justify">
                                    Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction. Nos serveurs sont situés dans des datacenters sécurisés et nous utilisons des protocoles de chiffrement (SSL/TLS) pour tous les transferts de données.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 5: Cookies */}
                    <motion.section variants={itemVariants} className="group border-t border-gray-100 dark:border-white/5 pt-12">
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-[#FFD700]">
                                <Terminal size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Gestion des Cookies</h2>
                                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-justify">
                                    Notre site utilise des cookies techniques et analytiques. Vous pouvez à tout moment modifier vos préférences via le bandeau de consentement situé en bas de votre écran ou via les réglages de votre navigateur.
                                </p>
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
            <div className="fixed top-0 left-0 w-1/3 h-screen bg-gradient-to-r from-gray-50/50 dark:from-white/[0.02] to-transparent pointer-events-none -z-10" />
        </div>
    )
}
