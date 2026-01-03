"use client";

import React, { useState, useEffect, useRef } from "react";

interface ParallaxLayoutProps {
    children: React.ReactNode;
    footer: React.ReactNode;
}

export default function ParallaxLayout({ children, footer }: ParallaxLayoutProps) {
    const [footerHeight, setFooterHeight] = useState(0);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Observer pour ajuster la hauteur si la fenêtre change de taille
        if (!footerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setFooterHeight(entry.contentRect.height);
            }
        });

        observer.observe(footerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative w-full">
            {/* 
        1. LE CONTENU PRINCIPAL 
        - z-index élevé (10) pour être DEVANT le footer.
        - margin-bottom égal à la hauteur du footer pour permettre de scroller jusqu'au bout.
        - Une ombre portée (shadow) aide à détacher visuellement le contenu du footer.
      */}
            <div
                className="relative z-10 w-full bg-white dark:bg-[#050A15] shadow-2xl"
                style={{ marginBottom: `${footerHeight}px` }}
            >
                {children}
            </div>

            {/* 
        2. LE FOOTER
        - position: fixed (reste collé à l'écran).
        - bottom: 0.
        - z-index bas (0) pour être DERRIÈRE le contenu.
        - Hauteur exacte pour remplir l'écran sous la navbar
      */}
            <div
                ref={footerRef}
                className="fixed bottom-0 left-0 w-full z-0 h-[calc(100vh-64px)]"
            >
                {footer}
            </div>
        </div>
    );
}