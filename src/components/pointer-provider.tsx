"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface PointerContextType {
  x: number
  y: number
  isPointerDown: boolean
}

const PointerContext = createContext<PointerContextType>({
  x: 0,
  y: 0,
  isPointerDown: false,
})

export const usePointer = () => useContext(PointerContext)

interface PointerProviderProps {
  children: React.ReactNode
}

export function PointerProvider({ children }: PointerProviderProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0, isPointerDown: false })

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPointer(prev => ({ ...prev, x: e.clientX, y: e.clientY }))
    }

    const handlePointerDown = () => {
      setPointer(prev => ({ ...prev, isPointerDown: true }))
    }

    const handlePointerUp = () => {
      setPointer(prev => ({ ...prev, isPointerDown: false }))
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("pointerup", handlePointerUp)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [])

  return (
    <PointerContext.Provider value={pointer}>
      {children}
    </PointerContext.Provider>
  )
}
