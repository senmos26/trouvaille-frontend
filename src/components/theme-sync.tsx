"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export default function ThemeSync() {
    const { theme } = useTheme()

    useEffect(() => {
        if (theme) {
            // Set a cookie that expires in 1 year
            document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`
        }
    }, [theme])

    return null
}
