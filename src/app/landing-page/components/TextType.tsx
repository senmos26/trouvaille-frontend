"use client"

import { useEffect, useMemo, useState } from "react"

type TextTypeProps = {
  text: string[]
  typingSpeed?: number
  pauseDuration?: number
  showCursor?: boolean
  cursorCharacter?: string
  className?: string
}

export default function TextType({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  className,
}: TextTypeProps) {
  const safeText = useMemo(() => (text.length ? text : [""]), [text])

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [typed, setTyped] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = safeText[phraseIndex] ?? ""

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        const next = currentPhrase.slice(0, typed.length + 1)
        setTyped(next)

        if (next === currentPhrase) {
          if (safeText.length > 1) {
            window.setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        }
      } else {
        const next = currentPhrase.slice(0, Math.max(typed.length - 1, 0))
        setTyped(next)

        if (next.length === 0) {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % safeText.length)
        }
      }
    }, isDeleting ? Math.max(typingSpeed * 0.6, 20) : typingSpeed)

    return () => window.clearTimeout(timeout)
  }, [isDeleting, pauseDuration, phraseIndex, safeText, typed, typingSpeed])

  return (
    <span className={className}>
      {typed}
      {showCursor && <span aria-hidden="true">{cursorCharacter}</span>}
    </span>
  )
}
