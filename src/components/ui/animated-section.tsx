"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  // Without framer-motion, we'll just apply a stagger delay via CSS child selectors if needed,
  // or simply let it render statically. For a lightweight alternative, we just pass children.
  return <div className={className}>{children}</div>
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  // Since we rely on simple CSS, we will just use AnimatedSection logic here.
  return (
    <AnimatedSection className={className}>
      {children}
    </AnimatedSection>
  )
}
