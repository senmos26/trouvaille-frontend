"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      className="w-full bg-white font-sans md:px-10"
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 bg-[#0A1128]/5 text-[#0A1128] rounded-full text-sm font-semibold mb-4">
            Notre parcours
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[#0A1128] md:text-4xl lg:text-5xl">
            Les étapes clés de La Trouvaille
          </h2>
          <p className="max-w-2xl mx-auto text-base text-neutral-600 md:text-lg leading-relaxed">
            Chaque année marque une nouvelle progression. Voici les jalons qui ont façonné notre mouvement et renforcé notre impact sur le continent africain.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md md:left-3">
                <div className="h-4 w-4 rounded-full border-2 border-[#FFD700] bg-[#FFD700] p-2" />
              </div>
              <h3 className="hidden text-xl font-bold text-[#0A1128] md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-[#0A1128] md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[#FFD700] from-[0%] via-[#0A1128] via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  )
}

